-- ============================================================
-- Project      : NHPC Website
-- File         : 01_database.sql
-- Description  : Database Initialization Script
-- Database     : PostgreSQL 18+
-- Author       : Suryansh Rai
-- ============================================================

-- Create the database only if it does not already exist.
-- PostgreSQL doesn't support CREATE DATABASE IF NOT EXISTS,
-- so check manually before running this script.

CREATE DATABASE nhpc_website_db
WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    TEMPLATE = template0;

COMMENT ON DATABASE nhpc_website_db IS
'Database for the NHPC Website Management System';