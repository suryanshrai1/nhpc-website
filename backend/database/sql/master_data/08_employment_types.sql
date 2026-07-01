-- ============================================================
-- Master Data : Employment Types
-- ============================================================

INSERT INTO employment_types
(
    name,
    code,
    description,
    display_order,
    is_active
)
VALUES

(
    'Regular',
    'REGULAR',
    'Permanent employment',
    1,
    TRUE
),

(
    'Contract',
    'CONTRACT',
    'Contractual employment',
    2,
    TRUE
),

(
    'Apprenticeship',
    'APPRENTICESHIP',
    'Apprenticeship training',
    3,
    TRUE
),

(
    'Internship',
    'INTERNSHIP',
    'Internship opportunities',
    4,
    TRUE
),

(
    'Consultant',
    'CONSULTANT',
    'Consultant engagement',
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