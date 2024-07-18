import "dotenv/config";
import { Sequelize } from "sequelize";
const DB = process.env.DB;
export const sequelize = new Sequelize(DB, {
  logging: true,
});
