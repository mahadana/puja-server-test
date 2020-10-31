import { ApolloServer } from "apollo-server-express";
import dotenv from "dotenv";
import { Sequelize } from "sequelize";

import { defineModels } from "./models";
import resolvers from "./resolvers";
import schema from "./schema";

const createApolloServer = async () => {
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

  await sequelize.sync({ force: false });

  const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: { models },
  });

  return server;
};

export { createApolloServer };
