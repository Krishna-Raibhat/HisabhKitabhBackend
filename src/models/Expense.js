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
        key: 'user_id',
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
        key: 'user_expense_category_id',
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
    tableName: 'expenses',
    timestamps: true, // createdAt, updatedAt
  }
);

// Relationships
User.hasMany(Expense, { foreignKey: 'user_id' });
Expense.belongsTo(User, { foreignKey: 'user_id' });

UserExpenseCategory.hasMany(Expense, { foreignKey: 'category_id' });
Expense.belongsTo(UserExpenseCategory, { foreignKey: 'category_id' });

PaymentMode.hasMany(Expense,{foreignKey:'payment_mode_id'});
Expense.belongsTo(PaymentMode,{foreignKey:'payment_mode_id'});


module.exports = Expense;