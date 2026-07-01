-- ============================================================
-- Master Data : Sustainability Types
-- ============================================================

INSERT INTO sustainability_types
(
    name,
    code,
    description,
    display_order,
    is_active
)
VALUES

(
    'Environment',
    'ENVIRONMENT',
    'Environmental sustainability initiatives',
    1,
    TRUE
),

(
    'Corporate Social Responsibility',
    'CSR',
    'CSR initiatives and programmes',
    2,
    TRUE
),

(
    'Renewable Energy',
    'RENEWABLE_ENERGY',
    'Renewable energy initiatives',
    3,
    TRUE
),

(
    'Community Development',
    'COMMUNITY_DEVELOPMENT',
    'Community welfare programmes',
    4,
    TRUE
),

(
    'Biodiversity',
    'BIODIVERSITY',
    'Biodiversity conservation initiatives',
    5,
    TRUE
)

ON CONFLICT (code)
DO UPDATE
SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    display_order = EXCLUDED.display_order,
    is_active = EXCLUDED.is_active;