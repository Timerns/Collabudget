import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, Optional } from 'sequelize';
import { getInitOptions } from './utils';

export class Transaction extends Model<InferAttributes<Transaction>, InferCreationAttributes<Transaction>> {
  id!: CreationOptional<number>;
  title!: string;
  value!: string;
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
        type: DataTypes.CHAR(3),
        allowNull: false
      },
      date: {
        type: DataTypes.STRING(40),
        allowNull: false
      }
    }, getInitOptions(conn, Transaction.name));
  }
}