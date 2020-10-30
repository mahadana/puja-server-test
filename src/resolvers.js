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
    author: (parent, { id }, { models }, info) => {
      return models.Author.findByPk(id);
    },
    authors: (parent, args, { models }, info) => {
      return models.Author.findAll();
    },
    book: (parent, { id }, { models }, info) => {
      return models.Book.findByPk(id);
    },
    books: (parent, args, { models }, info) => {
      return models.Book.findAll();
    },
    test: (parent, args, context, info) => {
      return "Hello World.";
    },
  },
  Mutation: {
    createAuthor: (parent, { name }, { models }, info) => {
      return models.Author.create({ name });
    },
    createBook: (parent, { title, authorId }, { models }, info) => {
      return models.Book.create({
        title,
        authorId,
      });
    },
  },
};

export default resolvers;
