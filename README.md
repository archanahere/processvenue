# Portfolio Management App (Next.js + MySQL)

A full-stack portfolio management application built with Next.js (App Router), MySQL, and TailwindCSS.
This app allows you to manage Profiles, Projects, and Work Experience with CRUD operations.

📂 Project Structure
```bash
src/
 ├── app/
 │   ├── api/
 │   │   ├── profiles/          # Profiles API
 │   │   │   ├── route.js
 │   │   │   └── [id]/route.js
 │   │   ├── projects/          # Projects API
 │   │   │   ├── route.js
 │   │   │   └── [id]/route.js
 │   │   ├── work/              # Work Experience API
 │   │   │   ├── route.js
 │   │   │   └── [id]/route.js
 │   ├── profiles/              # Frontend page for Profiles
 │   ├── projects/              # Frontend page for Projects
 │   ├── work/                  # Frontend page for Work Experience
 │   └── page.js                # Home page
 ├── lib/
 │   └── db.js                  # MySQL connection
 └── components/                # Reusable components (forms, tables, etc.)
```
### Database Schema
Profiles Table
CREATE TABLE profiles (
  profile_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(20)
);

Projects Table
CREATE TABLE projects (
  p_id INT AUTO_INCREMENT PRIMARY KEY,
  pname VARCHAR(255),
  description TEXT,
  profileid INT,
  links VARCHAR(255),
  FOREIGN KEY (profileid) REFERENCES profiles(profile_id) ON DELETE CASCADE
);

Work Table
CREATE TABLE work (
  w_id INT AUTO_INCREMENT PRIMARY KEY,
  company VARCHAR(255),
  role VARCHAR(255),
  work_experience VARCHAR(255),
  profile_id INT,
  FOREIGN KEY (profile_id) REFERENCES profiles(profile_id) ON DELETE CASCADE
);

### API Endpoints
Profiles

GET /api/profiles → List all profiles

POST /api/profiles → Create profile

GET /api/profiles/:id → Get profile by ID

PUT /api/profiles/:id → Update profile

DELETE /api/profiles/:id → Delete profile

Projects

GET /api/projects → List all projects

POST /api/projects → Create project

GET /api/projects/:id → Get project by ID

PUT /api/projects/:id → Update project

DELETE /api/projects/:id → Delete project

Work Experience

GET /api/work → List all work experiences

POST /api/work → Create work experience

GET /api/work/:id → Get work by ID

PUT /api/work/:id → Update work

DELETE /api/work/:id → Delete work

### Frontend Pages

/profiles → Manage profiles (form + table)

/projects → Manage projects (form + table)

/work → Manage work experiences (form + table)

## Setup & Installation
Clone the repo
```bash

git clone https://github.com/your-username/portfolio-app.git
cd portfolio-app
```

Install dependencies
```bash
npm install
```

Configure database connection
Update src/lib/db.js:
```bash
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "your_password",
  database: "portfolio_db",
});

export default pool;
```

### Run the development server
```bash
npm run dev
```

Open in browser → http://localhost:3000
