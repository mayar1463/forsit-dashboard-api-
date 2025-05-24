# Forsit APIs

A Node.js backend for managing products, sales insights, and inventory.

## Tech Stack
- Node.js
- Express.js
- MySQL

## Setup

1. Clone the repo or download ZIP
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file using `.env.example`
   ```
   cp .env.example .env
   ```
4. Create db and Seed demo data:
   ```
   npm run init-db 
   npm run seed-db
   ```
5. Start the server:
   ```
   npm start
   ```

## Endpoints

### Products
- `GET /api/v1/products` – Get all products
- `POST /api/v1/products` – Add new product

### Sales
- `GET /api/v1/sales` – All sales
- `GET /api/v1/sales/filter`  – Filtered sales by date/product and analyze sales data.
- `GET /api/v1/sales/revenue` – Analyze revenue on a daily, weekly, monthly, and annual basis.
- `GET /api/v1/sales/compare` – Provide comparisons of revenue across different periods and categories.

### Inventory
- `GET /api/v1/inventory` – Current stock
- `PUT /api/v1/inventory/:productId` – Update stock
- `GET /api/v1/inventory/logs` –  Product inventry logs
