import { Sequelize, DataTypes, Model, CreationOptional, Optional } from 'sequelize';
import { getInitOptions } from './utils';

export class UserGroup extends Model {
  id!: CreationOptional<number>;
  solde!: number;

  public static register(conn: Sequelize): void {
    UserGroup.init({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      solde: {
        type: DataTypes.DECIMAL,
        allowNull: false
      }
    }, getInitOptions(conn, UserGroup.name));
  }
}