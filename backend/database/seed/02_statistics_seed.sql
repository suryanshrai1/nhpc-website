-- ============================================================
-- NHPC Website
-- Statistics Seed Data
-- ============================================================

BEGIN;

INSERT INTO statistics
(
    label,
    value,
    icon,
    display_order,
    is_active
)

VALUES

(
'Installed Capacity',
'7144 MW',
'Zap',
1,
TRUE
),

(
'Power Stations',
'24',
'Factory',
2,
TRUE
),

(
'Renewable Projects',
'50+',
'Leaf',
3,
TRUE
),

(
'Years of Excellence',
'50+',
'Award',
4,
TRUE
)

ON CONFLICT (display_order)

DO UPDATE SET

label = EXCLUDED.label,
value = EXCLUDED.value,
icon = EXCLUDED.icon,
is_active = EXCLUDED.is_active;

COMMIT;