import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, Optional } from 'sequelize';
import { getInitOptions } from './utils';

export class Contribution extends Model {
  id!: CreationOptional<number>;
  value!: number;

  public static register(conn: Sequelize): void {
    Contribution.init({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      value: {
        type: DataTypes.DECIMAL,
        allowNull: false
      }
    }, getInitOptions(conn, Contribution.name));
  }
}