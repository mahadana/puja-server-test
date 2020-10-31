import express from "express";

import { createApolloServer } from "./db";

(async () => {
  const app = express();
  const server = await createApolloServer();
  server.applyMiddleware({ app, path: "/graphql" });

  const info = `🚀 Apollo Server ready at http://localhost:4000${server.graphqlPath}`;

  app.get("/", (req, res) => {
    res.send(info);
  });

  app.listen({ port: 4000 }, () => {
    console.log(info);
  });
})();
