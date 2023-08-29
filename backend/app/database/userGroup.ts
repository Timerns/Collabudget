import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, Optional } from 'sequelize';
import { getInitOptions } from './utils';

export class UserGroup extends Model<InferAttributes<UserGroup>, InferCreationAttributes<UserGroup>> {
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
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, getInitOptions(conn, UserGroup.name));
  }
}