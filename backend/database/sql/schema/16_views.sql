-- ============================================================
-- Project      : NHPC Website
-- File         : 16_views.sql
-- Description  : Common Database Views
-- Database     : PostgreSQL 18+
-- ============================================================

SET TIME ZONE 'UTC';

-- ============================================================
-- View: Active Projects
-- ============================================================

CREATE OR REPLACE VIEW vw_active_projects AS

SELECT
    p.*,
    pt.name AS project_type,
    ps.name AS project_status,
    cu.code AS capacity_unit

FROM projects p

INNER JOIN project_types pt
ON p.project_type_id = pt.id

INNER JOIN project_statuses ps
ON p.project_status_id = ps.id

INNER JOIN capacity_units cu
ON p.capacity_unit_id = cu.id

WHERE p.is_active = TRUE;

-- ============================================================
-- View: Latest News
-- ============================================================

CREATE OR REPLACE VIEW vw_latest_news AS

SELECT
    n.*,
    nc.name AS category

FROM news n

INNER JOIN news_categories nc
ON n.news_category_id = nc.id

WHERE n.is_active = TRUE

ORDER BY n.published_at DESC;

-- ============================================================
-- View: Active Tenders
-- ============================================================

CREATE OR REPLACE VIEW vw_active_tenders AS

SELECT
    t.*,
    tc.name AS category,
    ts.name AS status

FROM tenders t

INNER JOIN tender_categories tc
ON t.tender_category_id = tc.id

INNER JOIN tender_statuses ts
ON t.tender_status_id = ts.id

WHERE t.is_active = TRUE;

-- ============================================================
-- View: Leadership Directory
-- ============================================================

CREATE OR REPLACE VIEW vw_active_leadership AS

SELECT
    l.*,
    ll.name AS leadership_level

FROM leadership l

INNER JOIN leadership_levels ll
ON l.leadership_level_id = ll.id

WHERE l.is_active = TRUE

ORDER BY
    l.display_order,
    l.full_name;

-- ============================================================
-- View: Operational Power Stations
-- ============================================================

CREATE OR REPLACE VIEW vw_operational_power_stations AS

SELECT
    ops.*,
    s.name AS state,
    pt.name AS project_type,
    cu.code AS capacity_unit

FROM operational_power_stations ops

INNER JOIN states s
ON ops.state_id = s.id

INNER JOIN project_types pt
ON ops.project_type_id = pt.id

INNER JOIN capacity_units cu
ON ops.capacity_unit_id = cu.id

WHERE ops.is_active = TRUE

ORDER BY
    ops.display_order,
    ops.name;

-- ============================================================
-- View: Homepage Featured Projects
-- ============================================================

CREATE OR REPLACE VIEW vw_featured_projects AS

SELECT
    p.*,
    pt.name AS project_type,
    cu.code AS capacity_unit

FROM projects p

INNER JOIN project_types pt
ON p.project_type_id = pt.id

INNER JOIN capacity_units cu
ON p.capacity_unit_id = cu.id

WHERE
    p.is_active = TRUE
    AND p.is_featured = TRUE

ORDER BY
    p.display_order,
    p.name;