import { ApolloServer, gql } from "apollo-server";
import db from "./src/db";

const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    authorId: ID!
    author: Author!
  }

  type Author {
    id: ID!
    name: String!
    books: [Book]
  }

  type Query {
    book(id: ID!): Book
    books: [Book]
    author(id: ID!): Author
    authors: [Author]
  }

  type Mutation {
    createAuthor(name: String!): Author!
    createBook(title: String!, authorId: ID!): Book!
  }
`;

const resolvers = {
  Author: {
    books: (parent, args, context, info) => {
      return parent.getBooks();
    },
  },
  Book: {
    author: (parent, args, context, info) => {
      return parent.getAuthor();
    },
  },
  Query: {
    author: (root, { id }, { db }) => {
      return db.Author.findByPk(id);
    },
    authors: (root, args, { db }) => {
      return db.Author.findAll();
    },
    book: (root, { id }, { db }) => {
      return db.Book.findByPk(id);
    },
    books: (root, args, { db }) => {
      return db.Book.findAll();
    },
  },
  Mutation: {
    createAuthor: (parent, { name }, { db }, info) => {
      return db.Author.create({ name });
    },
    createBook: (parent, { title, authorId }, { db }, info) => {
      return db.Book.create({
        title,
        authorId,
      });
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { db },
});

(async () => {
  await db.sequelize.sync({ force: false });
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
})();
