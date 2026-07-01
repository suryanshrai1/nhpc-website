-- ============================================================
-- Master Data : Office Types
-- ============================================================

INSERT INTO office_types
(
    name,
    code,
    description,
    display_order,
    is_active
)
VALUES

(
    'Corporate Office',
    'CORPORATE',
    'Corporate headquarters',
    1,
    TRUE
),

(
    'Regional Office',
    'REGIONAL',
    'Regional office',
    2,
    TRUE
),

(
    'Project Office',
    'PROJECT',
    'Project office',
    3,
    TRUE
),

(
    'Liaison Office',
    'LIAISON',
    'Liaison office',
    4,
    TRUE
)

ON CONFLICT (code)
DO UPDATE
SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    display_order = EXCLUDED.display_order,
    is_active = EXCLUDED.is_active;