# NHPC Enterprise Website & Content Management System (CMS)

A modern, scalable, and enterprise-grade **Website and Content Management System (CMS)** built for **NHPC Limited**. The platform consists of a responsive public website and a secure administrative portal that enables authorized users to manage website content dynamically without modifying source code.

---

## 📌 Overview

The project provides a centralized content management solution for managing various sections of the NHPC website, including:

- Homepage
- About NHPC
- Projects
- Power Stations
- Tenders
- Careers
- Investor Relations
- Media Library
- Contact Messages
- Dashboard & Analytics

The system follows a modular architecture with a React frontend, Express backend, PostgreSQL database, and Prisma ORM.

---

## ✨ Features

### 🌐 Public Website

- Responsive modern UI
- Homepage with Hero Carousel
- About NHPC
- Projects
- Power Stations
- Tenders
- Careers
- Investor Relations
- Media Gallery
- Contact Us
- Search & Filtering
- Dynamic content rendering

---

### 🔐 Admin CMS

- Secure JWT Authentication
- Dashboard with real-time statistics
- Homepage CMS
- About CMS
- Projects CMS
- Power Stations CMS
- Careers CMS
- Investors CMS
- Tenders CMS
- Media Library (DAM)
- Contact Message Management
- CRUD Operations
- Rich Media Selection
- SEO Fields
- Publishing Controls

---

### 🖼 Digital Asset Management (DAM)

- Image Uploads
- Video Uploads
- PDF Uploads
- Media Preview
- Centralized Media Library
- Media Reuse Across Modules
- Metadata Management

---

### 📊 Dashboard

- Real-time statistics
- Recent activity
- Module-wise counts
- Contact message summary
- Careers summary
- Investor document summary
- Power station summary
- Project summary

---

## 🏗 System Architecture

```
                     Users
                       │
         ┌─────────────┴─────────────┐
         │                           │
         ▼                           ▼
 Public Website                 Admin CMS
    (React)                      (React)
         │                           │
         └─────────────┬─────────────┘
                       │
                 REST API Layer
                       │
              Node.js + Express
                       │
         ┌─────────────┼─────────────┐
         │             │             │
         ▼             ▼             ▼
 Authentication   Business Logic   Media Service
                       │
                  Prisma ORM
                       │
                 PostgreSQL
```

---

## 🛠 Tech Stack

### Frontend

- React.js
- Vite
- Tailwind CSS
- Framer Motion
- React Router
- Axios

### Backend

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Multer
- Zod Validation

### Database

- PostgreSQL

### Development Tools

- VS Code
- Git
- GitHub
- Postman
- Prisma Studio

---

## 📂 Project Structure

```
NHPC/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── layouts/
│   │   ├── utils/
│   │   └── assets/
│   └── package.json
│
├── backend/
│   ├── prisma/
│   ├── src/
│   │   ├── config/
│   │   ├── middlewares/
│   │   ├── modules/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── repositories/
│   │   ├── validators/
│   │   └── utils/
│   └── package.json
│
└── README.md
```

---

## 📦 Core Modules

### Public Website

- Homepage
- About NHPC
- Projects
- Power Stations
- Careers
- Tenders
- Investors
- Media Gallery
- Contact Us

### Admin CMS

- Authentication
- Dashboard
- Homepage Editor
- About Editor
- Projects Management
- Power Stations Management
- Careers Management
- Tenders Management
- Investor Relations
- Media Management
- Contact Message Inbox

---

## 🗄 Database Highlights

The application uses a normalized PostgreSQL database.

Major entities include:

- Users
- Homepage Sections
- Homepage Content
- Hero Buttons
- Projects
- Project Details
- Power Stations
- Careers
- Tenders
- Investors
- Media Files
- Contact Messages

Media assets are managed centrally through a reusable Digital Asset Management system.

---

## 🔒 Authentication

The Admin CMS is secured using JSON Web Tokens (JWT).

Features include:

- Login Authentication
- Protected Routes
- Token Validation
- Authorization Middleware
- Secure API Access

---

## 📸 Media Management

The CMS includes a centralized media library supporting:

- Images
- Videos
- PDF Documents

Media can be reused across:

- Homepage
- Projects
- Careers
- Investors
- Tenders
- Power Stations

without duplicate uploads.

---

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/suryanshrai1/nhpc-website.git

cd nhpc-website
```

---

### Backend Setup

```bash
cd backend

npm install
```

Create `.env`

```env
PORT=5000

DATABASE_URL=postgresql://username:password@localhost:5432/database_name

JWT_SECRET=your_secret

JWT_REFRESH_SECRET=your_refresh_secret
```

Run Prisma

```bash
npx prisma generate

npx prisma migrate dev
```

Start backend

```bash
npm run dev
```

---

### Frontend Setup

```bash
cd frontend

npm install
```

Create `.env`

```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

Start frontend

```bash
npm run dev
```

---

## 📡 API Overview

### Authentication

```
POST /api/v1/auth/login
POST /api/v1/auth/logout
POST /api/v1/auth/refresh-token
```

### Homepage

```
GET /api/v1/homepage
PUT /api/v1/admin/homepage/hero
```

### Projects

```
GET /api/v1/projects
GET /api/v1/projects/:slug

GET /api/v1/admin/projects
POST /api/v1/admin/projects
PUT /api/v1/admin/projects/:id
DELETE /api/v1/admin/projects/:id
```

### Power Stations

```
GET /api/v1/power-stations

GET /api/v1/admin/stations
POST /api/v1/admin/stations
PUT /api/v1/admin/stations/:id
DELETE /api/v1/admin/stations/:id
```

### Careers

```
GET /api/v1/careers

GET /api/v1/admin/careers
POST /api/v1/admin/careers
PUT /api/v1/admin/careers/:id
```

### Investors

```
GET /api/v1/investors

GET /api/v1/admin/investors
POST /api/v1/admin/investors
PUT /api/v1/admin/investors/:id
```

### Tenders

```
GET /api/v1/tenders

GET /api/v1/admin/tenders
POST /api/v1/admin/tenders
PUT /api/v1/admin/tenders/:id
```

### Media

```
GET /api/v1/media

POST /api/v1/admin/media

DELETE /api/v1/admin/media/:id
```

---

## 🔮 Future Enhancements

- Role-Based Access Control (RBAC)
- Audit Logs
- Content Approval Workflow
- Version History
- Cloud Storage Integration
- AI-powered Search
- Analytics Dashboard
- Email Notifications
- Multi-language Support
- CI/CD Deployment Pipeline

---

## 👨‍💻 Author

**Suryansh Rai**

- GitHub: https://github.com/suryanshrai1
- LinkedIn: https://linkedin.com/in/suryanshrai1

---

## 📄 License

This project was developed as part of an internship project. Usage and distribution are subject to the organization's policies and applicable licensing terms.