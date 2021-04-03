"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ceremony extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Ceremony.init(
    {
      name: DataTypes.STRING,
      date: DataTypes.DATE,
      numberOfAssistants: DataTypes.INTEGER,
      timeOptions: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Ceremony",
    }
  );
  return Ceremony;
};
