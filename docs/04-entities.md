# Entity Documentation

## NHPC Website Management System

Version: 1.0

---

# Overview

This document defines all business entities used within the NHPC Website Management System.

Each entity represents a real-world object or concept required by the application. The document describes the purpose of each entity, its relationships, ownership, and future extensibility.

---

# 1. Admin

## Purpose

Represents an authenticated administrator responsible for managing website content through the admin dashboard.

## Responsibilities

- Manage website content
- Upload digital assets
- Publish and update content
- Configure homepage
- Manage navigation

## Relationships

Admin creates and updates:

- Projects
- News
- Tenders
- Careers
- Leadership
- Investor Documents
- Homepage Content

---

# 2. Hero

## Purpose

Stores the main banner displayed on the homepage.

## Contains

- Title
- Subtitle
- Background Image
- Background Video

## Relationships

One Hero has many Hero Buttons.

---

# 3. Hero Buttons

## Purpose

Stores call-to-action buttons displayed inside the Hero section.

Examples

- Explore Projects
- Investor Relations
- View Tenders

## Relationships

Belongs to one Hero.

---

# 4. Statistics

## Purpose

Stores numerical highlights displayed on the homepage.

Examples

- Installed Capacity
- Operational Projects
- Years of Excellence

## Relationships

Displayed on Homepage.

---

# 5. Homepage Sections

## Purpose

Controls the visibility and ordering of homepage sections.

## Responsibilities

- Enable/Disable sections
- Change display order

Examples

- Hero
- Statistics
- Featured Projects
- India Map
- About NHPC
- Latest News

---

# 6. Homepage Featured Items

## Purpose

Stores references to existing content displayed on the homepage.

This entity does not store duplicate data.

## Examples

Featured Projects

Latest News

Featured Career

Future announcements

## Relationships

References

- Projects
- News
- Careers

---

# 7. About Us

## Purpose

Stores company information presented on the About page and homepage preview.

## Contains

- Company Overview
- Mission
- Vision
- History
- Values

---

# 8. Projects

## Purpose

Stores all renewable energy projects managed by NHPC.

## Used By

- Homepage
- Projects Page
- India Map
- Search
- Featured Projects

## Relationships

One Project

→ One Project Location

→ Many Specifications

→ Many Gallery Images

→ Many Documents

## Media

- Hero Image
- Gallery
- Supporting Documents

---

# 9. Project Location

## Purpose

Stores geographical information of a project.

## Used By

- Interactive India Map
- Project Detail Page

## Contains

- State
- District
- City
- Latitude
- Longitude

## Relationships

Belongs to one Project.

---

# 10. Project Specifications

## Purpose

Stores structured technical information of a project.

## Examples

- Installed Capacity
- Dam Height
- River
- Turbines
- Type

## Relationships

Belongs to one Project.

---

# 11. Project Gallery

## Purpose

Stores images associated with a project.

## Relationships

Belongs to one Project.

References Digital Asset Management.

---

# 12. Project Documents

## Purpose

Stores downloadable project documents.

Examples

- DPR
- Reports
- Technical Documents

## Relationships

Belongs to one Project.

References Digital Asset Management.

---

# 13. News

## Purpose

Stores news articles and press releases.

## Used By

- Homepage
- News Listing
- News Detail Page

## Relationships

Belongs to one News Category.

Can be featured on Homepage.

---

# 14. News Categories

## Purpose

Categorizes news articles.

Examples

- Press Release
- Announcement
- Events

---

# 15. Tenders

## Purpose

Stores tender information published by NHPC.

## Used By

- Tender Listing
- Tender Details

## Relationships

One Tender

→ Many Tender Documents

---

# 16. Tender Documents

## Purpose

Stores downloadable tender documents.

Examples

- NIT
- Corrigendum
- BOQ

References Digital Asset Management.

---

# 17. Careers

## Purpose

Stores job openings.

## Used By

- Career Listing
- Career Detail Page

## Relationships

One Career

→ Many Applications

---

# 18. Career Applications

## Purpose

Stores applications submitted by candidates.

---

# 19. Leadership

## Purpose

Stores leadership profiles.

Examples

- Chairman
- Directors
- Executives

References Digital Asset Management.

---

# 20. Sustainability

## Purpose

Stores sustainability initiatives and CSR activities.

---

# 21. Investor Documents

## Purpose

Stores investor-related documents.

Examples

- Annual Reports
- Financial Statements
- Shareholding Pattern

References Digital Asset Management.

---

# 22. Investor Categories

## Purpose

Categorizes investor documents.

Examples

- Annual Report
- Quarterly Results
- Presentation

---

# 23. Contact Information

## Purpose

Stores official contact information.

Examples

- Address
- Phone
- Email

---

# 24. Contact Messages

## Purpose

Stores enquiries submitted through the website.

---

# 25. Navigation Menus

## Purpose

Represents website navigation groups.

Examples

- Header
- Footer

---

# 26. Navigation Items

## Purpose

Stores individual navigation links.

Belongs to one Navigation Menu.

---

# 27. Media Folders

## Purpose

Organizes uploaded digital assets into logical folders.

Examples

- Homepage
- Projects
- News
- Tenders
- Careers

---

# 28. Media Files (Digital Asset Management)

## Purpose

Stores metadata of all uploaded digital assets.

Supported Assets

- Images
- Videos
- PDFs
- Documents

## Used By

- Hero
- About
- Projects
- Gallery
- News
- Leadership
- Investor Documents
- Tender Documents

Digital assets are uploaded once and reused throughout the application.

---