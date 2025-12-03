const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Expense = require("./Expense")

const ExpenseItem = sequelize.define(
  'ExpenseItem',
  {
    expenseItemId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      field: 'expense_item_id',
    },

    expenseId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'expense_id',
      references:{
        model:Expense,
        key:'expense_id'
      },
      onDelete:'CASCADE',
      onUpdate:'CASCADE',
   
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },

    rate: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },

    total: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,

    },
  },

  {
    tableName: 'expense_items',
    timestamps: true, // createdAt, updatedAt
  }
);

//relationships
Expense.hasMany(ExpenseItem,{foreignKey:'expense_id'});
ExpenseItem.belongsTo(Expense,{foreignKey:'expense_id'});


module.exports = ExpenseItem;