# Zorvyn

A secure, role-based **Finance Dashboard API** built with Express, TypeScript, Prisma, and PostgreSQL. Zorvyn provides authentication, financial record management, and analytics with fine-grained access control across three user roles.

---

## Tech Stack

| Layer          | Technology                        |
| -------------- | --------------------------------- |
| Runtime        | Node.js + TypeScript              |
| Framework      | Express 5                         |
| ORM            | Prisma (v7)                       |
| Database       | PostgreSQL (Neon)                 |
| Auth           | JWT (`jsonwebtoken`) + bcryptjs   |
| Validation     | Zod                               |
| Dev Server     | Nodemon + ts-node                 |

---

## Project Structure

```
Zorvyn/
├── prisma/
│   ├── schema.prisma        # Database models & enums
│   └── seed.ts              # Seed script with sample users & records
├── src/
│   ├── controllers/         # Route handlers
│   │   ├── auth.controller.ts
│   │   ├── dashboard.controller.ts
│   │   └── record.controller.ts
│   ├── middlewares/          # Auth, validation & error handling
│   │   ├── auth.ts
│   │   ├── errorHandler.ts
│   │   └── validate.ts
│   ├── routes/               # Express route definitions
│   │   ├── auth.routes.ts
│   │   ├── dashboard.routes.ts
│   │   └── record.routes.ts
│   ├── schemas/              # Zod validation schemas
│   │   └── index.ts
│   ├── services/             # Business logic
│   │   ├── auth.service.ts
│   │   ├── dashboard.service.ts
│   │   └── record.service.ts
│   ├── utils/                # Shared utilities
│   │   ├── errors.ts
│   │   └── prisma.ts
│   └── index.ts              # App entry point
├── prisma.config.ts
├── tsconfig.json
├── package.json
└── .env                      # Environment variables (not committed)
```

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9
- **PostgreSQL** database (local or hosted, e.g. [Neon](https://neon.tech))

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/Zorvyn.git
cd Zorvyn

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
DATABASE_URL="postgresql://user:password@host:5432/dbname?sslmode=require"
JWT_SECRET="your-jwt-secret-key"
PORT=3000
```

### Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Seed the database with sample data
npx prisma db seed
```

### Start the Server

```bash
# Development (hot-reload)
npm run dev

# Production
npm run build
npm start
```

The server will start on `http://localhost:3000` by default.

---

## API Reference

All endpoints return JSON. Protected routes require a `Bearer` token in the `Authorization` header.

### Authentication

| Method | Endpoint             | Body                                            | Description          |
| ------ | -------------------- | ----------------------------------------------- | -------------------- |
| POST   | `/api/auth/register` | `{ name, email, password, role? }`              | Register a new user  |
| POST   | `/api/auth/login`    | `{ email, password }`                           | Login & receive JWT  |

### Financial Records *(Authenticated)*

| Method | Endpoint             | Access           | Description              |
| ------ | -------------------- | ---------------- | ------------------------ |
| GET    | `/api/records`       | Analyst, Admin   | List all records         |
| GET    | `/api/records/:id`   | Analyst, Admin   | Get a single record      |
| POST   | `/api/records`       | Admin            | Create a new record      |
| PUT    | `/api/records/:id`   | Admin            | Update an existing record|
| DELETE | `/api/records/:id`   | Admin            | Delete a record          |

**Create/Update body:**

```json
{
  "amount": 5000,
  "type": "INCOME",
  "category": "Salary",
  "date": "2026-04-01T00:00:00.000Z",
  "notes": "Monthly salary"
}
```

### Dashboard *(Authenticated)*

| Method | Endpoint                  | Access                    | Description            |
| ------ | ------------------------- | ------------------------- | ---------------------- |
| GET    | `/api/dashboard/summary`  | Viewer, Analyst, Admin    | Aggregated analytics   |

**Query params:** `startDate`, `endDate` (ISO 8601 datetime, optional)

**Response:**

```json
{
  "totalIncome": 15000,
  "totalExpense": 3800,
  "netBalance": 11200,
  "categoryTotals": { "Salary": 5000, "Rent": 1500, ... },
  "recentActivity": [ ... ]
}
```

---

## Role-Based Access Control (RBAC)

| Role       | Dashboard | View Records | Create / Update / Delete Records |
| ---------- | --------- | ------------ | -------------------------------- |
| **Viewer** | ✅        | ❌           | ❌                               |
| **Analyst**| ✅        | ✅           | ❌                               |
| **Admin**  | ✅        | ✅           | ✅                               |

---

## Seed Data

Running `npx prisma db seed` creates three test users (all with password `password123`):

| Email                | Role    |
| -------------------- | ------- |
| admin@test.local     | ADMIN   |
| analyst@test.local   | ANALYST |
| viewer@test.local    | VIEWER  |

Plus 5 sample financial records across Income and Expense categories.

---

## Scripts

| Command         | Description                            |
| --------------- | -------------------------------------- |
| `npm run dev`   | Start dev server with hot-reload       |
| `npm run build` | Compile TypeScript to `dist/`          |
| `npm start`     | Run compiled production build          |
| `npm test`      | Run tests *(placeholder)*             |

---

## License

ISC
