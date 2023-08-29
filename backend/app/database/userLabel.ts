import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, Optional } from 'sequelize';
import { getInitOptions } from './utils';

export class UserLabel extends Model<InferAttributes<UserLabel>, InferCreationAttributes<UserLabel>> {
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
      },
      LabelName: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      LabelColor: {
        type: DataTypes.CHAR(7),
        allowNull: false
      }
    }, getInitOptions(conn, UserLabel.name));

    UserLabel.afterCreate
  }
}