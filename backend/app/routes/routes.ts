import { Express } from 'express';
import { Sequelize } from "sequelize";
import { loginRoute } from './login_route';

export function routes(app: Express, sequelize: Sequelize) {
  loginRoute(app, sequelize);
}