import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, Optional } from 'sequelize';
import { getInitOptions } from './utils';

export class UserLabel extends Model {
  id!: CreationOptional<number>;
  LabelName!: string;
  LabelColor!: string;

  public static register(conn: Sequelize): void {
    UserLabel.init({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      }
    }, getInitOptions(conn, UserLabel.name));

    UserLabel.afterCreate
  }
}