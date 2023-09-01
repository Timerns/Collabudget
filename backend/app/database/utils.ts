import { IndexesOptions, InitOptions, Model, Sequelize } from "sequelize";

export function getInitOptions(conn: Sequelize, name: string, indexes?: IndexesOptions[]): InitOptions {
  return { createdAt: false, updatedAt: false, sequelize: conn, tableName: name.toLowerCase(), indexes: indexes };
}