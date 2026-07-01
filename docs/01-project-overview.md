# NHPC Website Management System

## Project Overview

The NHPC Website Management System is a modern enterprise-grade Content Management System (CMS) and corporate website designed for NHPC Limited.

The objective of the project is to replace the existing static and outdated website with a scalable, maintainable, and user-friendly platform that enables administrators to manage website content dynamically through a custom-built admin dashboard.

Unlike traditional CMS platforms, this system is being developed from scratch using a modern full-stack architecture, providing complete flexibility over the database, backend, APIs, and frontend.

The website will support dynamic management of projects, news, tenders, careers, leadership, sustainability initiatives, investor information, homepage content, and media assets while maintaining high performance, accessibility, and scalability.

---

# Objectives

- Modernize the NHPC digital experience.
- Build a fully dynamic website powered by a custom CMS.
- Provide an intuitive admin dashboard for content management.
- Improve scalability and maintainability.
- Follow modern software engineering principles and clean architecture.
- Deliver a responsive and accessible user experience.

---

# Key Features

## Public Website

- Dynamic Homepage
- About NHPC
- Renewable Energy Projects
- Interactive India Project Map
- News & Press Releases
- Tenders
- Careers
- Leadership
- Sustainability
- Investor Relations
- Contact Us

## Admin Dashboard

- Homepage Management
- Project Management
- News Management
- Tender Management
- Career Management
- Leadership Management
- Investor Document Management
- Media Library
- Navigation Management
- Contact Message Management

---

# Technology Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- React Router
- Axios
- Framer Motion

## Backend

- Node.js
- Express.js
- Prisma ORM

## Database

- PostgreSQL

## Authentication

- JWT Authentication

## File Storage (Development)

- Local Storage using Multer

## Future Production Storage

- Cloudinary / AWS S3 (Optional)

---

# System Architecture

Frontend (React)
↓
REST API (Express)
↓
Service Layer
↓
Prisma ORM
↓
PostgreSQL Database

Uploaded files are managed through a centralized Media Library and referenced by different modules instead of storing duplicate file paths.

---

# Project Goals

- Modular Architecture
- Clean Code
- Scalable Database Design
- Reusable Components
- Enterprise-grade Folder Structure
- RESTful APIs
- Future-ready Design

---

# Future Scope

- Multi-language Support
- Role-Based Access Control
- Email Notifications
- Analytics Dashboard
- Audit Logs
- Cloud File Storage
- Advanced Search
- GIS Integration
- Mobile Application