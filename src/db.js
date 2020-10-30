import { ApolloServer } from "apollo-server";
import dotenv from "dotenv";
import { Sequelize } from "sequelize";

import { defineModels } from "./models";
import resolvers from "./resolvers";
import schema from "./schema";

const createApolloServer = async () => {
  dotenv.config();

  const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: "db",
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
