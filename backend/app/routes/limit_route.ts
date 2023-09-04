import { Express, Request, Response } from 'express';
import { Sequelize } from "sequelize";
import { MonthlyLimit } from '../database/monthlyLimit';
import { UserLabel } from '../database/userLabel';
import { isNumber, parametersDefined } from './routes';

const apiUrl = '/api/limits';

export function limitRoute(app: Express, sequelize: Sequelize) {
  // If no limit the default value displayed for the month or the label should be 0
  app.get(apiUrl, (req, res) => {
    Promise.all([
      MonthlyLimit.findAll({ where: { UserUsername: req.session.username } }),
      MonthlyLimit.findAll({
        include : [{
          model: UserLabel,
          where: { UserUsername: req.session.username }
        }]
      })
    ])
      .then(allLimits => {
        res.json({ status: allLimits })
      })
      .catch(err => res.json({ error: err }))
  })

  // If no limit the default value displayed for the month or the label should be 0
  app.post(apiUrl + '/month', (req, res) => {
    if (!parametersDefined(res, [req.body.month, req.body.year])) return
    if (!isNumber(res, [req.body.month, req.body.year], 'Le mois ou l\'année')) return

    Promise.all([
      MonthlyLimit.findAll({ where: { month: req.body.month, year: req.body.year, UserUsername: req.session.username } }),
      MonthlyLimit.findAll({
        where : { month: req.body.month, year: req.body.year },
        include : [{
          model: UserLabel,
          where: { UserUsername: req.session.username }
        }]
      })
    ])
      .then(allLimits => {
        res.json(allLimits)
      })
      .catch(err => res.json({ error: err }))
  })

  app.post(apiUrl + '/update/m', (req, res) => {
    if (!parametersDefined(res, [req.body.month, req.body.year, req.body.limit])) return
    if (!isNumber(res, [req.body.month, req.body.year, req.body.limit], 'Le mois, l\'année ou la limite')) return

    MonthlyLimit.findOrCreate({
      where: { month: req.body.month, year: req.body.year, UserUsername: req.session.username },
      defaults: { limit: 0 }
    })
      .then(monthlyLimit => {
        MonthlyLimit.update({ limit: req.body.limit }, { where: { id: monthlyLimit[0].id } })
          .then(_ => {
            res.json({ status: 'La limite mensuelle a été mise à jour !' })
          })
          .catch(err => res.json({ error: err }))
      })
      .catch(err => res.json({ error: err }))
  })

  app.post(apiUrl + '/update/l', async (req, res) => {
    if (!parametersDefined(res, [req.body.month, req.body.year, req.body.limit, req.body.labelId])) return
    if (!isNumber(res, [req.body.month, req.body.year, req.body.limit, req.body.labelId], 'Le mois, l\'année, la limite ou l\'id')) return

    MonthlyLimit.findOrCreate({
      where : { month: req.body.month, year: req.body.year },
      include : [{
        model: UserLabel,
        where: { UserUsername: req.session.username, LabelId: req.body.labelId }
      }],
      defaults: { limit: 0, UserLabelId: (await UserLabel.findOne({ where: { UserUsername: req.session.username, LabelId: req.body.labelId } }))?.id }
    })
      .then(monthlyLimit => {
        MonthlyLimit.update({ limit: req.body.limit }, { where: { id: monthlyLimit[0].id } })
          .then(_ => {
            res.json({ status: 'La limite du label a été mise à jour !' })
          })
          .catch(err => res.json({ error: err }))
      })
      .catch(err => res.json({ error: err }))
  })
}