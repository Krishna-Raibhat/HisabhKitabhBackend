// src/models/UserIncomeCategory.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const UserIncomeCategory = sequelize.define(
  'UserIncomeCategory',
  {
    userIncomeCategoryId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      field: 'user_income_category_id',
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'user_id',
      references: {
        model: User,
        key: 'userId',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    userCategoryName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'user_category_name',
    },
    isDefault: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: 'is_default',
    },
  },
  {
    tableName: 'user_income_categories',
    timestamps: true, // createdAt, updatedAt
  }
);

// relationships
User.hasMany(UserIncomeCategory, { foreignKey: 'user_id' });
UserIncomeCategory.belongsTo(User, { foreignKey: 'user_id' });

module.exports = UserIncomeCategory;