const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');

// Load env vars
dotenv.config();

// Connect to DB
connectDB();

const app = express();
app.use(cors());
app.use(express.json());


// Routes
app.get('/', (req, res) => res.send('API Running'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/requests', require('./routes/requests'));
app.use('/api/warehouses', require('./routes/warehouses'));
app.use('/api/invoices', require('./routes/invoices'));
app.use('/api/notifications', require('./routes/notifications'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server started on port ${PORT} (listening on all interfaces)`));
