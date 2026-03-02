 Company Incorporation App
A full-stack web application for managing company incorporation workflows — built with Next.js, Node.js, Express, and PostgreSQL (Neon).

 Overview
This app provides a guided multi-step workflow to incorporate a company:

Step 1 — Enter company name, capital, and shareholder count
Step 2 — Add shareholder details
Confirmation — View the completed incorporation summary
Admin Dashboard — View and manage all companies


📁 Project Structure
/
├── frontend/                        # Next.js frontend
│   └── src/
│       ├── app/
│       │   ├── layout.tsx           # Root layout
│       │   ├── page.tsx             # Landing page
│       │   ├── incorporate/
│       │   │   ├── page.tsx         # Step 1 – Company details
│       │   │   └── [id]/
│       │   │       ├── shareholders/ # Step 2 – Add shareholders
│       │   │       └── success/      # Confirmation page
│       │   └── admin/
│       │       └── page.tsx         # Admin dashboard
│       ├── components/ui/index.tsx  # Button, Input, Card, Badge, NavBar...
│       ├── lib/api.ts               # All API calls (typed)
│       └── types/index.ts           # Shared TypeScript types
│
└── backend/                         # Express.js backend
    └── src/
        ├── config/
        │   └── db.js                # PostgreSQL (Neon) connection
        ├── controllers/
        │   ├── company.controller.js
        │   └── shareholder.controller.js
        ├── middleware/
        │   └── error.middleware.js
        ├── routes/
        │   ├── company.routes.js
        │   └── shareholder.routes.js
        ├── services/
        │   ├── company.service.js
        │   └── shareholder.service.js
        ├── app.js
        └── server.js

 Tech Stack
LayerTechnologyFrontendNext.js (App Router) + TypeScriptStylingTailwind CSSBackendNode.js + Express v5DatabasePostgreSQL via NeonDB Clientnode-postgres (pg)IDsUUID v4Configdotenv

Getting Started
Prerequisites

Node.js v18+
A Neon PostgreSQL database


1. Clone the Repository
bashgit clone <your-repo-url>
cd <your-repo-name>

2. Set Up the Database
Run the following SQL in your Neon dashboard:
sql CREATE TABLE companies (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  shareholders_count INTEGER NOT NULL,
  total_capital NUMERIC NOT NULL,
  status VARCHAR(50) DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE shareholders (
  id UUID PRIMARY KEY,
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  nationality VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

3. Backend Setup
bashcd backend
npm install
Create a .env file in the backend/ directory:
envDATABASE_URL=your_neon_postgres_connection_string
PORT=5000

Get your DATABASE_URL from Neon Console → Connection Details.

Start the backend server:
bash# Development (with nodemon)
npm run dev

# Production
npm start
Backend runs at: http://localhost:5000

4. Frontend Setup
bashcd frontend
npm install
Verify your .env.local file in the frontend/ directory:
env NEXT_PUBLIC_API_URL=http://localhost:5000/api
Start the frontend dev server:
bashnpm run dev
Frontend runs at: http://localhost:3000

API Endpoints
Health Check
GET /

Companies
MethodEndpointDescriptionPOST/api/companiesCreate a new company
(Step 1)GET/api/companiesGet all companies with shareholdersGET/api/companies/:idGet a single company by IDPATCH/api/companies/:idUpdate company details/status
POST /api/companies
Request Body:
json{
  "name": "Acme Corp",
  "shareholders_count": 2,
  "total_capital": 50000
}
Response:
json{
  "success": true,
  "data": {
    "id": "uuid-here",
    "name": "Acme Corp",
    "shareholders_count": 2,
    "total_capital": "50000",
    "status": "draft",
    "created_at": "...",
    "updated_at": "..."
  }
}
PATCH /api/companies/:id
json{
  "name": "Acme Ltd",
  "shareholders_count": 3,
  "total_capital": 75000,
  "status": "completed"
}

status must be "draft" or "completed".

Shareholders
MethodEndpointDescriptionPOST/api/companies/:company_id/shareholders/bulkAdd shareholders
POST /api/companies/:company_id/shareholders/bulk
Request Body:
json{
  "shareholders": [
    { "first_name": "Alice", "last_name": "Smith", "nationality": "American" },
    { "first_name": "Bob",   "last_name": "Jones", "nationality": "British"  }
  ]
}

Array length must match the shareholders_count set in Step 1. Safe to re-submit (replaces existing shareholders).


Incorporation Workflow
Step 1 → POST /api/companies
         Creates a draft with name, capital, and shareholder count

Step 2 → POST /api/companies/:id/shareholders/bulk
         Adds shareholders → auto-marks company as "completed"

 Validation Rules

name, shareholders_count, and total_capital are required on create
shareholders_count must be ≥ 1
total_capital must be > 0
Each shareholder requires first_name, last_name, and nationality
Shareholder array length must match shareholders_count
status only accepts "draft" or "completed"


 Error Response Format
json{
  "success": false,
  "message": "Descriptive error message here"
}
CodeMeaning400Validation / Bad Request404Not Found500Internal Server Error

 Scripts
Backend
CommandDescriptionnpm run devStart with nodemon (auto-reload)npm startStart in production mode
Frontend
CommandDescriptionnpm run devStart Next.js dev servernpm run buildBuild for productionnpm startStart production server

 Environment Variables
Backend (backend/.env)
VariableDescriptionDATABASE_URLNeon PostgreSQL connection stringPORTServer port (default: 5000)
Frontend (frontend/.env.local)
VariableDescriptionNEXT_PUBLIC_API_URLBackend API base URL
