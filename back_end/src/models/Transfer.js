"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Transfer {
    constructor({ transfer_id, from_user_id, to_user_id, to_external_address, crypto_currency, amount, transfer_type, status, created_at }) {
        this.transfer_id = transfer_id;
        this.from_user_id = from_user_id;
        this.to_user_id = to_user_id;
        this.to_external_address = to_external_address;
        this.crypto_currency = crypto_currency;
        this.amount = amount;
        this.transfer_type = transfer_type;
        this.status = status;
        this.created_at = created_at;
    }
    async getFromUser(db) {
        return db.User.findOne({ where: { user_id: this.from_user_id } });
    }
    async getToUser(db) {
        if (!this.to_user_id)
            return null;
        return db.User.findOne({ where: { user_id: this.to_user_id } });
    }
}
exports.default = Transfer;
