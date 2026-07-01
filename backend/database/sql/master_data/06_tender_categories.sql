-- ============================================================
-- Master Data : Tender Categories
-- ============================================================

INSERT INTO tender_categories
(
    name,
    code,
    description,
    display_order,
    is_active
)
VALUES

(
    'Works',
    'WORKS',
    'Construction and civil works',
    1,
    TRUE
),

(
    'Goods',
    'GOODS',
    'Supply of goods and equipment',
    2,
    TRUE
),

(
    'Services',
    'SERVICES',
    'Consultancy and professional services',
    3,
    TRUE
),

(
    'EPC',
    'EPC',
    'Engineering, Procurement and Construction',
    4,
    TRUE
),

(
    'Expression of Interest',
    'EOI',
    'Expression of Interest',
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