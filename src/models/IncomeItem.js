const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Income = require("./Income")

const IncomeItem = sequelize.define(
  'IncomeItem',
  {
    incomeItemId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      field: 'income_item_id',
    },

    incomeId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'income_id',
      references:{
        model:Income,
        key:'income_id'
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
    tableName: 'income_items',
    timestamps: true, // createdAt, updatedAt
  }
);

//relationships
Income.hasMany(IncomeItem,{foreignKey:'income_id'});
IncomeItem.belongsTo(Income,{foreignKey:'income_id'});


module.exports = IncomeItem;