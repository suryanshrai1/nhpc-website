# NHPC Website Database

This directory contains the PostgreSQL database schema and supporting SQL scripts for the **NHPC Website CMS**.

---

# Database Information

| Property | Value |
|----------|-------|
| Database Name | `nhpc_website_db` |
| Database | PostgreSQL 18+ |
| Character Encoding | UTF-8 |
| Architecture | Normalized Relational Database |
| ORM | Prisma |
| Backend | Node.js + Express.js |

---

# Folder Structure

```text
database/
│
├── README.md
│
└── sql/
    │
    ├── 00_database_infrastructure.sql
    ├── 01_lookup_tables.sql
    ├── 02_core_system.sql
    ├── 03_homepage.sql
    ├── 04_operational_power_stations.sql
    ├── 05_projects.sql
    ├── 06_news.sql
    ├── 07_tenders.sql
    ├── 08_careers.sql
    ├── 09_investors.sql
    ├── 10_contact.sql
    ├── 11_leadership.sql
    ├── 12_sustainability.sql
    ├── 13_master_data.sql
    └── 14_views.sql
```

---

# Execution Order

Run the SQL files in the following order:

1. `00_database_infrastructure.sql`
2. `01_lookup_tables.sql`
3. `02_core_system.sql`
4. `03_homepage.sql`
5. `04_operational_power_stations.sql`
6. `05_projects.sql`
7. `06_news.sql`
8. `07_tenders.sql`
9. `08_careers.sql`
10. `09_investors.sql`
11. `10_contact.sql`
12. `11_leadership.sql`
13. `12_sustainability.sql`
14. `13_master_data.sql`
15. `14_views.sql`

---

# Naming Conventions

## Tables

- snake_case
- plural table names where appropriate

Examples

```
projects
media_files
job_openings
```

---

## Columns

- snake_case
- descriptive names

Examples

```
created_at
updated_at
display_order
is_active
```

---

## Constraints

| Prefix | Meaning |
|---------|----------|
| `pk_` | Primary Key |
| `fk_` | Foreign Key |
| `uq_` | Unique Constraint |
| `chk_` | Check Constraint |

---

## Indexes

```
idx_table_column
```

Example

```
idx_projects_slug
```

---

## Triggers

```
trg_table_updated_at
```

Example

```
trg_projects_updated_at
```

---

## Functions

```
fn_function_name
```

Example

```
fn_update_updated_at()
```

---

# Database Features

- Fully normalized schema
- Shared media management system
- Dynamic homepage configuration
- Flexible technical specifications
- Dynamic navigation menu
- Lookup/reference tables
- Automatic `updated_at` timestamps
- Soft activation using `is_active`
- Ordered content using `display_order`
- SEO-friendly slugs
- Media reuse across all modules

---

# Business Modules

- Homepage
- Navigation
- Operational Power Stations
- Projects
- News
- Tenders
- Careers
- Investors
- Leadership
- Sustainability
- Contact

---

# Lookup Modules

- States
- Project Types
- Project Statuses
- Capacity Units
- News Categories
- Tender Categories
- Tender Statuses
- Employment Types
- Application Statuses
- Leadership Levels
- Sustainability Types
- Investor Document Types
- Financial Years
- Office Types
- Message Statuses

---

# Notes

- All timestamps use UTC.
- All uploaded files are managed through the centralized `media_files` table.
- Images and documents are linked using `media_file_links`.
- The homepage stores configuration only and references business data from other modules.
- Business entities remain independent and reusable across the application.

---
