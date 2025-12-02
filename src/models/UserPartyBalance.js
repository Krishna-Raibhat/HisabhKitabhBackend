const { DataTypes, UUIDV4 } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const Party = require("./Party");

const UserPartyBalance = sequelize.define(
  "UserPartyBalance",
  {
    UserPartyBalanceId:{
        type: DataTypes.UUID,
        defaultValue:UUIDV4,
        primaryKey:true,
        field:'user_party_balance_id'

    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
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
      primaryKey: true,
      field: "party_id",
      references: {
        model: Party,
        key: "partyId",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    },

    balanceAmount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      field: "balance_amount",
      defaultValue: 0.0,
    },

  },
  {
    tableName: "user_party_balances",
    timestamps: true,
  }
);

//associations
User.hasMany(UserPartyBalance, { foreignKey: "userId" });
UserPartyBalance.belongsTo(User, { foreignKey: "userId" });

Party.hasMany(UserPartyBalance, { foreignKey: "partyId" });
UserPartyBalance.belongsTo(Party, { foreignKey: "partyId" });

module.exports = UserPartyBalance;