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
    res.json(await Transaction.findAll({ where: { UserUsername: req.session.username } }))
  })

  app.post(apiUrl + "/add", (req, res) => {
    Transaction.create({
      title: req.body.title,
      value: req.body.value,
      date: req.body.date,
      UserUsername: req.session.username,
      LabelId: req.body.labelId
    })
      .then(_ => {
        res.json({status: "La transaction a été créée !"})
      })
      .catch(err => res.json({ error: err }))
  })

  app.post(apiUrl + "/update", (req, res) => {
    Transaction.update({ title: req.body.title, value: req.body.value, date: req.body.date, LabelId: req.body.labelId}, {
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

    if (!participantInGroup(req, res)) return

    const t = await sequelize.transaction()

    try {
      const transaction = await Transaction.create({
        title: req.body.title,
        value: req.body.value,
        date: req.body.date,
        UserUsername: req.body.payer,
        GroupId: req.body.groupId,
        LabelId: req.body.labelId
      })
  
      let total = req.body.value

      req.body.contributors.forEach(function (contributor: { isContributing: boolean, username: string, value: number }) {
        if (contributor.isContributing) {
          total -= contributor.value
        }
      })

      if (total != 0) {
        throw new Error('Le total des contributeurs est incorrect.')
      }

      req.body.contributors.forEach(async function (contributor: { isContributing: boolean, username: string, value: number }) {
        if (contributor.isContributing) {
          await Contribution.create({ value: contributor.value, UserUsername: contributor.username, TransactionId: transaction.id })
          let newSolde = (await UserGroup.findOne({ where: { UserUsername: contributor.username, GroupId: req.body.groupId } }))?.solde

          if (newSolde === undefined) {
            res.json({ error: 'L\'utilisateur ne fait pas parti de ce groupe !' })
            return
          }

          newSolde -= contributor.value
          if (req.body.payer === contributor.username) {
            newSolde += req.body.value
          }

          UserGroup.update({ solde: newSolde}, { where: { UserUsername: contributor.username, GroupId: req.body.groupId } })
        }
      })

      await t.commit()
      res.json({ status: 'La transaction a été créée !' })
    } catch (err) {
      await t.rollback()
      res.json({ error: err })
    }
  })

  app.post(apiUrl + apiUrlGroup + "/update", async (req, res) => {
    if (!await userInGroup(res, req.session.username, req.body.groupId)) return

    if (!participantInGroup(req, res)) return

    const t = await sequelize.transaction()

    try {
      const oldTransaction = await Transaction.findOne({ where: { id: req.body.transactionId, GroupId: req.body.groupId } })
      const transaction = await Transaction.update({
        title: req.body.title,
        value: req.body.value,
        date: req.body.date,
        UserUsername: req.body.payer,
        LabelId: req.body.labelId
      }, {
        where : { id: req.body.transactionId, GroupId: req.body.groupId }
      })
  
      if (!transaction || !oldTransaction) {
        res.json({ error: 'Vous ne pouvez pas modifier cette transaction.' })
        return
      }
  
      let total = req.body.value
  
      req.body.contributors.forEach(function (contributor: { isContributing: boolean, username: string, value: number }) {
        if (contributor.isContributing) {
          total -= contributor.value
        }
      })
  
      if (total != 0) {
        throw new Error('Le total des contributeurs est incorrect.')
      }

      req.body.contributors.forEach(async function (contributor: { isContributing: boolean, username: string, value: number }) {

      })
  
      req.body.contributors.forEach(async function (contributor: { isContributing: boolean, username: string, value: number }) {
        const oldContrib = await Contribution.findOne({ where: { UserUsername: contributor.username, TransactionId: req.body.transactionId } })

        if (!oldContrib) {
          if (contributor.isContributing) {
            await Contribution.create({ value: contributor.value, UserUsername: contributor.username, TransactionId: req.body.transactionId })
          } else {
            return
          }
        } else {
          if (contributor.isContributing) {
            await Contribution.update({ value: contributor.value }, { where : { UserUsername: contributor.username, TransactionId: req.body.transactionId } })
          } else {
            await Contribution.destroy({ where : { UserUsername: contributor.username, TransactionId: req.body.transactionId } })
          }
        }

        let newSolde = (await UserGroup.findOne({ where: { UserUsername: contributor.username, GroupId: req.body.groupId } }))?.solde
  
        if (newSolde === undefined) {
          res.json({ error: 'L\'utilisateur ne fait pas parti de ce groupe !' })
          return
        }

        if (oldContrib) {
          newSolde += oldContrib.value
          if (contributor.username === oldTransaction.UserUsername) {
            newSolde -= oldTransaction.value
          }
        }

        newSolde -= contributor.value
        if (req.body.payer === contributor.username) {
          newSolde += req.body.value
        }

        UserGroup.update({ solde: newSolde}, { where: { UserUsername: contributor.username, GroupId: req.body.groupId } })
      })

      await t.commit()
      res.json({ status: 'La transaction a été modifiée !' })
    } catch (err) {
      await t.rollback()
      res.json({ error: err })
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

  req.body.contributors.forEach(async function (contributor: { isContributing: boolean, username: string, value: number }) {
    const contributorInGroup = await UserGroup.findOne({ where: { UserUsername: contributor.username, GroupId: req.body.groupId } })

    if (contributorInGroup === null) {
      res.json({ error: 'Le contributeur "' + contributor.username + '" ne fait pas parti de votre groupe.' })
      return false
    }

    if (req.body.payer === contributor.username) {
      payerIsContributor = true;
    }
  })

  if (!payerIsContributor) {
    res.json({ error: 'Le payeur ne fait pas parti des contributeurs.' })
    return false
  }

  return true
}