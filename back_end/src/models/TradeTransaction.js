class TradeTransaction {
  constructor({
    trade_id, buyer_id, seller_id, offer_id, crypto_currency,
    amount, fiat_currency, fiat_amount, status, created_at
  }) {
    this.trade_id = trade_id;
    this.buyer_id = buyer_id;
    this.seller_id = seller_id;
    this.offer_id = offer_id;
    this.crypto_currency = crypto_currency;
    this.amount = amount;
    this.fiat_currency = fiat_currency;
    this.fiat_amount = fiat_amount;
    this.status = status;
    this.created_at = created_at;
  }

  async getBuyer(db) {
    return db.User.findOne({ where: { user_id: this.buyer_id } });
  }

  async getSeller(db) {
    return db.User.findOne({ where: { user_id: this.seller_id } });
  }

  async getOffer(db) {
    return db.TradeOffer.findOne({ where: { offer_id: this.offer_id } });
  }
}

module.exports = TradeTransaction;