# Invess Agriculture Backend

A Node.js + Express backend for the Invess Agriculture Fertilizer Stock Management App. Provides RESTful APIs for authentication, users, requests, approvals, warehouses, invoices, and notifications.

## Features
- User authentication (JWT)
- Role-based access (Sales Agent, Compliance Officer, Warehouse Officer, Admin/Manager)
- CRUD for requests, approvals, warehouses, invoices, notifications
- MongoDB database

## Structure
- `models/` - Mongoose models
- `routes/` - Express route handlers
- `controllers/` - Business logic
- `middleware/` - Auth, error handling, etc.
- `config/` - Database and environment config

## Setup
1. Copy `.env.example` to `.env` and fill in your values
2. Install dependencies: `npm install`
3. Start server: `npm run dev`

## API Endpoints
- `/api/auth` - Login, register
- `/api/users` - User management
- `/api/requests` - Fertilizer requests
- `/api/approvals` - Approvals
- `/api/warehouses` - Warehouse stock
- `/api/invoices` - Invoices
- `/api/notifications` - Notifications

---
MIT License
