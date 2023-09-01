import { Sequelize, DataTypes, Model, CreationOptional, Optional } from 'sequelize';
import { getInitOptions } from './utils';

export class MonthlyLimit extends Model {
  id!: CreationOptional<number>;
  month!: number;
  year!: number;
  limit!: number;

  public static register(conn: Sequelize): void {
    MonthlyLimit.init({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      month: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      limit: {
        type: DataTypes.DECIMAL,
        allowNull: false
      }
    }, getInitOptions(conn, MonthlyLimit.name));
  }
}