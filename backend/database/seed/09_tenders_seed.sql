-- ============================================================
-- NHPC Website
-- Tenders Seed Data
-- ============================================================

BEGIN;

INSERT INTO tenders
(
    title,
    tender_number,
    slug,
    tender_category_id,
    tender_status_id,
    summary,
    description,
    published_at,
    opening_date,
    closing_date,
    display_order,
    is_active
)
VALUES

(
    'Construction of 220 kV Transmission Line for Dibang Multipurpose Project',
    'NHPC/TND/2026/001',
    'construction-of-220kv-transmission-line-dibang',
    (
        SELECT id
        FROM tender_categories
        WHERE code = 'WORKS'
    ),
    (
        SELECT id
        FROM tender_statuses
        WHERE code = 'OPEN'
    ),
    'Tender for construction of a 220 kV transmission line associated with the Dibang Multipurpose Project.',
    'NHPC invites bids from eligible contractors for the design, supply, construction, testing and commissioning of the 220 kV transmission line for the Dibang Multipurpose Project.',
    NOW() - INTERVAL '7 days',
    CURRENT_DATE,
    CURRENT_DATE + INTERVAL '30 days',
    1,
    TRUE
),

(
    'Supply of Hydromechanical Equipment',
    'NHPC/TND/2026/002',
    'supply-of-hydromechanical-equipment',
    (
        SELECT id
        FROM tender_categories
        WHERE code = 'GOODS'
    ),
    (
        SELECT id
        FROM tender_statuses
        WHERE code = 'OPEN'
    ),
    'Procurement of hydromechanical equipment for NHPC hydroelectric projects.',
    'Invitation for supply of gates, hoists, penstocks and associated hydromechanical equipment for NHPC power stations.',
    NOW() - INTERVAL '10 days',
    CURRENT_DATE - INTERVAL '2 days',
    CURRENT_DATE + INTERVAL '20 days',
    2,
    TRUE
),

(
    'Consultancy Services for Environmental Impact Assessment',
    'NHPC/TND/2026/003',
    'consultancy-services-environmental-impact-assessment',
    (
        SELECT id
        FROM tender_categories
        WHERE code = 'SERVICES'
    ),
    (
        SELECT id
        FROM tender_statuses
        WHERE code = 'OPEN'
    ),
    'Consultancy services for conducting Environmental Impact Assessment.',
    'Selection of a consulting agency for Environmental Impact Assessment studies and preparation of statutory reports for upcoming renewable energy projects.',
    NOW() - INTERVAL '15 days',
    CURRENT_DATE - INTERVAL '5 days',
    CURRENT_DATE + INTERVAL '15 days',
    3,
    TRUE
),

(
    'Annual Maintenance Contract for Power Station IT Infrastructure',
    'NHPC/TND/2026/004',
    'annual-maintenance-contract-it-infrastructure',
    (
        SELECT id
        FROM tender_categories
        WHERE code = 'SERVICES'
    ),
    (
        SELECT id
        FROM tender_statuses
        WHERE code = 'CLOSED'
    ),
    'Annual Maintenance Contract for IT infrastructure across NHPC power stations.',
    'Maintenance of servers, networking equipment, workstations and associated IT infrastructure across NHPC facilities.',
    NOW() - INTERVAL '60 days',
    CURRENT_DATE - INTERVAL '55 days',
    CURRENT_DATE - INTERVAL '25 days',
    4,
    TRUE
)

ON CONFLICT (slug)

DO UPDATE SET

title = EXCLUDED.title,

tender_number = EXCLUDED.tender_number,

tender_category_id = EXCLUDED.tender_category_id,

tender_status_id = EXCLUDED.tender_status_id,

summary = EXCLUDED.summary,

description = EXCLUDED.description,

published_at = EXCLUDED.published_at,

opening_date = EXCLUDED.opening_date,

closing_date = EXCLUDED.closing_date,

display_order = EXCLUDED.display_order,

is_active = EXCLUDED.is_active,

updated_at = NOW();

COMMIT;