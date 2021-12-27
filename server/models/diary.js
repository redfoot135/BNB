'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class diary extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.diary.belongsTo(models.user, {foreignKey: "writer"})
      models.diary.hasMany(models.diary_comment, {foreignKey: 'diary_id'})
    }
  };
  diary.init({
    title: DataTypes.STRING,
    writer: DataTypes.INTEGER,
    createdAt: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'diary',
  });
  return diary;
};