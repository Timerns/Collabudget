import {Express} from 'express';
import {Sequelize} from "sequelize";
import {Transaction} from "../database/transaction";
import {UserGroup} from "../database/userGroup";
import { userInGroup } from './routes';
import { Contribution } from '../database/contribution';

const apiUrl = '/api/transactions';
const apiUrlGroup = '/g';

const TRANSA: any = Transaction;

export function transactionRoute(app: Express, sequelize: Sequelize) {
  // User transaction
  app.get(apiUrl, async (req, res) => {
    //Obtient les transactions qu'on se fait rembourser en regardant le refundedusername
    //Ajout des transactions à la liste mais en inversant leur valeur avant
    //tri ordre chronologique
    res.json(await Transaction.findAll({ where: { UserUsername: req.session.username } }))
  })

  app.post(apiUrl + "/add", (req, res) => {
    Transaction.create({
      title: req.body.title,
      value: req.body.value,
      date: req.body.date,
      UserUsername: req.session.username,
      LabelId: (req.body.labelId ?? null)
    })
      .then(_ => {
        res.json({status: "La transaction a été créée !"})
      })
      .catch(err => res.json({ error: err }))
  })

  app.post(apiUrl + "/update", (req, res) => {
    Transaction.update({ title: req.body.title, value: req.body.value, date: req.body.date, LabelId: req.body.labelId ?? null }, {
      where : { id: req.body.transactionId, UserUsername: req.session.username }
    })
      .then(transaction => {
        if (!transaction) {
          res.json({ error: 'Vous ne pouvez pas modifier cette transaction.' })
          return
        }

        res.json({ status: 'La transaction a été modifiée !' })
      })
      .catch(err => res.json({ error: err }))
  })

  app.post(apiUrl + "/delete", (req, res) => {
    Transaction.destroy({ where : { id: req.body.transactionId, UserUsername: req.session.username } })
      .then(transaction => {
        if (!transaction) {
          res.json({ error: 'Vous ne pouvez pas supprimer cette transaction.' })
          return
        }

        res.json({ status: 'La transaction a été supprimée !' })
      })
      .catch(err => res.json({ error: err }))
  })


  // Group transaction
  app.post(apiUrl + apiUrlGroup, async (req, res) => {
    if (!await userInGroup(res, req.session.username, req.body.groupId)) return

    res.json(await Transaction.findAll({ where: { GroupId: req.body.groupId } }))
  })

  app.post(apiUrl + apiUrlGroup + "/add", async (req, res) => {
    if (!await userInGroup(res, req.session.username, req.body.groupId)) return

    if (!await participantInGroup(req, res)) return

    const t = await sequelize.transaction()

    try {
      const transaction = await Transaction.create({
        title: req.body.title,
        value: req.body.value,
        date: req.body.date,
        UserUsername: req.body.payer,
        GroupId: req.body.groupId,
        LabelId: req.body.labelId ?? null
      }, { transaction: t })
  
      let total = req.body.value

      //contributor: { isContributing: boolean, username: string, value: number }
      for (const contributor of JSON.parse(req.body.contributors)) {
        if (contributor.isContributing) {
          total -= contributor.value
        }
      }
      
      if (total != 0) {
        throw new Error('Le total des contributeurs est incorrect.')
      }

      //contributor: { isContributing: boolean, username: string, value: number }
      for (const contributor of JSON.parse(req.body.contributors)) {
        if (contributor.isContributing) {
          await Contribution.create({ value: contributor.value, UserUsername: contributor.username, TransactionId: transaction.id }, { transaction: t })
          let newSolde = Number((await UserGroup.findOne({ where: { UserUsername: contributor.username, GroupId: req.body.groupId } }))?.solde)
          
          if (newSolde === undefined) {
            throw new Error('L\'utilisateur ne fait pas parti de ce groupe !')
          }
          
          newSolde -= parseFloat(contributor.value)
          if (req.body.payer === contributor.username) {
            newSolde += parseFloat(req.body.value)
          }
          
          await UserGroup.update({ solde: newSolde}, { where: { UserUsername: contributor.username, GroupId: req.body.groupId }, transaction: t })
        }
      }

      await t.commit()
      res.json({ status: 'La transaction a été créée !' })
    } catch (err: any) {
      await t.rollback()
      res.json({ error: err.message })
    }
  })

  app.post(apiUrl + apiUrlGroup + "/update", async (req, res) => {
    if (!await userInGroup(res, req.session.username, req.body.groupId)) return

    if (!await participantInGroup(req, res)) return

    const t = await sequelize.transaction()

    try {
      const oldTransaction = await Transaction.findOne({ where: { id: req.body.transactionId, GroupId: req.body.groupId } })
      const transaction = await Transaction.update({
        title: req.body.title,
        value: req.body.value,
        date: req.body.date,
        UserUsername: req.body.payer,
        LabelId: req.body.labelId ?? null
      }, {
        where : { id: req.body.transactionId, GroupId: req.body.groupId },
        transaction: t
      })
  
      if (!transaction || !oldTransaction) {
        throw new Error('Vous ne pouvez pas modifier cette transaction.')
      }
  
      let total = req.body.value
  
      //contributor: { isContributing: boolean, username: string, value: number }
      for (const contributor of JSON.parse(req.body.contributors)) {
        if (contributor.isContributing) {
          total -= contributor.value
        }
      }
  
      if (total != 0) {
        throw new Error('Le total des contributeurs est incorrect.')
      }
  
      //contributor: { isContributing: boolean, username: string, value: number }
      for (const contributor of JSON.parse(req.body.contributors)) {
        const oldContrib = await Contribution.findOne({ where: { UserUsername: contributor.username, TransactionId: req.body.transactionId } })

        if (!oldContrib) {
          if (contributor.isContributing) {
            await Contribution.create({ value: contributor.value, UserUsername: contributor.username, TransactionId: req.body.transactionId }, { transaction: t })
          } else {
            continue
          }
        } else {
          if (contributor.isContributing) {
            await Contribution.update(
              { value: contributor.value },
              { where : { UserUsername: contributor.username, TransactionId: req.body.transactionId }, transaction: t }
            )
          } else {
            await Contribution.destroy({ where : { UserUsername: contributor.username, TransactionId: req.body.transactionId }, transaction: t })
          }
        }

        let newSolde = Number((await UserGroup.findOne({ where: { UserUsername: contributor.username, GroupId: req.body.groupId } }))?.solde)
  
        if (newSolde === undefined) {
          throw new Error('L\'utilisateur ne fait pas parti de ce groupe !')
        }

        if (oldContrib) {
          newSolde += Number(oldContrib.value)
          if (contributor.username === oldTransaction.UserUsername) {
            newSolde -= Number(oldTransaction.value)
          }
        }

        newSolde -= parseFloat(contributor.value)
        if (req.body.payer === contributor.username) {
          newSolde += parseFloat(req.body.value)
        }

        await UserGroup.update({ solde: newSolde}, { where: { UserUsername: contributor.username, GroupId: req.body.groupId }, transaction: t })
      }

      await t.commit()
      res.json({ status: 'La transaction a été modifiée !' })
    } catch (err: any) {
      await t.rollback()
      res.json({ error: err.message })
    }    
  })

  app.post(apiUrl + apiUrlGroup + "/delete", async (req, res) => { 
    if (!await userInGroup(res, req.session.username, req.body.groupId)) return

    const t = await sequelize.transaction()

    try {
      const oldTransaction = await Transaction.findOne({ where: { id: req.body.transactionId, GroupId: req.body.groupId } })
      const contributions = await Contribution.findAll({ where: { TransactionId: req.body.transactionId } })
      const transaction = await Transaction.destroy({ where: { id: req.body.transactionId, GroupId: req.body.groupId }, transaction: t })

      if (!transaction || !oldTransaction) {
        throw new Error('Vous ne pouvez pas supprimer cette transaction.')
      }

      for (const contributor of contributions) {
        let newSolde = Number((await UserGroup.findOne({ where: { UserUsername: contributor.UserUsername, GroupId: req.body.groupId } }))?.solde)
  
        if (newSolde === undefined) {
          throw new Error('L\'utilisateur ne fait pas parti de ce groupe !')
        }
        
        newSolde += Number(contributor.value)
        if (contributor.UserUsername === oldTransaction.UserUsername) {
          newSolde -= Number(oldTransaction.value)
        }
        
        await UserGroup.update({ solde: newSolde}, { where: { UserUsername: contributor.UserUsername, GroupId: req.body.groupId }, transaction: t })
      }

      await t.commit()
      res.json({ status: 'La transaction a été supprimée !' })
    } catch (err: any) {
      await t.rollback()
      res.json({ error: err.message })
    }    
  })

  app.post(apiUrl + apiUrlGroup + "/refund", async (req, res) => { 
    if (!await userInGroup(res, req.session.username, req.body.groupId)) return

    if (req.session.username !== req.body.refunder && req.session.username !== req.body.refunded) {
      res.json({ error: 'Vous n\'êtes pas concerné pas ce remboursement.' })
      return
    }

    const t = await sequelize.transaction()

    try {
      const refunder = await UserGroup.findOne({ where: { UserUsername: req.body.refunder } })
      const refunded = await UserGroup.findOne({ where: { UserUsername: req.body.refunded } })
  
      if (!refunder || !refunded) {
        throw new Error('Ces personnes ne font pas partie du groupe.')
      }
  
      let refunderSolde = Number(refunder.solde)
      let refundedSolde = Number(refunded.solde)

      if (refunderSolde >= 0 || refundedSolde <= 0) {
        throw new Error('Il n\'y a pas de remboursement a effectué entre ces personnes.')
      }
  
      let refundAmount = refunderSolde
      if (refundedSolde - refunderSolde <= 0) {
        refundAmount = refundedSolde
      }
  
      await Transaction.create({
        title: 'Remboursement',
        value: refundAmount,
        date: new Date(),
        UserUsername: req.body.refunder,
        RefundedUsername: req.body.refunded,
        GroupId: req.body.groupId
      }, { transaction: t })

      refunderSolde += refundAmount
      refundedSolde -= refundAmount
      await UserGroup.update({ solde: refunderSolde}, { where: { UserUsername: req.body.refunder, GroupId: req.body.groupId }, transaction: t })
      await UserGroup.update({ solde: refundedSolde}, { where: { UserUsername: req.body.refunded, GroupId: req.body.groupId }, transaction: t })

      await t.commit()
      res.json({ status: 'Le remboursement a été effectué !' })
    } catch (err: any) {
      await t.rollback()
      res.json({ error: err.message })
    }    
  })
}

async function participantInGroup(req: any, res: any): Promise<boolean> { 
  const payerInGroup = await UserGroup.findOne({ where: { UserUsername: req.body.payer, GroupId: req.body.groupId } })

  if (payerInGroup === null) {
    res.json({ error: 'Le payeur "' + req.body.payer + '" ne fait pas parti de votre groupe.' })
    return false
  }

  let payerIsContributor = false

  //contributor: { isContributing: boolean, username: string, value: number }
  for (const contributor of JSON.parse(req.body.contributors)) {
    const contributorInGroup = await UserGroup.findOne({ where: { UserUsername: contributor.username, GroupId: req.body.groupId } })

    if (contributorInGroup === null) {
      res.json({ error: 'Le contributeur "' + contributor.username + '" ne fait pas parti de votre groupe.' })
      return false
    }

    if (req.body.payer == contributor.username) {
      payerIsContributor = true;
    }
  }

  if (!payerIsContributor) {
    res.json({ error: 'Le payeur ne fait pas parti des contributeurs.' })
    return false
  }

  return true
}