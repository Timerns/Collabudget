import { Sequelize, DataTypes, Model, CreationOptional, Optional } from 'sequelize';
import { getInitOptions } from './utils';

export class Group extends Model {
  id!: CreationOptional<number>;
  name!: string;
  currency!: string;
  inviteId!: string;
  description!: string;
  image!: string;

  public static register(conn: Sequelize): void {
    Group.init({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(40),
        allowNull: false
      },
      currency: {
        type: DataTypes.CHAR(3),
        allowNull: false
      },
      inviteId: {
        type: DataTypes.STRING(40),
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      image: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    }, getInitOptions(conn, Group.name));
  }
}