const { sequelize, User, Wallet, TradeOffer, TradeTransaction, Transfer, FiatTransaction } = require('./models/user');
const bcrypt = require('bcrypt');

async function seed() {
  await sequelize.sync({ force: true });

  // สร้าง user ตัวอย่าง
  const password1 = await bcrypt.hash('password123', 10);
  const password2 = await bcrypt.hash('password456', 10);
  const user1 = await User.create({
    email: 'test1@example.com',
    password: password1,
    name: 'Test User 1',
    phone: '0811111111'
  });
  const user2 = await User.create({
    email: 'test2@example.com',
    password: password2,
    name: 'Test User 2',
    phone: '0822222222'
  });

  // สร้าง wallet ตัวอย่าง
  const wallet1 = await Wallet.create({
    user_id: user1.user_id,
    currency: 'BTC',
    balance: 1.5
  });
  const wallet2 = await Wallet.create({
    user_id: user2.user_id,
    currency: 'ETH',
    balance: 10
  });

  // สร้าง trade offer ตัวอย่าง
  const offer1 = await TradeOffer.create({
    user_id: user1.user_id,
    crypto_amount: 0.5,
    fiat_amount: 50000,
    status: 'open'
  });

  // สร้าง trade transaction ตัวอย่าง
  const tradeTx1 = await TradeTransaction.create({
    buyer_id: user2.user_id,
    seller_id: user1.user_id,
    offer_id: offer1.offer_id,
    crypto_currency: 'BTC',
    amount: 0.1,
    fiat_currency: 'THB',
    fiat_amount: 10000,
    status: 'pending'
  });

  // สร้าง transfer ตัวอย่าง
  const transfer1 = await Transfer.create({
    transfer_id: undefined, // ให้ระบบ generate
    from_user_id: user1.user_id,
    to_user_id: user2.user_id,
    to_external_address: null,
    crypto_currency: 'BTC',
    amount: 0.05,
    transfer_type: 'internal',
    status: 'pending'
  });

  // สร้าง fiat transaction ตัวอย่าง
  const fiatTx1 = await FiatTransaction.create({
    user_id: user1.user_id,
    type: 'deposit',
    currency: 'THB',
    amount: 20000,
    status: 'pending'
  });

  console.log('Seeding completed!');
  process.exit();
}

seed();
