// src/models/Balance.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Balance = sequelize.define(
  'Balance',
  {
    balanceId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      field: 'balance_id',
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
    balanceAmount: {
      type: DataTypes.DECIMAL(12, 2), //-9999999999.99 to 9999999999.99
      allowNull: false,
      defaultValue: 0.0,
      field: 'balance_amount',
    },
  },
  {
    tableName: 'balances',
    timestamps: true, // createdAt, updatedAt
  }
);

// associations
User.hasOne(Balance, { foreignKey: 'userId' }); //one to one relation
Balance.belongsTo(User, { foreignKey: 'userId' });

module.exports = Balance;