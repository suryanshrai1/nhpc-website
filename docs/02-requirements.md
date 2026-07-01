# Software Requirements Specification (SRS)

## NHPC Website Management System

Version: 1.0

---

# 1. Introduction

## 1.1 Purpose

The NHPC Website Management System is a custom-built Content Management System (CMS) designed to modernize NHPC's digital presence.

The system will allow administrators to manage all website content through an intuitive dashboard while providing visitors with a responsive, informative, and interactive corporate website.

This document defines the functional and non-functional requirements that the application must satisfy.

---

# 2. System Users

## Administrator

The system currently supports a single user role.

### Responsibilities

- Manage Homepage
- Manage About Us
- Manage Projects
- Manage Project Locations
- Manage News
- Manage Tenders
- Manage Careers
- Manage Leadership
- Manage Sustainability
- Manage Investor Documents
- Manage Navigation
- Manage Media Library
- Manage Contact Information
- View Contact Messages

---

# 3. Functional Modules

The system consists of the following modules.

## Public Website

- Home
- About Us
- Projects
- Project Details
- Interactive India Project Map
- News
- Tenders
- Careers
- Leadership
- Sustainability
- Investor Relations
- Contact Us

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
- Investor Document Management
- Navigation Management
- Media Library
- Contact Message Management
- Profile
- Settings

---

# 4. Homepage Sections

The homepage consists of dynamic sections that can be reordered or hidden by the administrator.

- Hero
- Statistics
- Featured Projects
- Renewable Energy Portfolio
- Interactive India Map
- About NHPC
- Latest News
- Call To Action
- Footer

---

# 5. Functional Requirements

## Homepage

Administrator should be able to:

- Update Hero section
- Upload Hero image/video
- Manage Hero buttons
- Update statistics
- Select featured projects
- Select latest news
- Enable/Disable homepage sections
- Reorder homepage sections

---

## About Us

Administrator should be able to:

- Update company overview
- Update mission
- Update vision
- Update company history
- Upload images
- Upload videos

---

## Projects

Administrator should be able to:

- Add project
- Edit project
- Delete project
- Upload project images
- Upload project documents
- Manage gallery
- Manage technical specifications
- Update project location
- Mark project as featured

---

## Interactive India Map

Administrator should be able to:

- Add project location
- Edit coordinates
- Enable/Disable marker
- Link marker to project

---

## News

Administrator should be able to:

- Publish news
- Edit news
- Delete news
- Schedule publication
- Archive news

---

## Tenders

Administrator should be able to:

- Create tender
- Edit tender
- Delete tender
- Upload tender documents
- Upload corrigendum documents
- Archive tenders

---

## Careers

Administrator should be able to:

- Create job opening
- Edit job opening
- Delete job opening
- Set application deadline

---

## Leadership

Administrator should be able to:

- Add leadership profile
- Edit profile
- Delete profile
- Upload photographs

---

## Sustainability

Administrator should be able to:

- Publish sustainability initiatives
- Upload reports
- Upload media

---

## Investor Relations

Administrator should be able to:

- Upload annual reports
- Upload financial reports
- Upload presentations
- Archive documents

---

## Contact

Administrator should be able to:

- Update contact details
- View contact enquiries
- Archive enquiries

---

## Media Library

Administrator should be able to:

- Upload media
- Delete media
- Organize media into folders
- Search media
- Reuse media across modules

---

## Navigation

Administrator should be able to:

- Manage header navigation
- Manage footer navigation
- Reorder menu items

---

# 6. Non-Functional Requirements

The system shall provide:

- Responsive design
- Mobile compatibility
- Secure authentication
- RESTful APIs
- Database normalization
- Modular architecture
- Optimized media handling
- Fast page loading
- SEO-friendly URLs
- Scalable backend architecture
- Error logging
- Data validation
- Soft deletion where applicable

---

# 7. Business Rules

- Every project must have one location.
- Every project location belongs to exactly one project.
- Homepage displays references to existing content rather than duplicate data.
- Featured Projects must reference existing projects.
- Latest News must reference existing news articles.
- All uploaded files must be managed through the centralized Media Library.
- Media assets should be reusable across different modules.
- Project URLs are generated using unique slugs.
- Homepage sections can be enabled, disabled, and reordered.
- Only authenticated administrators can access the admin dashboard.

---

# 8. Future Enhancements

- Multiple admin roles
- Role-Based Access Control (RBAC)
- Multi-language support
- Email notifications
- Audit logs
- Cloud media storage
- Advanced search
- GIS integration
- Analytics dashboard
- Mobile application
