'use strict';
module.exports = (sequelize, DataTypes) => {
  const Books = sequelize.define('Books', {
    //id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    author: DataTypes.STRING,
    editorial: DataTypes.STRING,
    year: DataTypes.INTEGER,
    pages: DataTypes.INTEGER
  }, {});
  Books.associate = function(models) {
    // associations can be defined here
  };
  return Books;
};