const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User');
const Warehouse = require('./models/Warehouse');
const Request = require('./models/Request');
const Invoice = require('./models/Invoice');

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  await Promise.all([
    User.deleteMany({}),
    Warehouse.deleteMany({}),
    Request.deleteMany({}),
    Invoice.deleteMany({}),
  ]);
  console.log('Cleared all existing data');

  const wh1 = new Warehouse({ name: 'Teachermante', stock: 0 });
  const wh2 = new Warehouse({ name: 'Teikwame', stock: 0 });
  const wh3 = new Warehouse({ name: 'Tamale', stock: 0 });
  const wh4 = new Warehouse({ name: 'Tema', stock: 0 });
  await wh1.save();
  await wh2.save();
  await wh3.save();
  await wh4.save();
  console.log('Seeded locations: Teachermante, Teikwame, Tamale, Tema with 0 stock');
  console.log('Ready for first user signup');

  await mongoose.disconnect();
  console.log('Done');
}

seed().catch((e) => { console.error(e); process.exit(1); });
