// src/models/Party.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Party = sequelize.define(
  'Party',
  {
    partyId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      field: 'party_id',
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
    partyPhone: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'party_phone',
    },
    partyEmail: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'party_email',
      validate: {
        isEmail: true,
      },
    },
  },
  {
    tableName: 'parties',
    timestamps: true, // createdAt, updatedAt
  }
);

// relationships

User.hasMany(Party, { foreignKey: 'userId' });// one User can have many Parties (1:N)


Party.belongsTo(User, { foreignKey: 'userId' });// Each Party belongs to one User

module.exports = Party;