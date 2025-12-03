const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const PaymentMode = sequelize.define(
  'PaymentMode',
  {
    paymentModeId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      field: 'payment_mode_id',
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
    paymentModeName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'paymet_mode_name',
    },
    isDefault: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: 'is_default',
    },
  },
  {
    tableName: 'payment_modes',
    timestamps: true, // createdAt, updatedAt
  }
);

// relationships
User.hasMany(PaymentMode, { foreignKey: 'user_id' });
PaymentMode.belongsTo(User, { foreignKey: 'user_id' });

module.exports = PaymentMode;