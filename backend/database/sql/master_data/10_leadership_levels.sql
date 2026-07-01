-- ============================================================
-- Master Data : Leadership Levels
-- ============================================================

INSERT INTO leadership_levels
(
    name,
    code,
    description,
    display_order,
    is_active
)
VALUES

(
    'Board of Directors',
    'BOARD',
    'Board level leadership',
    1,
    TRUE
),

(
    'Executive Management',
    'EXECUTIVE',
    'Executive management team',
    2,
    TRUE
),

(
    'Senior Management',
    'SENIOR_MANAGEMENT',
    'Senior management personnel',
    3,
    TRUE
)

ON CONFLICT (code)
DO UPDATE
SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    display_order = EXCLUDED.display_order,
    is_active = EXCLUDED.is_active;