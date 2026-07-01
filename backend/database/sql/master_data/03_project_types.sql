-- ============================================================
-- Master Data : Project Types i.e energy_types
-- ============================================================

INSERT INTO project_types
(
    name,
    code,
    description,
    display_order,
    is_active
)
VALUES

(
    'Hydroelectric',
    'HYDRO',
    'Hydroelectric Power Projects',
    1,
    TRUE
),

(
    'Solar',
    'SOLAR',
    'Solar Power Projects',
    2,
    TRUE
),

(
    'Wind',
    'WIND',
    'Wind Power Projects',
    3,
    TRUE
),

(
    'Pumped Storage',
    'PUMPED_STORAGE',
    'Pumped Storage Hydroelectric Projects',
    4,
    TRUE
),

(
    'Hybrid Renewable',
    'HYBRID',
    'Hybrid Renewable Energy Projects',
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