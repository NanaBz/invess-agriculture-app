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

  const admin = new User({ name: 'Admin User', email: 'admin@example.com', password: 'password123', role: 'Admin/Manager' });
  const sales = new User({ name: 'Sales Agent', email: 'sales@example.com', password: 'password123', role: 'Sales Agent' });
  const warehouseOfficer = new User({ name: 'Warehouse Officer', email: 'warehouse@example.com', password: 'password123', role: 'Warehouse Officer' });
  await admin.save();
  await sales.save();
  await warehouseOfficer.save();
  console.log('Seeded users');

  const wh1 = new Warehouse({ name: 'Central Warehouse', stock: 1000 });
  const wh2 = new Warehouse({ name: 'North Depot', stock: 500 });
  await wh1.save();
  await wh2.save();
  console.log('Seeded warehouses');

  const req1 = new Request({ title: '100 bags for North', description: 'For next week distribution', createdBy: sales._id, status: 'Pending' });
  await req1.save();
  console.log('Seeded a request');

  const inv1 = new Invoice({ warehouse: wh1._id, amount: 2500, status: 'Unpaid', details: 'Initial delivery invoice' });
  await inv1.save();
  console.log('Seeded an invoice');

  await mongoose.disconnect();
  console.log('Done');
}

seed().catch((e) => { console.error(e); process.exit(1); });
