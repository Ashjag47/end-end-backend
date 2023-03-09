"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Entities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Entities.belongsTo(models.ContentType, {
        foreignKey: "contentId",
      });
    }
  }
  Entities.init(
    {
      entityFields: DataTypes.JSONB,
    },
    {
      sequelize,
      modelName: "Entities",
    }
  );
  return Entities;
};
