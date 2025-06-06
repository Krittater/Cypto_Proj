class TradeOffer {
  constructor({
    offer_id, user_id, offer_type, crypto_currency, fiat_currency,
    price_per_unit, min_amount, max_amount, status, created_at
  }) {
    this.offer_id = offer_id;
    this.user_id = user_id;
    this.offer_type = offer_type;
    this.crypto_currency = crypto_currency;
    this.fiat_currency = fiat_currency;
    this.price_per_unit = price_per_unit;
    this.min_amount = min_amount;
    this.max_amount = max_amount;
    this.status = status;
    this.created_at = created_at;
  }

  // Example: get user for this offer
  async getUser(db) {
    return db.User.findOne({ where: { user_id: this.user_id } });
  }

  // Example: get all trade transactions for this offer
  async getTradeTransactions(db) {
    return db.TradeTransaction.findAll({ where: { offer_id: this.offer_id } });
  }
}

module.exports = TradeOffer;