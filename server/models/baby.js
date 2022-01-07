'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class baby extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // models.baby.HasOne(models.user, {foreignKey: "mom"})
      // models.baby.HasOne(models.user, {foreignKey: "dad"})
    }
  };
  baby.init({
    baby: DataTypes.STRING,
    mom: DataTypes.INTEGER,
    dad: DataTypes.INTEGER,
    birthday: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'baby',
  });
  return baby;
};