import { Sequelize, DataTypes, Model, CreationOptional, Optional } from 'sequelize';
import { getInitOptions } from './utils';

export class GroupLabel extends Model {
  id!: CreationOptional<number>;

  public static register(conn: Sequelize): void {
    GroupLabel.init({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      }
    }, getInitOptions(conn, GroupLabel.name));
  }
}