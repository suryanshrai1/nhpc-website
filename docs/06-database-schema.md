# Database Schema Specification

## NHPC Website Management System

Version: 1.0

---

# Module 1 – Core System

This module provides the foundation for the entire application.

It consists of:

- Authentication
- Digital Asset Management (DAM)
- Generic Media Linking

All other modules depend on these tables.

---

# Table: admins

## Purpose

Stores administrator accounts responsible for managing the website content.

---

## Columns

| Column | Data Type | Constraints | Description |
|----------|-----------|-------------|-------------|
| id | BIGSERIAL | Primary Key | Unique administrator identifier |
| full_name | VARCHAR(150) | NOT NULL | Administrator full name |
| email | VARCHAR(255) | UNIQUE, NOT NULL | Login email address |
| password_hash | TEXT | NOT NULL | Hashed password |
| last_login | TIMESTAMP | NULL | Last successful login |
| is_active | BOOLEAN | DEFAULT TRUE | Account status |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record creation time |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Last update time |

---

## Indexes

- Primary Key (id)
- Unique Index (email)

---

## Business Rules

- Email address must be unique.
- Passwords are stored only as secure hashes.
- Only active administrators may authenticate.

---

# Table: media_folders

## Purpose

Organizes digital assets into folders.

Supports nested folder structures.

---

## Columns

| Column | Data Type | Constraints | Description |
|----------|-----------|-------------|-------------|
| id | BIGSERIAL | Primary Key | Folder identifier |
| parent_folder_id | BIGINT | Foreign Key, NULL | Parent folder |
| name | VARCHAR(150) | NOT NULL | Folder name |
| slug | VARCHAR(150) | UNIQUE | URL-friendly identifier |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Created timestamp |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Updated timestamp |

---

## Relationships

- One folder may contain multiple child folders.
- One folder may contain multiple media files.

---

## Indexes

- Primary Key (id)
- Index (parent_folder_id)
- Unique Index (slug)

---

## Business Rules

- Root folders have NULL parent_folder_id.
- Folder names should be unique within the same parent folder.

---

# Table: media_files

## Purpose

Stores metadata for every uploaded digital asset.

Actual files are stored in the filesystem during development and can later be migrated to cloud storage without changing the database schema.

---

## Columns

| Column | Data Type | Constraints | Description |
|----------|-----------|-------------|-------------|
| id | BIGSERIAL | Primary Key | Media identifier |
| folder_id | BIGINT | Foreign Key | Parent folder |
| file_name | VARCHAR(255) | NOT NULL | Stored filename |
| original_name | VARCHAR(255) | NOT NULL | Original uploaded filename |
| mime_type | VARCHAR(100) | NOT NULL | MIME type |
| extension | VARCHAR(20) | NOT NULL | File extension |
| file_size | BIGINT | NOT NULL | File size in bytes |
| storage_path | TEXT | NOT NULL | Relative storage path |
| alt_text | VARCHAR(255) | NULL | Accessibility description |
| uploaded_by | BIGINT | Foreign Key | Administrator who uploaded the file |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Upload timestamp |

---

## Relationships

- One folder contains many media files.
- One administrator uploads many media files.

---

## Indexes

- Primary Key (id)
- Index (folder_id)
- Index (uploaded_by)
- Index (mime_type)

---

## Business Rules

- Every media file belongs to exactly one folder.
- Media assets may be reused across multiple modules.
- A media file cannot be permanently deleted while it is still referenced.

---

# Table: media_file_links

## Purpose

Creates a generic relationship between uploaded media assets and business entities.

This enables a single uploaded file to be reused across multiple parts of the application without duplication.

---

## Columns

| Column | Data Type | Constraints | Description |
|----------|-----------|-------------|-------------|
| id | BIGSERIAL | Primary Key | Link identifier |
| media_file_id | BIGINT | Foreign Key | Referenced media asset |
| entity_type | VARCHAR(50) | NOT NULL | Referenced entity (project, news, hero, about_us, leadership, tender, etc.) |
| entity_id | BIGINT | NOT NULL | Primary key of the referenced record |
| purpose | VARCHAR(50) | NOT NULL | Purpose of the media (hero, gallery, attachment, profile, thumbnail, video, etc.) |
| display_order | INTEGER | DEFAULT 1 | Display order for multiple assets |

---

## Example Records

| Media | Entity Type | Entity ID | Purpose |
|---------|------------|----------:|----------|
| hero.jpg | project | 8 | hero |
| gallery1.jpg | project | 8 | gallery |
| chairman.jpg | leadership | 2 | profile |
| annual-report.pdf | investor_document | 5 | attachment |
| nit.pdf | tender | 9 | attachment |

---

## Relationships

- One media file may be linked to many entities.
- One entity may reference many media files.

---

## Indexes

- Primary Key (id)
- Index (media_file_id)
- Composite Index (entity_type, entity_id)
- Index (purpose)

---

## Business Rules

- A single media file may be reused across multiple entities.
- Hero images should be unique per entity (enforced at the application level).
- Gallery images are ordered using display_order.
- Supported purpose values are controlled by the application.

---

# Core Module Summary

| Table | Responsibility |
|---------|----------------|
| admins | Authentication and content ownership |
| media_folders | Folder hierarchy |
| media_files | Digital asset metadata |
| media_file_links | Generic media association |

---

# Design Decisions

### Authentication

- Single administrator role (Version 1)
- Passwords stored using secure hashing
- JWT-based authentication

### Digital Asset Management

- Files uploaded once and reused across the application.
- Metadata stored separately from physical files.
- Supports future migration to cloud storage.

### Media Relationships

- Generic polymorphic association using entity_type and entity_id.
- Eliminates duplicate gallery/document tables.
- Supports images, videos, PDFs, icons, and other assets through a single reusable mechanism.

### Naming Conventions

- Tables use plural snake_case.
- Columns use snake_case.
- Foreign keys follow the *_id convention.
- Boolean fields use the is_* prefix.
- Timestamps use UTC.

---

# Future Compatibility

The schema is designed to support future enhancements without structural changes, including:

- Cloud storage providers
- Role-Based Access Control (RBAC)
- Audit logging
- Asset versioning
- Additional content modules
- Multi-language content

# Module 2 – Homepage

The Homepage module controls the dynamic composition of the public homepage.

Unlike traditional CMS designs, the homepage does not duplicate business data. Instead, it references existing content from other modules such as Projects, News, About Us, and Sustainability.

This approach minimizes redundancy while allowing administrators to rearrange homepage content without modifying the database schema.

---

# Table: hero

## Purpose

Stores the textual content displayed in the Hero section.

Media assets such as background images and videos are managed through the Digital Asset Management (DAM) module using the `media_file_links` table.

---

## Columns

| Column | Data Type | Constraints | Description |
|----------|-----------|-------------|-------------|
| id | BIGSERIAL | Primary Key | Hero identifier |
| title | VARCHAR(255) | NOT NULL | Main heading |
| subtitle | TEXT | NULL | Supporting text |
| created_by | BIGINT | Foreign Key | Administrator who created the record |
| updated_by | BIGINT | Foreign Key | Administrator who last updated the record |
| is_active | BOOLEAN | DEFAULT TRUE | Active status |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Last update timestamp |

---

## Relationships

- One Hero has many Hero Buttons.
- Hero media assets are linked through `media_file_links`.

---

## Business Rules

- Only one Hero record should be active.
- Background images and videos are stored in the Digital Asset Management module.
- Multiple media assets may be linked for desktop, mobile, or future use.

---

# Table: hero_buttons

## Purpose

Stores call-to-action buttons displayed in the Hero section.

---

## Columns

| Column | Data Type | Constraints | Description |
|----------|-----------|-------------|-------------|
| id | BIGSERIAL | Primary Key | Button identifier |
| hero_id | BIGINT | Foreign Key | Parent Hero |
| label | VARCHAR(100) | NOT NULL | Button text |
| url | VARCHAR(255) | NOT NULL | Destination URL |
| variant | VARCHAR(30) | NOT NULL | Primary, Secondary, Outline |
| target | VARCHAR(20) | DEFAULT '_self' | Link target |
| display_order | INTEGER | DEFAULT 1 | Display sequence |
| is_active | BOOLEAN | DEFAULT TRUE | Active status |

---

## Relationships

- Many buttons belong to one Hero.

---

## Business Rules

- Buttons are displayed according to `display_order`.
- Valid targets include `_self` and `_blank`.
- Variant values are controlled by the application.

---

# Table: statistics

## Purpose

Stores homepage statistics displayed beneath the Hero section.

---

## Columns

| Column | Data Type | Constraints | Description |
|----------|-----------|-------------|-------------|
| id | BIGSERIAL | Primary Key | Statistic identifier |
| title | VARCHAR(150) | NOT NULL | Statistic title |
| value | NUMERIC(12,2) | NOT NULL | Numeric value |
| suffix | VARCHAR(30) | NULL | MW, %, +, etc. |
| icon | VARCHAR(100) | NULL | Optional icon identifier |
| display_order | INTEGER | DEFAULT 1 | Display order |
| is_active | BOOLEAN | DEFAULT TRUE | Active status |

---

## Business Rules

- Only numeric values are stored.
- Units and symbols are stored separately in `suffix`.
- Statistics appear in ascending `display_order`.

---

# Table: homepage_sections

## Purpose

Controls the visibility and ordering of homepage sections.

This table contains configuration only and does not store business content.

---

## Columns

| Column | Data Type | Constraints | Description |
|----------|-----------|-------------|-------------|
| id | BIGSERIAL | Primary Key | Section identifier |
| section_key | VARCHAR(100) | UNIQUE | Internal section identifier |
| entity_type | VARCHAR(50) | NOT NULL | Referenced entity type |
| entity_id | BIGINT | NULL | Referenced entity ID |
| display_order | INTEGER | DEFAULT 1 | Display sequence |
| is_visible | BOOLEAN | DEFAULT TRUE | Visibility status |

---

## Example Records

| Section | Entity |
|----------|---------|
| hero | hero |
| statistics | statistics |
| about | about_us |
| india_map | project_locations |

---

## Business Rules

- Section order is controlled through `display_order`.
- Hidden sections are ignored by the frontend.
- Business data remains inside its respective module.

---

# Table: homepage_content

## Purpose

Provides a generic mechanism for displaying referenced content on the homepage.

This table never stores duplicated business data.

---

## Columns

| Column | Data Type | Constraints | Description |
|----------|-----------|-------------|-------------|
| id | BIGSERIAL | Primary Key | Content identifier |
| section_key | VARCHAR(100) | NOT NULL | Homepage section |
| entity_type | VARCHAR(50) | NOT NULL | Referenced entity |
| entity_id | BIGINT | NOT NULL | Referenced record |
| display_order | INTEGER | DEFAULT 1 | Display order |
| is_active | BOOLEAN | DEFAULT TRUE | Active status |

---

## Example Records

| Section | Entity | Entity ID |
|----------|--------|----------:|
| featured_projects | project | 7 |
| featured_projects | project | 11 |
| latest_news | news | 5 |
| latest_news | news | 9 |
| about_preview | about_us | 1 |

---

## Business Rules

- Homepage content references existing records only.
- No business content is duplicated.
- Display order determines rendering sequence.
- Future homepage sections can be introduced without database changes.

---

# Homepage Module Summary

| Table | Responsibility |
|---------|----------------|
| hero | Hero textual content |
| hero_buttons | Hero call-to-action buttons |
| statistics | Homepage statistics |
| homepage_sections | Homepage configuration |
| homepage_content | Generic homepage content references |

---

# Design Decisions

### Content Composition

The homepage is assembled dynamically from existing business entities rather than storing duplicate content.

---

### Hero Media

Images and videos are managed through the Digital Asset Management module instead of direct foreign keys.

---

### Statistics

Numeric values and units are stored separately to simplify frontend animations and formatting.

---

### Homepage Configuration

The visibility and ordering of sections are configurable without requiring code changes.

---

### Generic Content References

The `homepage_content` table allows any entity within the system to be featured on the homepage, making the homepage extensible without altering the schema.

---

# Future Compatibility

The Homepage module is designed to support future additions such as:

- Featured Leadership
- Featured Sustainability Initiatives
- Featured Careers
- Awards & Recognition
- Events
- Announcements
- Partner Organizations

without structural database changes.

# Module 3 – Projects

The Projects module is the core business module of the NHPC Website Management System.

It stores and manages all renewable energy projects, including project information, technical specifications, geographical locations, digital assets, homepage references, and map visualization.

Unlike traditional CMS implementations, media assets are managed through the centralized Digital Asset Management (DAM) module, ensuring that uploaded files remain reusable throughout the application.

---

# Lookup Table: project_statuses

## Purpose

Stores predefined project lifecycle statuses.

---

## Columns

| Column | Data Type | Constraints | Description |
|----------|-----------|-------------|-------------|
| id | BIGSERIAL | Primary Key | Status identifier |
| name | VARCHAR(100) | UNIQUE, NOT NULL | Status name |
| description | TEXT | NULL | Optional description |
| display_order | INTEGER | DEFAULT 1 | Ordering |
| is_active | BOOLEAN | DEFAULT TRUE | Active status |

---

## Example Records

- Planned
- Under Construction
- Operational
- Completed
- Archived

---

# Lookup Table: project_types

## Purpose

Stores renewable energy project classifications.

---

## Columns

| Column | Data Type | Constraints | Description |
|----------|-----------|-------------|-------------|
| id | BIGSERIAL | Primary Key | Type identifier |
| name | VARCHAR(100) | UNIQUE, NOT NULL | Project type |
| description | TEXT | NULL | Description |
| display_order | INTEGER | DEFAULT 1 | Ordering |
| is_active | BOOLEAN | DEFAULT TRUE | Active status |

---

## Example Records

- Hydroelectric
- Solar
- Wind
- Pumped Storage
- Joint Venture

---

# Lookup Table: capacity_units

## Purpose

Stores standardized capacity measurement units.

---

## Columns

| Column | Data Type | Constraints | Description |
|----------|-----------|-------------|-------------|
| id | BIGSERIAL | Primary Key | Unit identifier |
| name | VARCHAR(50) | UNIQUE | Full name |
| symbol | VARCHAR(20) | UNIQUE | Unit symbol |

---

## Example Records

| Name | Symbol |
|------|--------|
| Megawatt | MW |
| Gigawatt | GW |
| Kilowatt | kW |

---

# Lookup Table: states

## Purpose

Stores Indian states and union territories.

Used for project locations.

---

## Columns

| Column | Data Type | Constraints | Description |
|----------|-----------|-------------|-------------|
| id | BIGSERIAL | Primary Key | State identifier |
| name | VARCHAR(100) | UNIQUE | State name |
| code | VARCHAR(10) | UNIQUE | Official state code |

---

# Table: projects

## Purpose

Stores complete information about NHPC projects.

This table represents the primary business entity of the application.

---

## Columns

| Column | Data Type | Constraints | Description |
|----------|-----------|-------------|-------------|
| id | BIGSERIAL | Primary Key | Project identifier |
| name | VARCHAR(255) | NOT NULL | Project name |
| slug | VARCHAR(255) | UNIQUE, NOT NULL | URL slug |
| short_description | TEXT | NOT NULL | Homepage summary |
| full_description | TEXT | NULL | Detailed description |
| project_type_id | BIGINT | Foreign Key | Project type |
| status_id | BIGINT | Foreign Key | Project status |
| capacity | NUMERIC(12,2) | NULL | Installed capacity |
| capacity_unit_id | BIGINT | Foreign Key | Capacity unit |
| commission_date | DATE | NULL | Commissioning date |
| display_order | INTEGER | DEFAULT 1 | Display sequence |
| is_featured | BOOLEAN | DEFAULT FALSE | Featured on homepage |
| meta_title | VARCHAR(255) | NULL | SEO title |
| meta_description | TEXT | NULL | SEO description |
| created_by | BIGINT | Foreign Key | Administrator |
| updated_by | BIGINT | Foreign Key | Administrator |
| is_active | BOOLEAN | DEFAULT TRUE | Active status |
| deleted_at | TIMESTAMP | NULL | Soft delete timestamp |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Created timestamp |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Updated timestamp |

---

## Relationships

Projects reference:

- Project Type
- Project Status
- Capacity Unit
- Administrator

Projects own:

- One Project Location
- Many Project Specifications
- Many Media Assets

Projects may be referenced by:

- Homepage
- Interactive India Map

---

## Indexes

- Primary Key (id)
- Unique Index (slug)
- Index (project_type_id)
- Index (status_id)
- Index (capacity_unit_id)
- Index (display_order)
- Index (is_featured)
- Index (is_active)

---

## Business Rules

- Slugs must be unique.
- Every project belongs to one project type.
- Every project belongs to one project status.
- Capacity unit is mandatory whenever capacity is provided.
- Featured projects are selected through the Homepage module.
- Project ordering is controlled by display_order.
- Media assets are managed through Digital Asset Management.

---

# Table: project_locations

## Purpose

Stores geographical information for a project.

Provides data for the Interactive India Map.

---

## Columns

| Column | Data Type | Constraints | Description |
|----------|-----------|-------------|-------------|
| id | BIGSERIAL | Primary Key | Location identifier |
| project_id | BIGINT | UNIQUE, Foreign Key | Project |
| state_id | BIGINT | Foreign Key | State |
| district | VARCHAR(150) | NULL | District |
| city | VARCHAR(150) | NULL | City |
| latitude | DECIMAL(10,7) | NOT NULL | Latitude |
| longitude | DECIMAL(10,7) | NOT NULL | Longitude |
| marker_title | VARCHAR(255) | NULL | Map marker title |
| marker_description | TEXT | NULL | Marker description |

---

## Relationships

One Project

↓

One Project Location

---

## Indexes

- Primary Key (id)
- Unique Index (project_id)
- Index (state_id)

---

## Business Rules

- Every project must have exactly one location.
- Latitude and longitude are mandatory.
- Locations are visualized on the Interactive India Map.

---

# Table: project_specifications

## Purpose

Stores structured technical specifications for a project.

Specifications are displayed dynamically without changing the database schema.

---

## Columns

| Column | Data Type | Constraints | Description |
|----------|-----------|-------------|-------------|
| id | BIGSERIAL | Primary Key | Specification identifier |
| project_id | BIGINT | Foreign Key | Project |
| key | VARCHAR(150) | NOT NULL | Specification name |
| value | VARCHAR(255) | NOT NULL | Specification value |
| display_order | INTEGER | DEFAULT 1 | Display order |

---

## Example Records

| Key | Value |
|------|-------|
| Installed Capacity | 2000 MW |
| River | Teesta |
| Dam Height | 220 m |
| Turbines | 4 |

---

## Relationships

Many Specifications

↓

One Project

---

## Indexes

- Primary Key (id)
- Index (project_id)
- Index (display_order)

---

## Business Rules

- Specifications are rendered in ascending display_order.
- New specifications can be added without schema changes.

---

# Media Integration

Projects do not store image, video or document references directly.

Instead, all assets are associated using the Digital Asset Management module.

Example:

| Entity Type | Entity ID | Purpose |
|-------------|----------:|----------|
| project | 5 | hero |
| project | 5 | gallery |
| project | 5 | attachment |
| project | 5 | video |

Supported purposes include:

- hero
- gallery
- attachment
- blueprint
- video
- thumbnail

---

# Module Summary

| Table | Responsibility |
|---------|----------------|
| project_statuses | Project lifecycle |
| project_types | Renewable energy classification |
| capacity_units | Capacity measurement units |
| states | Indian states |
| projects | Core project information |
| project_locations | Geographic location |
| project_specifications | Technical specifications |

---

# Design Decisions

## Database Normalization

Project types, statuses, capacity units and states are normalized into lookup tables to maintain consistency and simplify administration.

---

## Digital Asset Management

Projects reference media assets through the generic `media_file_links` table.

This eliminates duplicate gallery or document tables while allowing unlimited media types.

---

## Geographic Information

Project locations are stored separately from projects to support map visualization and future GIS enhancements.

---

## Technical Specifications

Specifications follow a flexible key-value model, allowing new attributes to be introduced without modifying the database schema.

---

## SEO

SEO metadata is stored directly within the Projects table to simplify querying and administration.

---

# Future Compatibility

The Projects module has been designed to support future enhancements without structural database changes, including:

- Live generation statistics
- Construction progress
- Drone videos
- Timeline & milestones
- Environmental impact reports
- Related projects
- GIS integration
- Multi-language project descriptions

# Module 4 – News & Tenders

The News & Tenders module manages all public announcements published by NHPC.

Although both modules publish information, they serve different business purposes and therefore maintain separate database structures.

News focuses on articles, announcements and press releases, while Tenders manage procurement notices, bid documents and corrigenda.

All images, videos and downloadable files are managed through the Digital Asset Management (DAM) module.

---

# Lookup Table: news_categories

## Purpose

Stores categories for news articles.

---

## Columns

| Column | Data Type | Constraints | Description |
|----------|-----------|-------------|-------------|
| id | BIGSERIAL | Primary Key | Category identifier |
| name | VARCHAR(100) | UNIQUE, NOT NULL | Category name |
| slug | VARCHAR(100) | UNIQUE, NOT NULL | URL slug |
| description | TEXT | NULL | Category description |
| display_order | INTEGER | DEFAULT 1 | Display order |
| is_active | BOOLEAN | DEFAULT TRUE | Active status |

---

## Example Records

- Press Release
- Announcement
- Events
- Awards
- CSR
- Investor Updates

---

# Table: news

## Purpose

Stores all news articles published on the website.

---

## Columns

| Column | Data Type | Constraints | Description |
|----------|-----------|-------------|-------------|
| id | BIGSERIAL | Primary Key | News identifier |
| category_id | BIGINT | Foreign Key | News category |
| title | VARCHAR(255) | NOT NULL | Article title |
| slug | VARCHAR(255) | UNIQUE, NOT NULL | URL slug |
| summary | TEXT | NOT NULL | Short summary |
| content | TEXT | NOT NULL | Complete article |
| published_at | TIMESTAMP | NULL | Publication date & time |
| is_featured | BOOLEAN | DEFAULT FALSE | Homepage feature flag |
| meta_title | VARCHAR(255) | NULL | SEO title |
| meta_description | TEXT | NULL | SEO description |
| created_by | BIGINT | Foreign Key | Administrator |
| updated_by | BIGINT | Foreign Key | Administrator |
| is_active | BOOLEAN | DEFAULT TRUE | Active status |
| deleted_at | TIMESTAMP | NULL | Soft delete |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Created timestamp |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Updated timestamp |

---

## Relationships

One Category

↓

Many News Articles

---

News may be referenced by:

- Homepage
- Search
- Latest News
- Featured News

---

## Indexes

- Primary Key (id)
- Unique Index (slug)
- Index (category_id)
- Index (published_at)
- Index (is_featured)
- Index (is_active)

---

## Business Rules

- Slugs must be unique.
- News cannot be publicly visible before `published_at`.
- Soft-deleted articles are excluded from public APIs.
- Featured news is managed through Homepage configuration.

---

# Lookup Table: tender_statuses

## Purpose

Stores lifecycle statuses for tenders.

---

## Columns

| Column | Data Type | Constraints | Description |
|----------|-----------|-------------|-------------|
| id | BIGSERIAL | Primary Key | Status identifier |
| name | VARCHAR(100) | UNIQUE | Status name |
| display_order | INTEGER | DEFAULT 1 | Ordering |
| is_active | BOOLEAN | DEFAULT TRUE | Active status |

---

## Example Records

- Draft
- Open
- Closed
- Cancelled
- Awarded
- Archived

---

# Table: tenders

## Purpose

Stores procurement tenders published by NHPC.

---

## Columns

| Column | Data Type | Constraints | Description |
|----------|-----------|-------------|-------------|
| id | BIGSERIAL | Primary Key | Tender identifier |
| title | VARCHAR(255) | NOT NULL | Tender title |
| tender_number | VARCHAR(150) | UNIQUE, NOT NULL | Official tender number |
| department | VARCHAR(150) | NULL | Department |
| category | VARCHAR(150) | NULL | Tender category |
| description | TEXT | NULL | Tender description |
| opening_date | DATE | NOT NULL | Opening date |
| closing_date | DATE | NOT NULL | Closing date |
| status_id | BIGINT | Foreign Key | Tender status |
| meta_title | VARCHAR(255) | NULL | SEO title |
| meta_description | TEXT | NULL | SEO description |
| created_by | BIGINT | Foreign Key | Administrator |
| updated_by | BIGINT | Foreign Key | Administrator |
| is_active | BOOLEAN | DEFAULT TRUE | Active status |
| deleted_at | TIMESTAMP | NULL | Soft delete |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Created timestamp |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Updated timestamp |

---

## Relationships

One Tender Status

↓

Many Tenders

---

Tender media is managed through Digital Asset Management.

Examples

- Notice
- BOQ
- Corrigendum
- Drawings
- Addendum

---

## Indexes

- Primary Key (id)
- Unique Index (tender_number)
- Index (status_id)
- Index (opening_date)
- Index (closing_date)
- Index (is_active)

---

## Business Rules

- Tender numbers must be unique.
- Closing date must be greater than opening date.
- Status controls tender visibility and workflow.
- Tender documents are managed through `media_file_links`.

---

# Media Integration

News and Tenders never store image or document paths directly.

All assets are linked using the Digital Asset Management module.

Example:

| Entity Type | Entity ID | Purpose |
|-------------|----------:|----------|
| news | 8 | featured_image |
| news | 8 | gallery |
| news | 8 | attachment |
| tender | 5 | notice |
| tender | 5 | boq |
| tender | 5 | corrigendum |
| tender | 5 | drawing |

---

# Module Summary

| Table | Responsibility |
|---------|----------------|
| news_categories | News classification |
| news | News articles |
| tender_statuses | Tender lifecycle |
| tenders | Tender information |

---

# Design Decisions

## News Categories

Categories are normalized into a lookup table to ensure consistency and improve filtering.

---

## Scheduled Publishing

News articles become visible based on `published_at`, allowing administrators to prepare content in advance.

---

## Tender Lifecycle

Tender statuses are normalized into a lookup table to prevent inconsistent status values.

---

## Digital Asset Management

Images, PDFs and supporting documents are managed through the centralized Digital Asset Management module.

---

## SEO

SEO metadata is stored directly within News and Tenders to simplify administration.

---

# Future Compatibility

The News & Tenders module has been designed to support future enhancements without structural database changes, including:

- Scheduled publishing
- Expired tender archiving
- Tender version history
- News tags
- Related news articles
- RSS feeds
- Social media publishing
- Search indexing

# Module 5 – Careers, Leadership & Sustainability

The Careers, Leadership & Sustainability module manages NHPC's recruitment, organizational leadership and sustainability initiatives.

The Careers module enables administrators to publish job openings and manage candidate applications.

The Leadership module maintains executive and board member profiles.

The Sustainability module manages CSR initiatives, environmental programs and sustainability-related content.

All digital assets including profile photographs, brochures and supporting documents are managed through the centralized Digital Asset Management (DAM) module.

---

# Lookup Table: employment_types

## Purpose

Stores standardized employment types.

---

## Columns

| Column | Data Type | Constraints | Description |
|----------|-----------|-------------|-------------|
| id | BIGSERIAL | Primary Key | Employment type identifier |
| name | VARCHAR(100) | UNIQUE, NOT NULL | Employment type |
| description | TEXT | NULL | Optional description |
| display_order | INTEGER | DEFAULT 1 | Display order |
| is_active | BOOLEAN | DEFAULT TRUE | Active status |

---

## Example Records

- Full Time
- Part Time
- Contract
- Internship
- Apprenticeship

---

# Lookup Table: application_statuses

## Purpose

Stores standardized workflow statuses for career applications.

---

## Columns

| Column | Data Type | Constraints | Description |
|----------|-----------|-------------|-------------|
| id | BIGSERIAL | Primary Key | Status identifier |
| name | VARCHAR(100) | UNIQUE, NOT NULL | Status name |
| description | TEXT | NULL | Optional description |
| display_order | INTEGER | DEFAULT 1 | Display order |
| is_active | BOOLEAN | DEFAULT TRUE | Active status |

---

## Example Records

- Submitted
- Under Review
- Shortlisted
- Interview Scheduled
- Selected
- Rejected
- Withdrawn

---

# Lookup Table: leadership_levels

## Purpose

Stores standardized leadership hierarchy.

---

## Columns

| Column | Data Type | Constraints | Description |
|----------|-----------|-------------|-------------|
| id | BIGSERIAL | Primary Key | Level identifier |
| name | VARCHAR(100) | UNIQUE, NOT NULL | Leadership level |
| description | TEXT | NULL | Optional description |
| display_order | INTEGER | DEFAULT 1 | Display order |
| is_active | BOOLEAN | DEFAULT TRUE | Active status |

---

## Example Records

- Chairman
- Managing Director
- Director
- Executive Director
- Independent Director

---

# Lookup Table: sustainability_types

## Purpose

Stores categories of sustainability initiatives.

---

## Columns

| Column | Data Type | Constraints | Description |
|----------|-----------|-------------|-------------|
| id | BIGSERIAL | Primary Key | Type identifier |
| name | VARCHAR(100) | UNIQUE, NOT NULL | Initiative type |
| description | TEXT | NULL | Optional description |
| display_order | INTEGER | DEFAULT 1 | Display order |
| is_active | BOOLEAN | DEFAULT TRUE | Active status |

---

## Example Records

- CSR
- Environment
- Biodiversity
- Community Development
- Renewable Energy
- Water Conservation

---

# Table: careers

## Purpose

Stores job opportunities published by NHPC.

---

## Columns

| Column | Data Type | Constraints | Description |
|----------|-----------|-------------|-------------|
| id | BIGSERIAL | Primary Key | Career identifier |
| title | VARCHAR(255) | NOT NULL | Job title |
| employment_type_id | BIGINT | Foreign Key | Employment type |
| department | VARCHAR(150) | NOT NULL | Department |
| job_location | VARCHAR(150) | NOT NULL | Job location |
| minimum_experience_years | DECIMAL(3,1) | NULL | Minimum required experience |
| experience_notes | TEXT | NULL | Additional experience requirements |
| vacancies | INTEGER | DEFAULT 1 | Total vacancies |
| positions_filled | INTEGER | DEFAULT 0 | Filled positions |
| description | TEXT | NOT NULL | Job description |
| application_start_date | DATE | NULL | Application opening date |
| application_end_date | DATE | NOT NULL | Application closing date |
| is_featured | BOOLEAN | DEFAULT FALSE | Featured on homepage |
| meta_title | VARCHAR(255) | NULL | SEO title |
| meta_description | TEXT | NULL | SEO description |
| created_by | BIGINT | Foreign Key | Administrator |
| updated_by | BIGINT | Foreign Key | Administrator |
| is_active | BOOLEAN | DEFAULT TRUE | Active status |
| deleted_at | TIMESTAMP | NULL | Soft delete timestamp |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record creation |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Last update |

---

## Relationships

- One Employment Type contains many Careers.
- Careers may be referenced by the Homepage module.
- Career media assets are linked through `media_file_links`.

---

## Indexes

- Primary Key (id)
- Index (employment_type_id)
- Index (application_start_date)
- Index (application_end_date)
- Index (is_featured)
- Index (is_active)

---

## Business Rules

- Application end date must be later than the application start date.
- Positions filled cannot exceed total vacancies.
- Supporting documents are linked using `media_file_links`.
- Featured careers are managed through the Homepage module.

---

# Table: career_applications

## Purpose

Stores candidate applications submitted for published job openings.

---

## Columns

| Column | Data Type | Constraints | Description |
|----------|-----------|-------------|-------------|
| id | BIGSERIAL | Primary Key | Application identifier |
| career_id | BIGINT | Foreign Key | Career |
| application_status_id | BIGINT | Foreign Key | Application status |
| full_name | VARCHAR(200) | NOT NULL | Applicant name |
| email | VARCHAR(255) | NOT NULL | Applicant email |
| phone | VARCHAR(25) | NOT NULL | Contact number |
| cover_letter | TEXT | NULL | Cover letter |
| administrator_notes | TEXT | NULL | Internal notes |
| applied_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Submission timestamp |

---

## Relationships

- One Career contains many Applications.
- One Application Status contains many Applications.
- Resume files are linked through `media_file_links`.

---

## Indexes

- Primary Key (id)
- Index (career_id)
- Index (application_status_id)
- Index (email)

---

## Business Rules

- Every application belongs to one career.
- Every application belongs to one workflow status.
- Resume files are managed through the Digital Asset Management module.
- Candidate data cannot be modified after submission except by authorized administrators updating workflow status or internal notes.

---

# Table: leadership

## Purpose

Stores leadership profiles displayed on the website.

---

## Columns

| Column | Data Type | Constraints | Description |
|----------|-----------|-------------|-------------|
| id | BIGSERIAL | Primary Key | Leadership identifier |
| leadership_level_id | BIGINT | Foreign Key | Leadership level |
| full_name | VARCHAR(200) | NOT NULL | Full name |
| designation | VARCHAR(200) | NOT NULL | Designation |
| biography | TEXT | NULL | Biography |
| display_order | INTEGER | DEFAULT 1 | Display order |
| created_by | BIGINT | Foreign Key | Administrator |
| updated_by | BIGINT | Foreign Key | Administrator |
| is_active | BOOLEAN | DEFAULT TRUE | Active status |
| deleted_at | TIMESTAMP | NULL | Soft delete timestamp |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record creation |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Last update |

---

## Relationships

- One Leadership Level contains many Leadership profiles.
- Profile photographs are linked through `media_file_links`.

---

## Indexes

- Primary Key (id)
- Index (leadership_level_id)
- Index (display_order)
- Index (is_active)

---

## Business Rules

- Leadership profiles are displayed in ascending display order.
- Profile photographs are managed through the Digital Asset Management module.

---

# Table: sustainability

## Purpose

Stores sustainability initiatives, CSR programs and environmental activities.

---

## Columns

| Column | Data Type | Constraints | Description |
|----------|-----------|-------------|-------------|
| id | BIGSERIAL | Primary Key | Initiative identifier |
| sustainability_type_id | BIGINT | Foreign Key | Initiative type |
| title | VARCHAR(255) | NOT NULL | Initiative title |
| summary | TEXT | NOT NULL | Short summary |
| content | TEXT | NOT NULL | Detailed content |
| published_at | TIMESTAMP | NULL | Publication timestamp |
| is_featured | BOOLEAN | DEFAULT FALSE | Homepage feature |
| meta_title | VARCHAR(255) | NULL | SEO title |
| meta_description | TEXT | NULL | SEO description |
| created_by | BIGINT | Foreign Key | Administrator |
| updated_by | BIGINT | Foreign Key | Administrator |
| is_active | BOOLEAN | DEFAULT TRUE | Active status |
| deleted_at | TIMESTAMP | NULL | Soft delete timestamp |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record creation |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Last update |

---

## Relationships

- One Sustainability Type contains many Sustainability initiatives.
- Sustainability media assets are linked through `media_file_links`.
- Featured initiatives may be referenced by the Homepage module.

---

## Indexes

- Primary Key (id)
- Index (sustainability_type_id)
- Index (published_at)
- Index (is_featured)
- Index (is_active)

---

## Business Rules

- Initiatives become publicly visible according to `published_at`.
- Featured initiatives are managed through the Homepage module.
- Images and documents are managed through the Digital Asset Management module.

---

# Media Integration

The Careers, Leadership and Sustainability modules never store media paths directly.

Instead, all digital assets are associated through `media_file_links`.

Examples

| Entity Type | Purpose |
|-------------|----------|
| career | attachment |
| career_application | resume |
| leadership | profile_image |
| sustainability | featured_image |
| sustainability | gallery |
| sustainability | attachment |

---

# Module Summary

| Table | Responsibility |
|---------|----------------|
| employment_types | Employment classification |
| application_statuses | Recruitment workflow |
| leadership_levels | Leadership hierarchy |
| sustainability_types | Sustainability classification |
| careers | Job opportunities |
| career_applications | Candidate applications |
| leadership | Leadership profiles |
| sustainability | Sustainability initiatives |

---

# Design Decisions

## Database Normalization

Employment types, application statuses, leadership levels and sustainability categories are normalized into lookup tables to maintain consistency and simplify administration.

---

## Recruitment Workflow

Career applications use a standardized workflow managed through the `application_statuses` lookup table.

---

## Digital Asset Management

Resumes, profile photographs, brochures and supporting documents are managed centrally through the Digital Asset Management module.

---

## Homepage Integration

Featured careers and sustainability initiatives are referenced through the Homepage module rather than duplicating content.

---

## SEO

SEO metadata is stored directly within the Careers and Sustainability tables for simplicity and efficient querying.

---

# Future Compatibility

The module is designed to support future enhancements without structural database changes, including:

- Online application forms
- Email notifications
- Resume parsing
- Interview scheduling
- Applicant evaluation workflow
- Leadership history
- CSR reports
- Sustainability metrics
- Awards & Recognition
- Multi-language content

# Module 6 – Investor Relations

The Investor Relations module manages all investor-facing documents published by NHPC.

It provides structured access to annual reports, quarterly reports, financial statements, shareholding information, presentations and other statutory disclosures.

All downloadable documents are managed through the centralized Digital Asset Management (DAM) module.

---

# Lookup Table: investor_document_types

## Purpose

Stores standardized classifications for investor documents.

---

## Columns

| Column | Data Type | Constraints | Description |
|----------|-----------|-------------|-------------|
| id | BIGSERIAL | Primary Key | Document type identifier |
| name | VARCHAR(100) | UNIQUE, NOT NULL | Document type |
| description | TEXT | NULL | Optional description |
| display_order | INTEGER | DEFAULT 1 | Display order |
| is_active | BOOLEAN | DEFAULT TRUE | Active status |

---

## Example Records

- Annual Report
- Quarterly Results
- Financial Statements
- Shareholding Pattern
- Annual Return
- Presentation
- Corporate Governance
- Disclosure

---

# Lookup Table: financial_years

## Purpose

Stores standardized financial years.

---

## Columns

| Column | Data Type | Constraints | Description |
|----------|-----------|-------------|-------------|
| id | BIGSERIAL | Primary Key | Financial year identifier |
| label | VARCHAR(20) | UNIQUE, NOT NULL | Display label |
| start_date | DATE | NOT NULL | Financial year start |
| end_date | DATE | NOT NULL | Financial year end |
| is_active | BOOLEAN | DEFAULT TRUE | Active status |

---

## Example Records

- 2023-24
- 2024-25
- 2025-26

---

# Table: investor_documents

## Purpose

Stores investor-related documents published by NHPC.

---

## Columns

| Column | Data Type | Constraints | Description |
|----------|-----------|-------------|-------------|
| id | BIGSERIAL | Primary Key | Document identifier |
| document_type_id | BIGINT | Foreign Key | Document type |
| financial_year_id | BIGINT | Foreign Key | Financial year |
| title | VARCHAR(255) | NOT NULL | Document title |
| version | INTEGER | DEFAULT 1 | Version number |
| published_at | TIMESTAMP | NULL | Publication timestamp |
| meta_title | VARCHAR(255) | NULL | SEO title |
| meta_description | TEXT | NULL | SEO description |
| created_by | BIGINT | Foreign Key | Administrator |
| updated_by | BIGINT | Foreign Key | Administrator |
| is_active | BOOLEAN | DEFAULT TRUE | Active status |
| deleted_at | TIMESTAMP | NULL | Soft delete timestamp |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record creation |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Last update |

---

## Relationships

- One Document Type contains many Investor Documents.
- One Financial Year contains many Investor Documents.
- Documents are linked to files through the Digital Asset Management module.

---

## Indexes

- Primary Key (id)
- Index (document_type_id)
- Index (financial_year_id)
- Index (published_at)
- Index (is_active)

---

## Business Rules

- Every investor document belongs to one document type.
- Every investor document belongs to one financial year.
- Documents are version controlled.
- Supporting PDFs and spreadsheets are managed through `media_file_links`.

---

# Media Integration

Investor documents never store file paths directly.

Instead, all downloadable files are linked using the Digital Asset Management module.

Examples

| Entity Type | Purpose |
|-------------|----------|
| investor_document | attachment |
| investor_document | supplementary |
| investor_document | presentation |

---

# Module Summary

| Table | Responsibility |
|---------|----------------|
| investor_document_types | Document classification |
| financial_years | Financial year master |
| investor_documents | Investor publications |

---

# Design Decisions

## Database Normalization

Document types and financial years are normalized into lookup tables to ensure consistency and simplify filtering.

---

## Document Versioning

Each document maintains an explicit version number, allowing updated releases without losing historical references.

---

## Digital Asset Management

All downloadable assets are managed centrally through the Digital Asset Management module and associated using `media_file_links`.

---

## SEO

SEO metadata is stored directly within the Investor Documents table to simplify administration and querying.

---

# Future Compatibility

The module is designed to support future enhancements without structural database changes, including:

- Historical document archive
- Investor notifications
- Digital signatures
- Stock exchange filings
- Multiple document attachments
- Search indexing
- Multi-language publications

# Module 7 – Contact & Navigation

The Contact & Navigation module manages office information, visitor enquiries and website navigation.

The Contact module stores NHPC office details and manages enquiries submitted through the website.

The Navigation module provides dynamic website menus that can be managed entirely from the administration panel.

---

# Lookup Table: office_types

## Purpose

Stores standardized office classifications.

---

## Columns

| Column | Data Type | Constraints | Description |
|----------|-----------|-------------|-------------|
| id | BIGSERIAL | Primary Key | Office type identifier |
| name | VARCHAR(100) | UNIQUE, NOT NULL | Office type |
| description | TEXT | NULL | Optional description |
| display_order | INTEGER | DEFAULT 1 | Display order |
| is_active | BOOLEAN | DEFAULT TRUE | Active status |

---

## Example Records

- Corporate Office
- Regional Office
- Project Office
- Site Office

---

# Lookup Table: message_statuses

## Purpose

Stores workflow statuses for contact enquiries.

---

## Columns

| Column | Data Type | Constraints | Description |
|----------|-----------|-------------|-------------|
| id | BIGSERIAL | Primary Key | Status identifier |
| name | VARCHAR(100) | UNIQUE, NOT NULL | Status |
| description | TEXT | NULL | Optional description |
| display_order | INTEGER | DEFAULT 1 | Display order |
| is_active | BOOLEAN | DEFAULT TRUE | Active status |

---

## Example Records

- New
- In Progress
- Resolved
- Closed
- Spam

---

# Table: offices

## Purpose

Stores office locations and contact information displayed on the website.

---

## Columns

| Column | Data Type | Constraints | Description |
|----------|-----------|-------------|-------------|
| id | BIGSERIAL | Primary Key | Office identifier |
| office_type_id | BIGINT | Foreign Key | Office type |
| office_name | VARCHAR(255) | NOT NULL | Office name |
| address | TEXT | NOT NULL | Postal address |
| city | VARCHAR(150) | NOT NULL | City |
| state_id | BIGINT | Foreign Key | State |
| postal_code | VARCHAR(20) | NULL | Postal code |
| phone | VARCHAR(50) | NULL | Contact number |
| email | VARCHAR(255) | NULL | Email address |
| working_hours | VARCHAR(255) | NULL | Working hours |
| latitude | DECIMAL(10,7) | NULL | Latitude |
| longitude | DECIMAL(10,7) | NULL | Longitude |
| map_embed_url | TEXT | NULL | Google Maps embed URL |
| display_order | INTEGER | DEFAULT 1 | Display order |
| created_by | BIGINT | Foreign Key | Administrator |
| updated_by | BIGINT | Foreign Key | Administrator |
| is_active | BOOLEAN | DEFAULT TRUE | Active status |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record creation |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Last update |

---

## Relationships

- One Office Type contains many Offices.
- One State contains many Offices.

---

## Indexes

- Primary Key (id)
- Index (office_type_id)
- Index (state_id)
- Index (display_order)
- Index (is_active)

---

## Business Rules

- Every office belongs to one office type.
- Offices are displayed according to display_order.
- State references the shared `states` lookup table.

---

# Table: contact_messages

## Purpose

Stores enquiries submitted through the contact form.

---

## Columns

| Column | Data Type | Constraints | Description |
|----------|-----------|-------------|-------------|
| id | BIGSERIAL | Primary Key | Message identifier |
| message_status_id | BIGINT | Foreign Key | Workflow status |
| full_name | VARCHAR(200) | NOT NULL | Sender name |
| email | VARCHAR(255) | NOT NULL | Sender email |
| phone | VARCHAR(30) | NULL | Contact number |
| subject | VARCHAR(255) | NOT NULL | Subject |
| message | TEXT | NOT NULL | Message |
| administrator_notes | TEXT | NULL | Internal notes |
| submitted_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Submission time |

---

## Relationships

- One Message Status contains many Contact Messages.

---

## Indexes

- Primary Key (id)
- Index (message_status_id)
- Index (submitted_at)
- Index (email)

---

## Business Rules

- Messages are immutable after submission.
- Only administrators may update workflow status and notes.

---

# Table: navigation_menus

## Purpose

Stores website navigation groups.

---

## Columns

| Column | Data Type | Constraints | Description |
|----------|-----------|-------------|-------------|
| id | BIGSERIAL | Primary Key | Menu identifier |
| name | VARCHAR(100) | UNIQUE, NOT NULL | Menu name |
| location | VARCHAR(100) | NOT NULL | Display location |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record creation |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Last update |

---

## Example Records

- Main Navigation
- Footer Navigation
- Quick Links

---

# Table: navigation_items

## Purpose

Stores navigation links belonging to menus.

---

## Columns

| Column | Data Type | Constraints | Description |
|----------|-----------|-------------|-------------|
| id | BIGSERIAL | Primary Key | Navigation item identifier |
| menu_id | BIGINT | Foreign Key | Parent menu |
| parent_item_id | BIGINT | Foreign Key, NULL | Parent navigation item |
| label | VARCHAR(150) | NOT NULL | Menu label |
| url | VARCHAR(255) | NOT NULL | Destination URL |
| icon | VARCHAR(100) | NULL | Optional icon |
| target | VARCHAR(20) | DEFAULT '_self' | Link target |
| display_order | INTEGER | DEFAULT 1 | Display order |
| is_visible | BOOLEAN | DEFAULT TRUE | Visibility |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record creation |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Last update |

---

## Relationships

- One Menu contains many Navigation Items.
- Navigation Items support unlimited nesting through `parent_item_id`.

---

## Indexes

- Primary Key (id)
- Index (menu_id)
- Index (parent_item_id)
- Index (display_order)

---

## Business Rules

- Navigation items are rendered according to display_order.
- Hidden items are excluded from public navigation.
- Parent-child hierarchy supports dropdown and mega menus.

---

# Module Summary

| Table | Responsibility |
|---------|----------------|
| office_types | Office classification |
| message_statuses | Contact workflow |
| offices | Office information |
| contact_messages | Visitor enquiries |
| navigation_menus | Navigation groups |
| navigation_items | Website navigation |

---

# Design Decisions

## Shared Lookup Tables

Office information reuses the global `states` lookup table, avoiding duplicate geographic data.

---

## Workflow Management

Contact enquiries use standardized workflow statuses rather than a simple read/unread flag.

---

## Dynamic Navigation

Website menus are fully data-driven and configurable without code changes.

---

## Future Compatibility

The module supports future enhancements including:

- Multiple contact forms
- Department routing
- Email notifications
- Office search
- Interactive office maps
- Mega menus
- Permission-based navigation
- External links
- Multi-language navigation

# Module 8 – Database Standards & Conventions

This document defines the database standards, naming conventions, design principles and governance rules for the NHPC Website Management System.

All future database objects, migrations and modules must follow these standards to maintain consistency, scalability and maintainability.

---

# 1. Database Engine

The project uses PostgreSQL as the primary relational database.

Reasons:

- ACID compliance
- Excellent indexing support
- JSON support
- Strong foreign key enforcement
- Mature ecosystem
- Excellent Prisma ORM support
- Enterprise-grade scalability

---

# 2. Naming Conventions

## Tables

- Use plural nouns.
- Use snake_case.
- Avoid abbreviations unless universally accepted.

Examples

```
projects
news
tenders
media_files
homepage_sections
career_applications
```

---

## Columns

Use snake_case.

Examples

```
created_at
updated_at
display_order
application_end_date
```

---

## Primary Keys

Every table uses

```
id BIGSERIAL PRIMARY KEY
```

---

## Foreign Keys

Always follow

```
<referenced_table>_id
```

Examples

```
project_type_id
status_id
employment_type_id
state_id
```

---

## Boolean Fields

Always prefix with

```
is_
```

Examples

```
is_active
is_featured
is_visible
```

Avoid names like

```
active
visible
featured
```

---

# 3. Audit Fields

Every business table should include:

| Column |
|----------|
| created_by |
| updated_by |
| created_at |
| updated_at |

These fields provide complete traceability for administrative actions.

Lookup tables may omit `created_by` and `updated_by` unless future auditing requirements demand them.

---

# 4. Soft Delete Policy

Business entities are never permanently deleted.

Instead:

```
deleted_at TIMESTAMP NULL
```

is used.

Rules

- NULL → Active
- Timestamp → Deleted

Deleted records must be excluded from public APIs.

Lookup tables should generally not use soft deletes. Instead, disable them using `is_active`.

---

# 5. Active Status

Most entities include

```
is_active BOOLEAN DEFAULT TRUE
```

Inactive records remain in the database but are hidden from public APIs.

Examples

- Project temporarily hidden
- Tender archived
- Sustainability initiative unpublished

---

# 6. Display Order

Whenever administrators control ordering, use

```
display_order INTEGER DEFAULT 1
```

Examples

- Hero buttons
- Homepage sections
- Statistics
- Leadership profiles
- Navigation items

Never rely on creation timestamps for presentation order.

---

# 7. Slug Policy

Entities that have public URLs include

```
slug VARCHAR(...)
```

Requirements

- Unique
- URL-safe
- Generated automatically
- Editable by administrators

Examples

```
parbati-ii-project

annual-report-2025

press-release-new-unit
```

Lookup tables typically do not require slugs unless they appear in public URLs.

---

# 8. Lookup Tables

Business-controlled values must be normalized into lookup tables.

Examples

- project_statuses
- project_types
- tender_statuses
- tender_categories
- employment_types
- leadership_levels
- office_types

Every lookup table follows the same structure.

```
id

name

description

display_order

is_active
```

Benefits

- Consistency
- Easy administration
- Dropdown generation
- Prevents duplicate values

---

# 9. Media Management

No business table stores

- image paths
- PDFs
- videos
- file locations

Instead, all assets are managed through

```
media_folders

media_files

media_file_links
```

Benefits

- File reuse
- Centralized management
- Future cloud migration
- Unlimited media types

---

# 10. SEO Strategy

SEO is embedded directly inside publishable entities.

Example

```
meta_title

meta_description
```

No separate SEO table is required.

---

# 11. Homepage Strategy

The homepage never duplicates business data.

Instead it references entities through

```
homepage_content
```

Examples

```
Featured Projects

↓

Projects

Latest News

↓

News

About Preview

↓

About Us
```

This allows homepage content to evolve without schema changes.

---

# 12. Scheduling Policy

Publishable entities use

```
published_at

unpublished_at
```

Examples

- News
- Sustainability
- Investor Documents

Backend visibility rule

```
published_at <= NOW()

AND

(
unpublished_at IS NULL
OR
unpublished_at > NOW()
)
```

---

# 13. Workflow Statuses

Any business workflow must use lookup tables.

Examples

```
project_statuses

tender_statuses

application_statuses

message_statuses
```

Avoid free-text status fields.

---

# 14. Geographic Data

State information is normalized.

```
states
```

Location-specific tables reference

```
state_id
```

Latitude and longitude are stored wherever map visualization is required.

---

# 15. Versioning

Documents that may be revised include

```
version INTEGER
```

Examples

- Annual Reports
- Investor Documents

Historical versions remain preserved.

---

# 16. Indexing Strategy

Create indexes for:

- Every foreign key
- Every slug
- Frequently filtered fields
- Publish dates
- Active flags
- Featured flags

Avoid excessive indexing on infrequently queried columns.

---

# 17. Constraints

Use database constraints whenever possible.

Examples

Unique

```
email

slug

tender_number
```

Business rules

```
closing_date > opening_date

positions_filled <= vacancies
```

Where database-level enforcement is not practical, enforce rules within the application layer.

---

# 18. Timezone Policy

All timestamps are stored in UTC.

Frontend converts timestamps to the user's local timezone.

---

# 19. Migration Strategy

Schema changes must use version-controlled migrations.

Never modify production tables manually.

Every migration should be:

- Reversible
- Tested
- Documented

---

# 20. API Design Principles

The database is designed for a RESTful API.

General patterns

```
GET

POST

PUT

PATCH

DELETE
```

Public APIs expose only active and published content.

Administrative APIs have full CRUD capabilities.

---

# 21. Security Principles

Passwords

- Never stored in plain text
- Always hashed

Uploads

- Validated
- Sanitized
- Size restricted

Database

- Parameterized queries
- ORM-managed access
- Foreign key enforcement

---

# 22. Scalability Principles

The schema is designed to support:

- Cloud storage
- Multiple administrators
- Role-Based Access Control (RBAC)
- Audit logs
- Search indexing
- GIS integration
- Multi-language content
- API versioning
- Horizontal scaling

without major structural changes.

---

# 23. Overall Database Architecture

```
                    +----------------------+
                    |      Admins          |
                    +----------+-----------+
                               |
                               |
                 +-------------v-------------+
                 |   Digital Asset Manager   |
                 |                           |
                 | media_folders             |
                 | media_files               |
                 | media_file_links          |
                 +-------------+-------------+
                               |
        ---------------------------------------------------------
        |        |         |         |         |        |         |
        v        v         v         v         v        v         v
   Homepage  Projects   News    Tenders   Careers  Investors  Contact
        |                                                |
        +------------------+-----------------------------+
                           |
                           v
                    Public Website
```

---

# 24. Final Design Principles

The NHPC Website Management System follows these architectural principles:

- Normalized relational database design
- Separation of business and configuration data
- Reusable Digital Asset Management
- Generic homepage composition
- Lookup-table driven workflows
- Consistent audit fields
- Soft deletion
- UTC timestamp storage
- REST-friendly schema
- Future-proof modular architecture

---
