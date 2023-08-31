import {Express} from 'express';
import {Op, Sequelize} from "sequelize";
import {Transaction} from "../database/transaction";
import {Group} from "../database/group";
import {UserGroup} from "../database/userGroup";

const apiUrl = '/api/transactions';
const apiUrlGroup = '/g';

export function transactionRoute(app: Express, sequelize: Sequelize) {
  // User label
  app.get(apiUrl, async (req, res) => {
    res.json(await Transaction.findAll({
      where: {
        [Op.or]: [ // Soit c'est une transaction perso soit une transaction d'un groupe de l'user
          // {UserUsername: req.session.username} ,
          {'$UserGroup.UserUsername$': {[Op.contains]: req.session.username}} //TODO MARCHE PAS
        ]
      },
      include: [
        {
          model: Group, include: [
            {model: UserGroup}
          ]
        },
      ]
    }));
  })

  app.post(apiUrl + "/add", async (req, res) => {
    Transaction.create({
      UserUsername: req.session.username,
      Groupid: req.body.group,
      LabelId: req.body.label,
      title: req.body.title,
      value: req.body.value,
      date: req.body.date ?? new Date(),
    }).then((_) => {
      res.json({status: "La transaction a été crée"})
    })
  })


}
