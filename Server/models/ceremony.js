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
      // this.hasMany(models.Reservation);
    }
  }
  Ceremony.init(
    {
      name: DataTypes.STRING,
      date: DataTypes.DATE,
      numberOfAssistants: DataTypes.INTEGER,
      timeOptions: DataTypes.STRING,
      show: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "ceremony",
    }
  );
  return Ceremony;
};
