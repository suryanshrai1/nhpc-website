-- ============================================================
-- Project      : NHPC Website
-- File         : 99_reset_master_data.sql
-- Description  : Reset Master Data Tables
-- Usage        : Development Only
-- WARNING      : Deletes all lookup/master data.
-- ============================================================

BEGIN;

TRUNCATE TABLE
    project_statuses
RESTART IDENTITY;

TRUNCATE TABLE
    project_types
RESTART IDENTITY;

TRUNCATE TABLE
    capacity_units
RESTART IDENTITY;

TRUNCATE TABLE
    news_categories
RESTART IDENTITY;

TRUNCATE TABLE
    tender_categories
RESTART IDENTITY;

TRUNCATE TABLE
    tender_statuses
RESTART IDENTITY;

TRUNCATE TABLE
    employment_types
RESTART IDENTITY;

TRUNCATE TABLE
    application_statuses
RESTART IDENTITY;

TRUNCATE TABLE
    leadership_levels
RESTART IDENTITY;

TRUNCATE TABLE
    sustainability_types
RESTART IDENTITY;

TRUNCATE TABLE
    investor_document_types
RESTART IDENTITY;

TRUNCATE TABLE
    financial_years
RESTART IDENTITY;

TRUNCATE TABLE
    office_types
RESTART IDENTITY;

TRUNCATE TABLE
    message_statuses
RESTART IDENTITY;

TRUNCATE TABLE
    states
RESTART IDENTITY;

COMMIT;