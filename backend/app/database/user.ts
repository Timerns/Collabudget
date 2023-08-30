import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, Optional } from 'sequelize';
import { getInitOptions } from './utils';

export class User extends Model {
  username!: string;
  password!: string;
  currency!: string;

  public static register(conn: Sequelize): void {
    User.init({
      username: {
        type: DataTypes.STRING(20),
        allowNull: false,
        primaryKey: true
      },
      password: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      currency: {
        type: DataTypes.CHAR(3),
        allowNull: false
      }
    }, getInitOptions(conn, User.name));
  }
}