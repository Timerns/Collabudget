import { Express } from 'express';
import { Sequelize } from "sequelize";
import { loginRoute } from './login_route';
import { labelRoute } from './label_route';
import { UserGroup } from '../database/userGroup';

export function routes(app: Express, sequelize: Sequelize) {
  loginRoute(app, sequelize);
  labelRoute(app, sequelize);
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