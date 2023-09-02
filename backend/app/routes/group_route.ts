import { Express, Request, Response } from 'express';
import { Sequelize } from "sequelize";
import { Group } from '../database/group';
import { UserGroup } from '../database/userGroup';
import {v4 as uuidv4} from 'uuid';
import { userInGroup } from './routes';

const apiUrl = '/api/groups';

export function groupRoute(app: Express, sequelize: Sequelize) { 
  app.get(apiUrl, async (req, res) => {
    res.json(await Group.findAll({ 
      include: [{
        model: UserGroup,
        where: { UserUsername: req.session.username }
      }]
    }))
  })

  app.post(apiUrl + '/add', (req, res) => {
    const groupUuid = uuidv4();
    Group.create({ name: req.body.name, currency: req.body.currency, inviteId: groupUuid, description: req.body.description, image: req.body.image })
      .then(newGroup => {
        UserGroup.create({ solde: 0, UserUsername: req.session.username, GroupId: newGroup.id })
          .then(_ => {
            res.json({ status: 'Le groupe ' + newGroup.name + ' a été créé !' })
          })
          .catch(err => res.json({ error: err }))
      })
      .catch(err => res.json({ error: err }))
  })

  app.post(apiUrl + '/update', async (req, res) => {
    if (!await userInGroup(res, req.session.username, req.body.groupId)) return

    Group.update({ name: req.body.name, description: req.body.description, image: req.body.image }, {
      where : {
        id: req.body.groupId
      }
    })
      .then(_ => {
        res.json({ status: 'Le groupe a été modifié !' })
      })
      .catch(err => res.json({ error: err }))
  })

  app.post(apiUrl + '/invite', async (req, res) => {
    if (!await userInGroup(res, req.session.username, req.body.groupId)) return

    Group.findOne({ where: { id: req.body.groupId } })
      .then(group => {
        if (!group) {
          res.json({ error: 'Ce groupe n\'existe pas.' })
          return
        }

        res.json({ status: group.inviteId })
      })
      .catch(err => res.json({ error: err }))
  })

  app.get(apiUrl + '/invite/:inviteLink', async (req, res) => {
    Group.findOne({ where: { inviteId: req.params.inviteLink }})
      .then(async group => {
        if (!group) {
          res.json({ error: 'Ce lien d\'invitation n\'existe pas.' })
          return
        }

        try {
          const [userGroup, created] = await UserGroup.findOrCreate({
            where: { UserUsername: req.session.username, GroupId: group.id },
            defaults: { solde: 0 }
          })

          if (created) {
            res.json({ status: 'Vous avez rejoint le groupe ' + group.name + ' !' })
            return
          }
          res.json({ error: 'Vous faites déjà parti du groupe ' + group.name + '.' })
        } catch(err: any) {
          res.json({ error: err.message })
        }
      })
      .catch(err => res.json({ error: err }))
  })
}