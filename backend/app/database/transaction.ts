import { Sequelize, DataTypes, Model, CreationOptional, Optional } from 'sequelize';
import { getInitOptions } from './utils';

export class Transaction extends Model {
  id!: CreationOptional<number>;
  title!: string;
  value!: number;
  date!: Date;

  public static register(conn: Sequelize): void {
    Transaction.init({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      title: {
        type: DataTypes.STRING(40),
        allowNull: false
      },
      value: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false
      }
    }, getInitOptions(conn, Transaction.name));
  }
}