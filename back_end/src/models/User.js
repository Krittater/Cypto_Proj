const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config');
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: config.DB_HOST,
  port: config.DB_PORT,
  username: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  logging: false, // ปิด log SQL query
});

// Define User model
const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: { 
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'users',
  timestamps: false,
});

User.beforeCreate(async (user, options) => {
  const now = new Date();
  const yymmdd = now.toISOString().slice(2,10).replace(/-/g,'');
  const count = await User.count({
    where: sequelize.where(
      sequelize.fn('LEFT', sequelize.col('user_id'), 6),
      yymmdd
    )
  });
  const seq = String(count + 1).padStart(2, '0');
  user.user_id = `${yymmdd}${seq}`;
});

// Define Wallet model
const Wallet = sequelize.define('Wallet', {
  wallet_id: {
    type: DataTypes.STRING, 
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.STRING, 
    allowNull: false,
  },
  balance: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  currency: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'wallets',
  timestamps: false,
});

Wallet.beforeCreate(async (wallet, options) => {
  const now = new Date();
  const yymmdd = now.toISOString().slice(2,10).replace(/-/g,'');
  const count = await Wallet.count({
    where: sequelize.where(
      sequelize.fn('LEFT', sequelize.col('wallet_id'), 6),
      yymmdd
    )
  });
  const seq = String(count + 1).padStart(2, '0');
  wallet.wallet_id = `${yymmdd}${seq}`;
});

// Define TradeOffer model
const TradeOffer = sequelize.define('TradeOffer', {
  offer_id: {
    type: DataTypes.STRING, // เปลี่ยนเป็น STRING
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.STRING, // ต้องตรงกับ User PK
    allowNull: false,
  },
  crypto_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  fiat_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'trade_offers',
  timestamps: false,
});

TradeOffer.beforeCreate(async (offer, options) => {
  const now = new Date();
  const yymmdd = now.toISOString().slice(2,10).replace(/-/g,'');
  const count = await TradeOffer.count({
    where: sequelize.where(
      sequelize.fn('LEFT', sequelize.col('offer_id'), 6),
      yymmdd
    )
  });
  const seq = String(count + 1).padStart(2, '0');
  offer.offer_id = `${yymmdd}${seq}`;
});

// Define TradeTransaction model
const TradeTransaction = sequelize.define('TradeTransaction', {
  trade_id: {
    type: DataTypes.STRING, // เปลี่ยนเป็น STRING
    primaryKey: true,
  },
  buyer_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  seller_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  offer_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  crypto_currency: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  fiat_currency: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fiat_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'trade_transactions',
  timestamps: false,
});

TradeTransaction.beforeCreate(async (tx, options) => {
  const now = new Date();
  const yymmdd = now.toISOString().slice(2,10).replace(/-/g,'');
  const count = await TradeTransaction.count({
    where: sequelize.where(
      sequelize.fn('LEFT', sequelize.col('trade_id'), 6),
      yymmdd
    )
  });
  const seq = String(count + 1).padStart(2, '0');
  tx.trade_id = `${yymmdd}${seq}`;
});

// Define Transfer model
const Transfer = sequelize.define('Transfer', {
  transfer_id: {
    type: DataTypes.STRING, // เปลี่ยนเป็น STRING
    primaryKey: true,
  },
  from_user_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  to_user_id: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  to_external_address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  crypto_currency: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  transfer_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'transfers',
  timestamps: false,
});

Transfer.beforeCreate(async (transfer, options) => {
  const now = new Date();
  const yymmdd = now.toISOString().slice(2,10).replace(/-/g,'');
  const count = await Transfer.count({
    where: sequelize.where(
      sequelize.fn('LEFT', sequelize.col('transfer_id'), 6),
      yymmdd
    )
  });
  const seq = String(count + 1).padStart(2, '0');
  transfer.transfer_id = `${yymmdd}${seq}`;
});

// Define FiatTransaction model
const FiatTransaction = sequelize.define('FiatTransaction', {
  fiat_tx_id: {
    type: DataTypes.STRING, // เปลี่ยนเป็น STRING
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  currency: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'fiat_transactions',
  timestamps: false,
});

FiatTransaction.beforeCreate(async (fiatTx, options) => {
  const now = new Date();
  const yymmdd = now.toISOString().slice(2,10).replace(/-/g,'');
  const count = await FiatTransaction.count({
    where: sequelize.where(
      sequelize.fn('LEFT', sequelize.col('fiat_tx_id'), 6),
      yymmdd
    )
  });
  const seq = String(count + 1).padStart(2, '0');
  fiatTx.fiat_tx_id = `${yymmdd}${seq}`;
});

// --- Associations ---

// User 1:N Wallet
User.hasMany(Wallet, { foreignKey: 'user_id' });
Wallet.belongsTo(User, { foreignKey: 'user_id' });

// User 1:N TradeOffer
User.hasMany(TradeOffer, { foreignKey: 'user_id' });
TradeOffer.belongsTo(User, { foreignKey: 'user_id' });

// User 1:N TradeTransaction (buyer)
User.hasMany(TradeTransaction, { foreignKey: 'buyer_id', as: 'BuyTransactions' });
TradeTransaction.belongsTo(User, { foreignKey: 'buyer_id', as: 'Buyer' });

// User 1:N TradeTransaction (seller)
User.hasMany(TradeTransaction, { foreignKey: 'seller_id', as: 'SellTransactions' });
TradeTransaction.belongsTo(User, { foreignKey: 'seller_id', as: 'Seller' });

// TradeOffer 1:N TradeTransaction
TradeOffer.hasMany(TradeTransaction, { foreignKey: 'offer_id' });
TradeTransaction.belongsTo(TradeOffer, { foreignKey: 'offer_id' });

// User 1:N Transfer (as sender)
User.hasMany(Transfer, { foreignKey: 'from_user_id', as: 'TransfersSent' });
Transfer.belongsTo(User, { foreignKey: 'from_user_id', as: 'Sender' });

// User 1:N Transfer (as receiver)
User.hasMany(Transfer, { foreignKey: 'to_user_id', as: 'TransfersReceived' });
Transfer.belongsTo(User, { foreignKey: 'to_user_id', as: 'Receiver' });

// User 1:N FiatTransaction
User.hasMany(FiatTransaction, { foreignKey: 'user_id' });
FiatTransaction.belongsTo(User, { foreignKey: 'user_id' });

module.exports = {
  sequelize,
  User,
  Wallet,
  TradeOffer,
  TradeTransaction,
  Transfer,
  FiatTransaction,
};