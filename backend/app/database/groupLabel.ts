import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, Optional } from 'sequelize';
import { getInitOptions } from './utils';

export class GroupLabel extends Model<InferAttributes<GroupLabel>, InferCreationAttributes<GroupLabel>> {
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