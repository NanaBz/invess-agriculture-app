


# Invess Agriculture Fertilizer Stock App

## App Overview
Invess Agriculture's mobile-first app streamlines fertilizer stock management for all roles. It features:

- **Role-Based Dashboard:**
  - Sales Agent: Request creation, dashboard, notifications
  - Compliance Officer: Approvals, dashboard, notifications
  - Warehouse Officer: Stock management, waybill tracking, notifications
  - Admin/Manager: Full access, user management, reports, notifications

- **Requests & Approvals:**
  - Create, view, and track fertilizer requests
  - Approve/reject requests with real-time updates

- **Warehouse & Waybill Management:**
  - View/update warehouse stock
  - Track stock movements and waybill status (pending, in transit, delivered, cancelled)
  - Auto-generate waybills on request approval/stock release

- **Notifications:**
  - Real-time, event-driven notifications for requests, approvals, waybills, and stock changes
  - Push notifications for mobile devices

- **Reporting & Users:**
  - Role-based reports and analytics
  - Admin user management (add/delete users)

- **Branding & UI:**
  - Invess logo and color palette throughout
  - Modern, clean interface with tab navigation

## Architecture
- `features/` — Modular folders for requests, approvals, warehouse, waybills, notifications, profile, reports
- `store/` — Redux Toolkit global state (requests, waybills, warehouse, notifications, users)
- `backend/` — Express/MongoDB REST API, push notification logic
- `app/tabs/` — Tab navigation and header logic
- `assets/` — Logo, images, fonts

## Logic Highlights
- All data is synced live via Redux and backend polling
- Notifications are triggered by all major actions and status changes
- Waybills are linked to requests and warehouse releases
- Role-based access controls all features and actions

## Contact
For support, contact the Invess Agriculture development team.
