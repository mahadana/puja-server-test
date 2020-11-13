import { ApolloServer } from "apollo-server-micro";
import dotenv from "dotenv";
import { Sequelize } from "sequelize";

import { defineModels } from "./models";
import resolvers from "./resolvers";
import schema from "./schema";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_DATABASE || "app",
  process.env.DB_USER || "app",
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || "db",
    dialect: "postgres",
  }
);

const models = defineModels(sequelize);

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: { models },
});

export { models, sequelize, server };
