

# Invess Agriculture Fertilizer Stock Management App

## Overview
This project is a modern, mobile-first application for Invess Agriculture, designed to streamline fertilizer stock management, requests, approvals, warehouse operations, invoicing, reporting, and notifications. The app features a clean white/green/blue theme, company branding, and role-based access for different user types.

## Key Features

- **Role-Based Access:**
	- Sales Agent: Create/view requests, see dashboard, receive notifications.
	- Compliance Officer: Approve/reject requests, see dashboard, receive notifications.
	- Warehouse Officer: Manage warehouse stock/movements, view invoices, receive notifications.
	- Admin/Manager: Full access to all features, including reports.

- **Dashboard:**
	- Real-time stock levels for all warehouses
	- Pending requests and alerts

- **Requests:**
	- Create, view, and track fertilizer requests

- **Approvals:**
	- Approve or reject requests (Compliance/Admin roles)

- **Warehouse Management:**
	- View and update warehouse stock
	- Track stock movements

- **Invoices:**
	- View and manage invoices related to fertilizer distribution

- **Reports:**
	- Generate and view operational and stock reports

- **Notifications:**
	- Real-time notifications for actions, approvals, and alerts

- **Branding:**
	- Invess logo and company name in all headers and login
	- Consistent color palette and modern UI

## Technology Stack
- React Native (Expo)
- TypeScript
- Redux Toolkit (state management)
- NativeWind (utility-first styling)
- Lucide Icons
- Expo Router

## Architecture
- `features/` — Modular feature folders for each major app section
- `store/` — Redux Toolkit store and slices for global state
- `constants/` — Color palette and app-wide constants
- `assets/` — Company logo, images, and fonts
- `app/tabs/` — Bottom tab navigation and header logic

## Roles & Permissions
- Each user role sees only the features relevant to their responsibilities.
- Admin/Manager has access to all features and reports.

## Branding
- Company logo and name are visible on login and in the app header.
- All screens use the Invess Agriculture color palette for a unified look.

## Contact
For questions or support, contact the Invess Agriculture development team.
