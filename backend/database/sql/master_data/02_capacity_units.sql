-- ============================================================
-- Master Data : Capacity Units
-- ============================================================

INSERT INTO capacity_units
(
    name,
    code,
    description,
    display_order,
    is_active
)
VALUES

('Kilowatt',  'KW', 'Kilowatt', 1, TRUE),
('Megawatt',  'MW', 'Megawatt', 2, TRUE),
('Gigawatt',  'GW', 'Gigawatt', 3, TRUE)

ON CONFLICT (code)
DO UPDATE
SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    display_order = EXCLUDED.display_order,
    is_active = EXCLUDED.is_active;