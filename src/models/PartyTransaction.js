const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const Party = require("./Party");

const PartyTransaction = sequelize.define(
  "PartyTransaction",
  {
    partyId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      field: "party_id",
    },

    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "user_id",
      references: {
        model: User,
        key: "user_id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",

    },

    partyId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "party_id",
      references: {
        model: Party,
        key: "party_id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
  
    },

    type: {
      type: DataTypes.ENUM("paymentIn", "paymentOut"),//no other values 
      allowNull: false,
      field: "type",

    },

  },
  {
    tableName: "party_transactions",
    timestamps: true,
  }
);

//associations
User.hasMany(PartyTransaction, { foreignKey: "user_id" });
PartyTransaction.belongsTo(User, { foreignKey: "user_id" });

Party.hasMany(PartyTransaction, { foreignKey: "party_id" });
PartyTransaction.belongsTo(Party, { foreignKey: "party_id" });

module.exports = PartyTransaction;