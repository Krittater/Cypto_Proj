const { Model, DataTypes } = require('sequelize');
const config = require('../config');
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(config.DB_NAME, config.DB_USER, config.DB_PASSWORD, {
  host: config.DB_HOST,
  dialect: 'mysql',
});

class FiatTransaction extends Model {
  static associate(models) {
    // define association here
    FiatTransaction.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
  }
}

FiatTransaction.init(
  {
    fiat_tx_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('deposit', 'withdrawal'),
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
      type: DataTypes.ENUM('pending', 'completed', 'failed'),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'FiatTransaction',
    tableName: 'fiat_transactions',
    timestamps: false,
  }
);

module.exports = FiatTransaction;