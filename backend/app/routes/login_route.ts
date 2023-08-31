import { Express, Request, Response } from 'express';
import { Sequelize } from "sequelize";
import * as bcrypt from "bcrypt";
import { User } from '../database/user';

const ERROR_USER_PWD = 'Votre nom d\'utilisateur ou mot de passe est incorrect ou n\'existe pas.'

export function loginRoute(app: Express, sequelize: Sequelize) {
  app.post("/api/register", (req, res) => {
    User.findOne({ where: { username: req.body.username } })
      .then(user => {
        if (!user) {
          bcrypt.hash(req.body.password, 10)
            .then(hash => {
              User.create({ username: req.body.username, password: hash, currency: 'CHF' })
                .then(newUser => {
                  res.json({ status: newUser.username + ' s\'est enregistré !' })
                })
                .catch(err => res.json({ error: err }))
            })
            .catch(err => res.json({ error: err }))
        } else {
          res.json({ error: 'L\'utilisateur existe déjà' })
        }
      })
      .catch(err => res.json({ error: err }))
  })

  app.post("/api/login", (req, res) => {
    if (req.session.username !== undefined) {
      res.json({ status: 'Vous êtes déjà connecté !' })
      
      return
    }

    User.findOne({ where: { username: req.body.username } })
      .then(user => {
        if (user) {
          bcrypt.compare(req.body.password, user.password)
            .then(bcRes => {
              if (bcRes) {
                req.session.username = req.body.username
                res.json({ status: req.body.username + ' s\'est connecté !' })
              } else {
                res.json({ error: ERROR_USER_PWD })
              }
            })
            .catch(err => res.json({ error: err }))
        } else {
          res.json({ error: ERROR_USER_PWD })
        }
      })
      .catch(err => res.json({ error: err }))
  })

  app.get("/api/logout", (req, res) => {
    req.session.username = undefined
    res.json({ status: 'Déconnexion' })
  })
}