import { Express } from 'express';
import { Sequelize } from "sequelize";
import { UserGroup } from '../database/userGroup';
import { loginRoute } from './login_route';
import { labelRoute } from './label_route';
import { groupRoute } from './group_route';
import { limitRoute } from './limit_route';
import {transactionRoute} from "./transaction_route";

export function routes(app: Express, sequelize: Sequelize) {
  loginRoute(app, sequelize);
  labelRoute(app, sequelize);
  groupRoute(app, sequelize);
  limitRoute(app, sequelize);
  transactionRoute(app, sequelize);
}

// Verify if the user is in the group to know if he is allowed to do the group's action
export async function userInGroup(res: any, username?: string, groupId?: string): Promise<boolean> {
  const inGroup = await UserGroup.findOne({ where: { UserUsername: username, GroupId: groupId } })

  if (inGroup === null) {
    res.json({ error: 'Vous ne faites pas parti de ce groupe !' })
    return false
  }

  return true
}

export function parametersDefined(res: any, parameters: any[]): boolean {
  for (const parameter of parameters) {
    if (parameter === undefined) {
      res.json({ error: 'Les paramètres sont incomplets.' })
      return false
    }
  }

  return true
}

export function isNumber(res: any, parameters: any[], message: string): boolean {
  for (const parameter of parameters) {
    if (isNaN(Number(parameter))) {
      res.json({ error: message + ' devrait être un nombre.' })
      return false
    }
  }

  return true
}

export function isDate(res: any, parameter: any): boolean {
  if (isNaN(new Date(parameter).valueOf())) {
    res.json({ error: 'La date n\'est pas valide.' })
    return false
  }

  return true
}