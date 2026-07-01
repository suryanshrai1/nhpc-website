# System Architecture

## NHPC Website Management System

Version: 1.0

---

# 1. Overview

The NHPC Website Management System follows a modern three-tier architecture consisting of a presentation layer, application layer, and data layer.

The frontend communicates with the backend through REST APIs. The backend contains the business logic and communicates with the PostgreSQL database using Prisma ORM.

All uploaded files are managed through a centralized Digital Asset Management (DAM) module, allowing assets to be reused across multiple modules.

---

# 2. High-Level Architecture

                    User
                      │
                      ▼
        React + Vite + Tailwind CSS
                      │
                 REST API (Axios)
                      │
                      ▼
              Node.js + Express.js
                      │
        ┌─────────────┼─────────────┐
        │             │             │
        ▼             ▼             ▼
  Controllers     Services     Middleware
                      │
                      ▼
                 Prisma ORM
                      │
                      ▼
               PostgreSQL Database
                      │
                      ▼
         Digital Asset Management (DAM)

---

# 3. Architecture Layers

## Presentation Layer

Responsible for:

- Rendering UI
- User interaction
- Form validation
- API communication

Technology Stack

- React
- Vite
- Tailwind CSS
- React Router
- Axios
- Framer Motion

---

## Application Layer

Responsible for:

- Business Logic
- Authentication
- Validation
- Authorization
- Media Upload
- API Responses

Technology Stack

- Node.js
- Express.js

---

## Data Layer

Responsible for:

- Database Operations
- Relationships
- Transactions
- Query Optimization

Technology Stack

- PostgreSQL
- Prisma ORM

---

# 4. System Modules

The application consists of the following modules.

## Public Website

- Homepage
- About Us
- Projects
- Interactive India Map
- News
- Tenders
- Careers
- Leadership
- Sustainability
- Investor Relations
- Contact

---

## Admin Dashboard

- Dashboard
- Homepage Management
- Project Management
- News Management
- Tender Management
- Career Management
- Leadership Management
- Sustainability Management
- Investor Management
- Digital Asset Management
- Navigation Management
- Contact Message Management
- Profile
- Settings

---

# 5. Request Flow

Example:

User opens Homepage

↓

React sends GET request

↓

GET /api/homepage

↓

Homepage Controller

↓

Homepage Service

↓

Prisma ORM

↓

PostgreSQL

↓

JSON Response

↓

React renders Homepage

---

# 6. Media Upload Flow

Administrator uploads image

↓

Express receives request

↓

Multer validates file

↓

File stored locally

↓

Metadata stored in media_files table

↓

File becomes reusable across the application

---

# 7. Project Data Flow

Administrator creates Project

↓

Project saved

↓

Project Location saved

↓

Project Specifications saved

↓

Gallery Images linked

↓

Documents linked

↓

Project becomes available for Homepage and India Map

---

# 8. Homepage Data Flow

Homepage

↓

Hero

↓

Statistics

↓

Featured Projects

↓

Renewable Energy Portfolio

↓

Interactive India Map

↓

About NHPC

↓

Latest News

↓

CTA

↓

Footer

Homepage only references existing content.

No duplicate project or news data is stored.

---

# 9. Security

The system implements:

- JWT Authentication
- Password Hashing
- Input Validation
- File Validation
- SQL Injection Protection (Prisma ORM)
- XSS Prevention
- CORS Configuration

---

# 10. Design Principles

The system follows the following principles:

- Separation of Concerns
- Single Responsibility Principle
- DRY (Don't Repeat Yourself)
- Database Normalization (3NF)
- Reusable Components
- Modular Architecture
- RESTful API Design
- Centralized Digital Asset Management
- Content Referencing instead of Content Duplication

---

# 11. Scalability

The architecture has been designed to support future enhancements such as:

- Cloud Storage
- Multiple Admin Roles
- Audit Logs
- Advanced Search
- Analytics Dashboard
- Email Notifications
- Mobile Application
- GIS Integration
- Microservice Migration (if required)
