const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config');
const sequelize = new Sequelize(config.DB_NAME, config.DB_USER, config.DB_PASSWORD, {
  host: config.DB_HOST,
  dialect: 'mysql',
});

const Wallet = sequelize.define('Wallet', {
  wallet_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  currency: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  balance: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  tableName: 'wallets',
  timestamps: false,
});

class WalletClass {
  constructor({ wallet_id, user_id, currency, balance }) {
    this.wallet_id = wallet_id;
    this.user_id = user_id;
    this.currency = currency;
    this.balance = balance;
  }

  // Example: get user for this wallet
  async getUser(db) {
    return db.User.findOne({ where: { user_id: this.user_id } });
  }
}

module.exports = { Wallet, WalletClass };