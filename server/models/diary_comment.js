'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class diary_comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.diary_comment.belongsTo(models.diary, {foreignKey: "diary_id"})
      models.diary_comment.belongsTo(models.user, {foreignKey: "writer"})
    }
  };
  diary_comment.init({
    diary_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    writer: DataTypes.STRING,
    comment: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'diary_comment',
  });
  return diary_comment;
};