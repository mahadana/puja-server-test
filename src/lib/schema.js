import { gql } from "apollo-server-micro";

const schema = gql`
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
    test: String!
  }

  type Mutation {
    createAuthor(name: String!): Author!
    createBook(title: String!, authorId: ID!): Book!
    deleteAuthor(id: ID!): ID
  }
`;

export default schema;
