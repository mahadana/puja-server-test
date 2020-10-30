import { createApolloServer } from "./src/db";

(async () => {
  const server = await createApolloServer();
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
})();
