-- ============================================================
-- Project      : NHPC Website
-- File         : 00_database_infrastructure.sql
-- Module       : Database Infrastructure
-- Description  : Shared database functions
-- Database     : PostgreSQL 18+
-- ============================================================

SET TIME ZONE 'UTC';

-- ============================================================
-- Function: fn_update_updated_at
-- Automatically updates updated_at before every UPDATE
-- ============================================================

CREATE OR REPLACE FUNCTION fn_update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS
$$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;