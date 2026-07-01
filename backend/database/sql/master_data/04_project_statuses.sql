-- ============================================================
-- Master Data : Project Statuses
-- ============================================================

INSERT INTO project_statuses
(
    name,
    code,
    description,
    display_order,
    is_active
)
VALUES

(
    'Proposed',
    'PROPOSED',
    'Project proposed and under planning',
    1,
    TRUE
),

(
    'Approved',
    'APPROVED',
    'Project approved for execution',
    2,
    TRUE
),

(
    'Under Construction',
    'UNDER_CONSTRUCTION',
    'Project currently under construction',
    3,
    TRUE
),

(
    'Operational',
    'OPERATIONAL',
    'Project commissioned and operational',
    4,
    TRUE
),

(
    'Under Modernization',
    'UNDER_MODERNIZATION',
    'Project undergoing renovation or modernization',
    5,
    TRUE
),


(
    'On Hold',
    'ON_HOLD',
    'Project temporarily suspended',
    6,
    TRUE
),

(
    'Cancelled',
    'CANCELLED',
    'Project Cancelled, not moving forward',
    7,
    TRUE
)

ON CONFLICT (code)
DO UPDATE
SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    display_order = EXCLUDED.display_order,
    is_active = EXCLUDED.is_active;