import { Express, Request, Response } from 'express';
import { Op, Sequelize } from "sequelize";
import { Label } from '../database/label';
import { UserLabel } from '../database/userLabel';
import { GroupLabel } from '../database/groupLabel';
import { isNumber, parametersDefined, userInGroup } from './routes';

const apiUrl = '/api/labels';
const apiUrlGroup = '/g';

export function labelRoute(app: Express, sequelize: Sequelize) {
  // User label
  app.get(apiUrl, async (req, res) => {
    res.json({ status: await Label.findAll({ 
      include: [{
        model: UserLabel,
        where: { UserUsername: req.session.username }
      }]
    }) })
  })

  app.post(apiUrl + '/add', (req, res) => {
    if (!parametersDefined(res, [req.body.name, req.body.color])) return

    //Verification
    if (!req.body.name) {
      res.json({error: 'Le nom de votre label ne peut pas être vide'})
      return
    }

    UserLabel.findOne({ 
      where: { UserUsername: req.session.username },
      include: [{
        model: Label,
        where: { name: req.body.name, color: req.body.color }
      }]
    })
      .then(userLabel => {
        if (userLabel) {
          res.json({ error: 'Vous possédez déjà un label identique.' })
          return
        }

        Label.create({ name: req.body.name, color: req.body.color })
          .then(newLabel => {
            UserLabel.create({ UserUsername: req.session.username, LabelId: newLabel.id })
              .then(_ => {
                res.json({ status: newLabel.name + ' a été créé !' })
              })
              .catch(err => res.json({ error: err }))
          })
          .catch(err => res.json({ error: err }))
      })
      .catch(err => res.json({ error: err }))
  })

  app.post(apiUrl + '/update', (req, res) => {
    if (!parametersDefined(res, [req.body.name, req.body.color, req.body.id])) return
    if (!isNumber(res, [req.body.id], 'L\'id')) return

    //Verification
    if (!req.body.name) {
      res.json({error: 'Le nom de votre label ne peut pas être vide'})
      return
    }

    UserLabel.findOne({ where: { UserUsername: req.session.username, LabelId: req.body.id } })
      .then(userLabel => {
        if (!userLabel) {
          res.json({ error: 'Vous ne pouvez pas modifier ce label.' })
          return
        }

        Label.update({ name: req.body.name, color: req.body.color }, {
          where : {
            id: req.body.id
          }
        })
          .then(_ => {
            res.json({ status: 'Le label a été modifié !' })
          })
          .catch(err => res.json({ error: err }))
      })
      .catch(err => res.json({ error: err }))
  })

  app.post(apiUrl + '/delete', (req, res) => {
    if (!parametersDefined(res, [req.body.id])) return
    if (!isNumber(res, [req.body.id], 'L\'id')) return
    
    UserLabel.findOne({ where: { UserUsername: req.session.username, LabelId: req.body.id } })
      .then(userLabel => {
        if (!userLabel) {
          res.json({ error: 'Vous ne pouvez pas supprimer ce label.' })
          return
        }

        Label.destroy({
          where : {
            id: req.body.id
          }
        })
          .then(_ => {
            res.json({ status: 'Le label a été supprimé !' })
          })
          .catch(err => res.json({ error: err }))
      })
      .catch(err => res.json({ error: err }))
  })


  // Group label
  app.post(apiUrl + apiUrlGroup, async (req, res) => {
    if (!parametersDefined(res, [req.body.groupId])) return
    if (!isNumber(res, [req.body.groupId], 'L\'id')) return
    if (!await userInGroup(res, req.session.username, req.body.groupId)) return

    res.json({ status: await Label.findAll({ 
      include: [{
        model: GroupLabel,
        where: { GroupId: req.body.groupId }
      }]
    }) })
  })

  app.post(apiUrl + apiUrlGroup + '/add', async (req, res) => {
    if (!parametersDefined(res, [req.body.name, req.body.color, req.body.groupId])) return
    if (!isNumber(res, [req.body.groupId], 'L\'id')) return
    if (!await userInGroup(res, req.session.username, req.body.groupId)) return

    //Verification
    if (!req.body.name) {
      res.json({error: 'Le nom de votre label ne peut pas être vide'})
      return
    }

    GroupLabel.findOne({ 
      where: { GroupId: req.body.groupId },
      include: [{
        model: Label,
        where: { name: req.body.name, color: req.body.color }
      }]
    })
      .then(userLabels => {
        if (userLabels) {
          res.json({ error: 'Vous possédez déjà un label identique.' })
          return
        }

        Label.create({ name: req.body.name, color: req.body.color })
          .then(newLabel => {
            GroupLabel.create({ GroupId: req.body.groupId, LabelId: newLabel.id })
              .then(_ => {
                res.json({ status: newLabel.name + ' a été créé !' })
              })
              .catch(err => res.json({ error: err }))
          })
          .catch(err => res.json({ error: err }))
      })
      .catch(err => res.json({ error: err }))
  })

  app.post(apiUrl + apiUrlGroup + '/update', async (req, res) => {
    if (!parametersDefined(res, [req.body.name, req.body.color, req.body.groupId, req.body.id])) return
    if (!isNumber(res, [req.body.groupId, req.body.id], 'L\'id')) return
    if (!await userInGroup(res, req.session.username, req.body.groupId)) return

    //Verification
    if (!req.body.name) {
      res.json({error: 'Le nom de votre label ne peut pas être vide'})
      return
    }

    GroupLabel.findOne({ where: { GroupId: req.body.groupId, LabelId: req.body.id } })
      .then(groupLabel => {
        if (!groupLabel) {
          res.json({ error: 'Vous ne pouvez pas modifier ce label.' })
          return
        }

        Label.update({ name: req.body.name, color: req.body.color }, {
          where : {
            id: req.body.id
          }
        })
          .then(_ => {
            res.json({ status: 'Le label a été modifié !' })
          })
          .catch(err => res.json({ error: err }))
      })
      .catch(err => res.json({ error: err }))
  })

  app.post(apiUrl + apiUrlGroup + '/delete', async (req, res) => {
    if (!parametersDefined(res, [req.body.groupId, req.body.id])) return
    if (!isNumber(res, [req.body.groupId, req.body.id], 'L\'id')) return
    if (!await userInGroup(res, req.session.username, req.body.groupId)) return

    GroupLabel.findOne({ where: { GroupId: req.body.groupId, LabelId: req.body.id } })
      .then(groupLabel => {
        if (!groupLabel) {
          res.json({ error: 'Vous ne pouvez pas supprimer ce label.' })
          return
        }

        Label.destroy({
          where : {
            id: req.body.id
          }
        })
          .then(_ => {
            res.json({ status: 'Le label a été supprimé !' })
          })
          .catch(err => res.json({ error: err }))
      })
      .catch(err => res.json({ error: err }))
  })
}
