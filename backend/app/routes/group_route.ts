import { Express, Request, Response } from 'express';
import { Sequelize } from "sequelize";
import { Group } from '../database/group';
import { UserGroup } from '../database/userGroup';
import {v4 as uuidv4} from 'uuid';
import { userInGroup } from './routes';
import { writeFile } from 'fs/promises';
import path from "path/posix";

const apiUrl = '/api/groups';
const IMAGES_DIR = 'app/images';

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
    Group.create({ name: req.body.name, currency: req.body.currency, inviteId: groupUuid, description: req.body.description })
      .then(newGroup => {
        UserGroup.create({ solde: 0, UserUsername: req.session.username, GroupId: newGroup.id })
          .then(async _ => {
            var imageDecoded = decodeURIComponent(req.body.image)
            var imageDataU = getImageData(imageDecoded)

            if (imageDataU === undefined) {
              res.json({ error: 'Les données de l\'image ne sont pas valides.' })
              return
            }

            try {
              console.log(path.join(IMAGES_DIR, newGroup.id + ".png"))
              await writeFile(path.join(IMAGES_DIR, newGroup.id + ".png"), imageDataU)
            } catch(err) {
              res.json({ error: err })
              return
            }

            res.json({ status: 'Le groupe ' + newGroup.name + ' a été créé !' })
          })
          .catch(err => res.json({ error: err }))
      })
      .catch(err => res.json({ error: err }))
  })

  app.post(apiUrl + '/update', async (req, res) => {
    if (!await userInGroup(res, req.session.username, req.body.groupId)) return

    Group.update({ name: req.body.name, description: req.body.description }, {
      where : {
        id: req.body.groupId
      }
    })
      .then(async _ => {
        var imageDecoded = decodeURIComponent(req.body.image)
        var imageDataU = getImageData(imageDecoded)

        if (imageDataU === undefined) {
          res.json({ error: 'Les données de l\'image ne sont pas valides.' })
          return;
        }

        try {
          await writeFile(path.join(IMAGES_DIR, req.body.groupId + ".png"), imageDataU)
        } catch(err) {
          res.json({ error: err })
        }

        res.json({ status: 'Le groupe a été modifié !' })
      })
      .catch(err => res.json({ error: err }))
  })

  app.post(apiUrl + '/invite', async (req, res) => {
    if (!await userInGroup(res, req.session.username, req.body.groupId)) return

    Group.findOne({ where: { GroupId: req.body.groupId } })
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
      .then(group => {
        if (!group) {
          res.json({ error: 'Ce lien d\'invitation n\'existe pas.' })
          return
        }

        UserGroup.findOrCreate({
          where: { UserUsername: req.session.username, GroupId: group.id },
          defaults: { solde: 0 }
        })
      })
      .catch(err => res.json({ error: err }))
  })
}

function getImageData(data: string) : Uint8Array | undefined {
  var arr = data.split(',');
  if (arr.length <= 1) {
      return undefined;
  }

  var bstr = Buffer.from(arr[1], 'base64').toString('binary');
  var n = bstr.length;
  var u8arr = new Uint8Array(n);
  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }
  
  return u8arr;
}