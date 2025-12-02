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
        key: "userId",
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
        key: "partyId",
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
User.hasMany(PartyTransaction, { foreignKey: "userId" });
PartyTransaction.belongsTo(User, { foreignKey: "userId" });

Party.hasMany(PartyTransaction, { foreignKey: "partyId" });
PartyTransaction.belongsTo(Party, { foreignKey: "partyId" });

module.exports = PartyTransaction;