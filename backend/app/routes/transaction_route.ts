import {Express} from 'express';
import {Sequelize} from "sequelize";
import {Transaction} from "../database/transaction";
import {UserGroup} from "../database/userGroup";
import { isDate, isNumber, parametersDefined, userInGroup } from './routes';
import { Contribution } from '../database/contribution';

const apiUrl = '/api/transactions';
const apiUrlGroup = '/g';

const allowedError = 0.001

export function transactionRoute(app: Express, sequelize: Sequelize) {
  // User transaction
  app.get(apiUrl, async (req, res) => {
    let userTransactions = await Transaction.findAll({ where: { UserUsername: req.session.username } })
    let userRefunded = await Transaction.findAll({ where: { RefundedUsername: req.session.username } })
    userRefunded = userRefunded.map((v: any) => {
      v.value = new String(-v.value)
      return v
    })

    userTransactions.push(...userRefunded)
    userTransactions = userTransactions.sort((d1, d2) => new Date(d2.date).getTime() - new Date(d1.date).getTime())

    res.json({ status: userTransactions })
  })

  app.post(apiUrl + "/add", (req, res) => {
    if (!parametersDefined(res, [req.body.title, req.body.value, req.body.date])) return
    if (!isNumber(res, [req.body.value, (req.body.labelId ?? null)], 'La valeur ou l\'id')) return
    if (!isDate(res, req.body.date)) return

    //Verification
    if (!req.body.title) {
      res.json({error: 'Le titre ne peut pas être vide.'})
      return
    }

    Transaction.create({
      title: req.body.title,
      value: req.body.value,
      date: req.body.date,
      UserUsername: req.session.username,
      LabelId: (req.body.labelId ?? null)
    })
      .then(_ => {
        res.json({status: 'La transaction a été créée !'})
      })
      .catch(err => res.json({ error: err }))
  })

  app.post(apiUrl + "/update", (req, res) => {
    if (!parametersDefined(res, [req.body.title, req.body.value, req.body.date, req.body.transactionId])) return
    if (!isNumber(res, [req.body.value, req.body.transactionId, (req.body.labelId ?? null)], 'La valeur ou l\'id')) return
    if (!isDate(res, req.body.date)) return

    //Verification
    if (!req.body.title) {
      res.json({error: 'Le titre ne peut pas être vide.'})
      return
    }

    Transaction.update({ title: req.body.title, value: req.body.value, date: req.body.date, LabelId: (req.body.labelId ?? null) }, {
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
    if (!parametersDefined(res, [req.body.transactionId])) return

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
    if (!parametersDefined(res, [req.body.groupId])) return
    if (!isNumber(res, [req.body.groupId], 'L\'id')) return
    if (!await userInGroup(res, req.session.username, req.body.groupId)) return

    let transactions = await Transaction.findAll({ where: { GroupId: req.body.groupId } })
    transactions = transactions.sort((d1, d2) => new Date(d2.date).getTime() - new Date(d1.date).getTime())

    res.json({ status: transactions })
  })

  app.post(apiUrl + apiUrlGroup + "/contributor", async (req, res) => {
    if (!parametersDefined(res, [req.body.groupId, req.body.transactionId])) return
    if (!isNumber(res, [req.body.groupId, req.body.transactionId], 'L\'id')) return
    if (!await userInGroup(res, req.session.username, req.body.groupId)) return

    const contributions = await Contribution.findAll({ where: { TransactionId: req.body.transactionId } })

    res.json({ status: contributions })
  })

  app.post(apiUrl + apiUrlGroup + "/add", async (req, res) => {
    if (!parametersDefined(res, [req.body.title, req.body.value, req.body.date, req.body.payer, req.body.groupId, req.body.contributors])) return
    if (!isNumber(res, [req.body.value, req.body.groupId, (req.body.labelId ?? null)], 'La valeur ou l\'id')) return
    if (!isDate(res, req.body.date)) return
    if (!await userInGroup(res, req.session.username, req.body.groupId)) return

    if (!await participantInGroup(req, res)) return

    //Verification
    if (!req.body.title) {
      res.json({error: 'Le titre ne peut pas être vide.'})
      return
    }
    if (Number(req.body.value) <= 0) {
      res.json({error: 'Une dépense ne peut pas être négative ou nulle.'})
      return
    }

    const t = await sequelize.transaction()

    try {
      const transaction = await Transaction.create({
        title: req.body.title,
        value: req.body.value,
        date: req.body.date,
        UserUsername: req.body.payer,
        GroupId: req.body.groupId,
        LabelId: (req.body.labelId ?? null)
      }, { transaction: t })
  
      let total = req.body.value

      //contributor: { isContributing: boolean, username: string, value: number }
      for (const contributor of JSON.parse(req.body.contributors)) {
        if (contributor.isContributing) {
          total -= contributor.value
        }
      }
      
      if (Math.abs(total - req.body.value) <= allowedError) {
        throw new Error('Le total des contributeurs est incorrect.')
      }

      //contributor: { isContributing: boolean, username: string, value: number }
      for (const contributor of JSON.parse(req.body.contributors)) {
        if (contributor.isContributing || req.body.payer === contributor.username) {
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
    if (!parametersDefined(res, [req.body.title, req.body.value, req.body.date, req.body.payer, req.body.groupId, req.body.contributors, req.body.transactionId])) return
    if (!isNumber(res, [req.body.value, req.body.groupId, req.body.transactionId, (req.body.labelId ?? null)], 'La valeur ou l\'id')) return
    if (!isDate(res, req.body.date)) return
    if (!await userInGroup(res, req.session.username, req.body.groupId)) return

    if (!await participantInGroup(req, res)) return

    //Verification
    if (!req.body.title) {
      res.json({error: 'Le titre ne peut pas être vide.'})
      return
    }
    if (Number(req.body.value) <= 0) {
      res.json({error: 'Une dépense ne peut pas être négative ou nulle.'})
      return
    }

    const t = await sequelize.transaction()

    try {
      const oldTransaction = await Transaction.findOne({ where: { id: req.body.transactionId, GroupId: req.body.groupId } })
      const transaction = await Transaction.update({
        title: req.body.title,
        value: req.body.value,
        date: req.body.date,
        UserUsername: req.body.payer,
        LabelId: (req.body.labelId ?? null)
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
  

      if (Math.abs(total - req.body.value) <= allowedError) {
        throw new Error('Le total des contributeurs est incorrect.')
      }
  
      //contributor: { isContributing: boolean, username: string, value: number }
      for (const contributor of JSON.parse(req.body.contributors)) {
        const oldContrib = await Contribution.findOne({ where: { UserUsername: contributor.username, TransactionId: req.body.transactionId } })

        if (!oldContrib) {
          if (contributor.isContributing || req.body.payer === contributor.username) {
            await Contribution.create({ value: contributor.value, UserUsername: contributor.username, TransactionId: req.body.transactionId }, { transaction: t })
          } else {
            continue
          }
        } else {
          if (contributor.isContributing || req.body.payer === contributor.username) {
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
    if (!parametersDefined(res, [req.body.groupId, req.body.transactionId])) return
    if (!isNumber(res, [req.body.groupId, req.body.transactionId], 'L\'id')) return
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
        if (contributor.UserUsername === oldTransaction.UserUsername && oldTransaction.RefundedUsername === null) {
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
    if (!parametersDefined(res, [req.body.groupId, req.body.refunder, req.body.refunded])) return
    if (!isNumber(res, [req.body.groupId], 'L\'id')) return
    if (!await userInGroup(res, req.session.username, req.body.groupId)) return

    if (req.session.username !== req.body.refunder && req.session.username !== req.body.refunded) {
      res.json({ error: 'Vous n\'êtes pas concerné pas ce remboursement.' })
      return
    }

    const t = await sequelize.transaction()

    try {
      const refunder = await UserGroup.findOne({ where: { UserUsername: req.body.refunder, GroupId: req.body.groupId } })
      const refunded = await UserGroup.findOne({ where: { UserUsername: req.body.refunded, GroupId: req.body.groupId } })
  
      if (!refunder || !refunded) {
        throw new Error('Ces personnes ne font pas partie du groupe.')
      }
  
      let refunderSolde = Number(refunder.solde)
      let refundedSolde = Number(refunded.solde)

      if (refunderSolde >= 0 || refundedSolde <= 0) {
        throw new Error('Il n\'y a pas de remboursement a effectué entre ces personnes.')
      }
  
      let refundAmount = Math.abs(refunderSolde)
      if (refundedSolde - Math.abs(refunderSolde) <= 0) {
        refundAmount = refundedSolde
      }
  
      const transaction = await Transaction.create({
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

      await Contribution.create({ value: -refundAmount, UserUsername: req.body.refunder, TransactionId: transaction.id }, { transaction: t })
      await Contribution.create({ value: refundAmount, UserUsername: req.body.refunded, TransactionId: transaction.id }, { transaction: t })

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
    if (contributor.isContributing === undefined || contributor.username === undefined ||contributor.value === undefined) {
      res.json({ error: 'La liste des contributeurs est incorrect.' })
      return false
    }

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