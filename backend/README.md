# Hardskello Backend API

## Setup Instructions

### 1. Install PostgreSQL
Make sure PostgreSQL is installed and running on your system.

### 2. Create Database
Open PostgreSQL command prompt (psql) or use pgAdmin and run:
```sql
CREATE DATABASE hardskello_db;
```

### 3. Configure Environment
Update the `.env` file with your PostgreSQL credentials:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=hardskello_db
DB_USER=postgres
DB_PASSWORD=your_password_here
```

### 4. Install Dependencies
```bash
cd backend
npm install
```

### 5. Run Migrations
```bash
npm run build
npm run migrate
```

### 6. Seed Database (Optional)
```bash
npm run seed
```

### 7. Start Development Server
```bash
npm run dev
```

The server will run on http://localhost:5000

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login user
- `POST /api/auth/register` - Register new user
- `GET /api/auth/verify` - Verify token

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Companies
- `GET /api/companies` - Get all companies
- `GET /api/companies/:id` - Get company by ID
- `POST /api/companies` - Create new company
- `PUT /api/companies/:id` - Update company
- `DELETE /api/companies/:id` - Delete company
- `GET /api/companies/search/:term` - Search companies

### Candidates
- `GET /api/candidates` - Get all candidates
- `GET /api/candidates/:id` - Get candidate by ID
- `POST /api/candidates` - Create new candidate
- `PUT /api/candidates/:id` - Update candidate
- `DELETE /api/candidates/:id` - Delete candidate
- `GET /api/candidates/search/:term` - Search candidates
- `GET /api/candidates/status/:status` - Get candidates by status

### Other
- `GET /api/stats` - Get database statistics
- `GET /api/activities` - Get recent activities
- `GET /health` - Health check

## Database Schema

### Tables Created:
- `users` - System users (admins, HR managers, recruiters)
- `companies` - Client companies
- `candidates` - Job candidates
- `jobs` - Job postings
- `applications` - Job applications
- `activity_logs` - System activity tracking

## Default Admin Login
- Email: admin@hardskello.com
- Password: admin123

## DBeaver Connection
To connect with DBeaver:
1. Create new PostgreSQL connection
2. Host: localhost
3. Port: 5432
4. Database: hardskello_db
5. Username: postgres
6. Password: (your PostgreSQL password)