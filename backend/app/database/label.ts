import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, Optional } from 'sequelize';
import { getInitOptions } from './utils';

export class Label extends Model<InferAttributes<Label>, InferCreationAttributes<Label>> {
  id!: CreationOptional<number>;
  name!: string;
  color!: string;

  public static register(conn: Sequelize): void {
    Label.init({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      color: {
        type: DataTypes.CHAR(7),
        allowNull: false
      }
    }, getInitOptions(conn, Label.name, [{
      unique: true,
      fields: ['name', 'color']
    }]));
  }
}