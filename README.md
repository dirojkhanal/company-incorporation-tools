# Project Name

## Description
A brief description of your project.

## Table of Contents
 [Installation](#installation)
 [Usage](#usage)
 [Contributing](#contributing)
 [License](#license)

## Installation
1. Clone the repository.
2. Install the dependencies using `npm install`.

## Usage
Provide examples of how to use your project.
Include code snippets if necessary.

## Contributing
Contributions are welcome! Please follow the guidelines in [CONTRIBUTING.md](CONTRIBUTING.md).


# Company Incorporation App

A full-stack web application for managing company incorporation workflows, built with Next.js, Node.js, Express, and PostgreSQL.

## Features

- **Guided Workflow**: A multi-step process for incorporating a new company.
- **Company & Shareholder Management**: Create and manage company details and shareholder information.
- **Admin Dashboard**: View and manage all incorporated companies.
- **Bulk Operations**: Add multiple shareholders at once.

##  Tech Stack

| Layer      | Technology                               |
| ---------- | ---------------------------------------- |
| **Frontend** | [Next.js](https://nextjs.org/) (App Router) + [TypeScript](https://www.typescriptlang.org/) |
| **Styling**  | [Tailwind CSS](https://tailwindcss.com/)     |
| **Backend**  | [Node.js](https://nodejs.org/) + [Express v5](https://expressjs.com/)     |
| **Database** | [PostgreSQL](https://www.postgresql.org/) ([Neon](https://neon.tech/))         |
| **DB Client**| [node-postgres (pg)](https://node-postgres.com/) |
| **IDs**      | UUID v4                                  |
| **Config**   | [dotenv](https://www.npmjs.com/package/dotenv)     |

##  Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en) v18+
- A [Neon](https://neon.tech/) PostgreSQL database

### Database Setup

Run the following SQL in your Neon dashboard to set up the required tables:

```sql
CREATE TABLE companies (
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
```

###  Backend Setup

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file and add your database connection string:
    ```env
    DATABASE_URL=your_neon_postgres_connection_string
    PORT=5000
    ```
4.  Start the backend server:
    ```bash
    # Development
    npm run dev
    ```
    The backend will be running at `http://localhost:5000`.

###  Frontend Setup

1.  Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env.local` file and add the backend API URL:
    ```env
    NEXT_PUBLIC_API_URL=http://localhost:5000/api
    ```
4.  Start the frontend development server:
    ```bash
    npm run dev
    ```
    The frontend will be running at `http://localhost:3000`.

##  API Endpoints

### Health Check

-   `GET /`: Checks the status of the API.

### Companies

| Method  | Endpoint            | Description                  |
| ------- | ------------------- | ---------------------------- |
| `POST`  | `/api/companies`      | Create a new company (Step 1)  |
| `GET`   | `/api/companies`      | Get all companies            |
| `GET`   | `/api/companies/:id`  | Get a single company         |
| `PATCH` | `/api/companies/:id`  | Update a company's status etc.|

### Shareholders

| Method | Endpoint                                  | Description           |
| ------ | ----------------------------------------- | --------------------- |
| `POST` | `/api/companies/:company_id/shareholders/bulk` | Add shareholders in bulk |

For detailed request/response examples and validation rules, please refer to the project's API documentation or the initial project overview.

##  Environment Variables

### Backend (`backend/.env`)

-   `DATABASE_URL`: Your Neon PostgreSQL connection string.
-   `PORT`: The port for the backend server (defaults to `5000`).

### Frontend (`frontend/.env.local`)

-   `NEXT_PUBLIC_API_URL`: The base URL for the backend API.

##  Scripts

### Backend

| Command     | Description                  |
| ----------- | ---------------------------- |
| `npm run dev` | Start the server with `nodemon` |
| `npm start`   | Start the production server  |

### Frontend

| Command     | Description                      |
| ----------- | -------------------------------- |
| `npm run dev` | Start the Next.js dev server     |
| `npm run build` | Build the app for production     |
| `npm start`   | Start the production server      |

##  Contributing
demo 
<img width="1883" height="903" alt="{172D504E-73E6-4544-94D9-E66D0942C715}" src="https://github.com/user-attachments/assets/deb941bf-4a30-45fb-b8a0-26cad04c068f" />
<img width="468" height="667" alt="{E1E14FB3-EFE9-46BA-9C53-5124B98652FE}" src="https://github.com/user-attachments/assets/57fd5309-7ec6-4f2e-8c73-6a81ef89f970" />
<img width="563" height="772" alt="{E1933F5E-D141-48FB-879F-40A1F466093D}" src="https://github.com/user-attachments/assets/378d2b8b-5828-4c21-bc6f-188590c50ef8" />
<img width="1918" height="900" alt="{0F1295B9-29BF-4D3C-9038-39E38768BEDF}" src="https://github.com/user-attachments/assets/f7e19279-1e29-47f9-8298-6cef6da96a45" />





