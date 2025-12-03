// src/models/Expense.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const UserExpenseCategory = require('./UserExpenseCategory');
const PaymentMode = require("./PaymentMode");

const Expense = sequelize.define(
  'Expense',
  {
    expenseId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      field: 'expense_id',
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
    
    expenseAmount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      field: 'expense_amount',
    },

    categoryId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'category_id',
      references: {
        model: UserExpenseCategory,
        key: 'userExpenseCategoryId',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    },

    payementModeId:{
        type: DataTypes.UUID,
        allowNull: false,
        field: 'payment_mode_id',
        references: {
            model: PaymentMode,
            key: 'paymentModeId',
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
    tableName: 'expenses',
    timestamps: true, // createdAt, updatedAt
  }
);

// Relationships
User.hasMany(Expense, { foreignKey: 'userId' });
Expense.belongsTo(User, { foreignKey: 'userId' });

UserExpenseCategory.hasMany(Expense, { foreignKey: 'categoryId' });
Expense.belongsTo(UserExpenseCategory, { foreignKey: 'categoryId' });

PaymentMode.hasMany(Expense,{foreignKey:'paymentModeId'});
Expense.belongsTo(PaymentMode,{foreignKey:'paymentModeId'});


module.exports = Expense;