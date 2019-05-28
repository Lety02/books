'use strict';
module.exports = (sequelize, DataTypes) => {
  const books = sequelize.define('books', {
    name: DataTypes.STRING,
    author: DataTypes.STRING,
    editorial: DataTypes.STRING,
    year: DataTypes.INTEGER,
    pages: DataTypes.INTEGER
  }, {});
  books.associate = function(models) {
    // associations can be defined here
  };
  return books;
};