import { DataTypes } from "sequelize";

const defineModels = (sequelize) => {
  const Author = sequelize.define("author", {
    name: {
      type: DataTypes.STRING,
    },
  });

  const Book = sequelize.define("book", {
    title: {
      type: DataTypes.STRING,
    },
  });

  Author.hasMany(Book, { onDelete: "CASCADE" });
  Book.belongsTo(Author);

  return { Author, Book };
};

export { defineModels };
