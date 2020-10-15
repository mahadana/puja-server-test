import { DataTypes, Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config()

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: "db",
    dialect: "postgres",
  }
);

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

export default {
  sequelize,
  Author,
  Book,
};
