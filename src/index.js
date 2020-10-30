import { createApolloServer } from "./db";

(async () => {
  const server = await createApolloServer();
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
})();
