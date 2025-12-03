// src/models/Income.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const UserIncomeCategory = require('./UserIncomeCategory');
const PaymentMode = require("./PaymentMode");

const Income = sequelize.define(
  'Income',
  {
    incomeId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      field: 'income_id',
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

    incomeAmount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      field: 'income_amount',
    },

    categoryId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'category_id',
      references: {
        model: UserIncomeCategory,
        key: 'user_income_category_id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    },

    paymentModeId:{
        type: DataTypes.UUID,
        allowNull: false,
        field: 'payment_mode_id',
        references: {
            model: PaymentMode,
            key: 'payment_mode_id',
        },
        onDelete: 'SET NULL',//set PaymentModeId null when parent is deleted
        onUpdate: 'CASCADE',

    },

    remarks:{
        type: DataTypes.STRING,
        allowNull: true,

    },

    path: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'Path or URL of the uploaded receipt image',
    },

    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

  },

  {
    tableName: 'incomes',
    timestamps: true, // createdAt, updatedAt
  }

);

// Relationships
User.hasMany(Income, { foreignKey: 'user_id' });
Income.belongsTo(User, { foreignKey: 'user_id' });

UserIncomeCategory.hasMany(Income, { foreignKey: 'user_income_category_id' });
Income.belongsTo(UserIncomeCategory, { foreignKey: 'user_income_category_id' });

PaymentMode.hasMany(Income,{foreignKey:'payment_mode_id'});
Income.belongsTo(PaymentMode,{foreignKey:'payment_mode_id'});

module.exports = Income;