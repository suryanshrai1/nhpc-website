-- ============================================================
-- NHPC Website
-- Leadership Seed Data
-- ============================================================

BEGIN;

INSERT INTO leadership
(
    full_name,
    slug,
    leadership_level_id,
    designation,
    qualification,
    experience_summary,
    description,
    email,
    phone,
    display_order,
    is_active
)
VALUES

(
    'Shri Raj Kumar Chaudhary',
    'raj-kumar-chaudhary',
    (
        SELECT id
        FROM leadership_levels
        WHERE code = 'BOARD'
    ),
    'Chairman & Managing Director',
    'B.Tech (Electrical Engineering)',
    'Over 30 years of experience in the Indian power sector.',
    'Leads NHPC''s strategic vision, hydropower expansion, renewable energy initiatives and corporate growth.',
    'cmd@nhpc.nic.in',
    '+91-11-26701111',
    1,
    TRUE
),

(
    'Shri Sanjay Kumar Singh',
    'sanjay-kumar-singh',
    (
        SELECT id
        FROM leadership_levels
        WHERE code = 'EXECUTIVE'
    ),
    'Director (Technical)',
    'B.Tech (Civil Engineering)',
    'Extensive experience in hydroelectric project planning, construction and execution.',
    'Responsible for engineering, construction, commissioning and technical operations across NHPC projects.',
    'technical@nhpc.nic.in',
    '+91-11-26702222',
    2,
    TRUE
),

(
    'Shri Rajendra Prasad Goyal',
    'rajendra-prasad-goyal',
    (
        SELECT id
        FROM leadership_levels
        WHERE code = 'EXECUTIVE'
    ),
    'Director (Finance)',
    'Chartered Accountant',
    'More than 25 years of experience in finance, budgeting and corporate management.',
    'Responsible for financial planning, budgeting, investor relations and corporate finance.',
    'finance@nhpc.nic.in',
    '+91-11-26703333',
    3,
    TRUE
),

(
    'Shri Vivek Kumar',
    'vivek-kumar',
    (
        SELECT id
        FROM leadership_levels
        WHERE code = 'SENIOR_MANAGEMENT'
    ),
    'Executive Director (Projects)',
    'M.Tech (Hydropower Engineering)',
    'Specialist in execution and monitoring of hydroelectric projects.',
    'Oversees project implementation, quality assurance and operational excellence.',
    'projects@nhpc.nic.in',
    '+91-11-26704444',
    4,
    TRUE
)

ON CONFLICT (slug)

DO UPDATE SET

leadership_level_id = EXCLUDED.leadership_level_id,

designation = EXCLUDED.designation,

qualification = EXCLUDED.qualification,

experience_summary = EXCLUDED.experience_summary,

description = EXCLUDED.description,

email = EXCLUDED.email,

phone = EXCLUDED.phone,

display_order = EXCLUDED.display_order,

is_active = EXCLUDED.is_active,

updated_at = NOW();

COMMIT;