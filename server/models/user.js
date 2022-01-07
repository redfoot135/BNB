'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.user.hasMany(models.diary, {foreignKey: 'writer'})
      models.user.hasMany(models.diary_comment, {foreignKey: 'user_id'})
      // models.user.hasOne(models.baby, {foreignKey: "mom"})
      // models.user.hasOne(models.baby, {foreignKey: "dad"})
    }
  };
  user.init({
    idName: DataTypes.STRING,
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    social: DataTypes.STRING,
    email: DataTypes.STRING,
    gender: DataTypes.STRING,
    spouse: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};