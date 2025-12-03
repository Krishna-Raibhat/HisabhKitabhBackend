// src/models/UserExpenseCategory.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const UserExpenseCategory = sequelize.define(
  'UserExpenseCategory',
  {
    userExpenseCategoryId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      field: 'user_expense_category_id',
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
    tableName: 'user_expense_categories',
    timestamps: true, // createdAt, updatedAt
  }
);

// Relationships
User.hasMany(UserExpenseCategory, { foreignKey: 'user_id' });
UserExpenseCategory.belongsTo(User, { foreignKey: 'user_id' });

module.exports = UserExpenseCategory;