-- ============================================================
-- NHPC Website
-- Careers Seed Data
-- ============================================================

BEGIN;

INSERT INTO job_openings
(
    title,
    slug,
    employment_type_id,
    location,
    vacancies,
    summary,
    description,
    published_at,
    application_deadline,
    display_order,
    is_active
)
VALUES

(
    'Graduate Engineer Trainee (Civil)',
    'graduate-engineer-trainee-civil',
    (
        SELECT id
        FROM employment_types
        WHERE code = 'REGULAR'
    ),
    'Faridabad, Haryana',
    25,
    'Recruitment of Graduate Engineer Trainees in Civil Engineering.',
    'NHPC invites applications from eligible Civil Engineering graduates for the position of Graduate Engineer Trainee. Candidates should possess a valid GATE score and meet the eligibility criteria specified in the detailed advertisement.',
    NOW() - INTERVAL '5 days',
    CURRENT_DATE + INTERVAL '30 days',
    1,
    TRUE
),

(
    'Graduate Engineer Trainee (Electrical)',
    'graduate-engineer-trainee-electrical',
    (
        SELECT id
        FROM employment_types
        WHERE code = 'REGULAR'
    ),
    'Faridabad, Haryana',
    20,
    'Recruitment of Graduate Engineer Trainees in Electrical Engineering.',
    'Applications are invited from Electrical Engineering graduates for appointment as Graduate Engineer Trainee across NHPC projects and offices.',
    NOW() - INTERVAL '4 days',
    CURRENT_DATE + INTERVAL '28 days',
    2,
    TRUE
),

(
    'Senior Manager (Finance)',
    'senior-manager-finance',
    (
        SELECT id
        FROM employment_types
        WHERE code = 'REGULAR'
    ),
    'New Delhi',
    4,
    'Recruitment of experienced finance professionals.',
    'NHPC is seeking experienced Chartered Accountants and Finance professionals for Senior Manager positions to strengthen its corporate finance and investor relations functions.',
    NOW() - INTERVAL '8 days',
    CURRENT_DATE + INTERVAL '20 days',
    3,
    TRUE
),

(
    'IT Consultant',
    'it-consultant',
    (
        SELECT id
        FROM employment_types
        WHERE code = 'CONSULTANT'
    ),
    'Faridabad, Haryana',
    2,
    'Hiring experienced IT consultants for digital transformation initiatives.',
    'Short-term consultancy engagement for experienced IT professionals specializing in enterprise applications, cybersecurity and cloud infrastructure.',
    NOW() - INTERVAL '2 days',
    CURRENT_DATE + INTERVAL '15 days',
    4,
    TRUE
),

(
    'Graduate Apprentice (Mechanical)',
    'graduate-apprentice-mechanical',
    (
        SELECT id
        FROM employment_types
        WHERE code = 'APPRENTICESHIP'
    ),
    'Teesta-V Power Station, Sikkim',
    10,
    'One-year apprenticeship for Mechanical Engineering graduates.',
    'NHPC invites applications under the Apprentices Act for Graduate Apprentices in Mechanical Engineering at various project locations.',
    NOW() - INTERVAL '1 day',
    CURRENT_DATE + INTERVAL '25 days',
    5,
    TRUE
)

ON CONFLICT (slug)

DO UPDATE SET

title = EXCLUDED.title,

employment_type_id = EXCLUDED.employment_type_id,

location = EXCLUDED.location,

vacancies = EXCLUDED.vacancies,

summary = EXCLUDED.summary,

description = EXCLUDED.description,

published_at = EXCLUDED.published_at,

application_deadline = EXCLUDED.application_deadline,

display_order = EXCLUDED.display_order,

is_active = EXCLUDED.is_active,

updated_at = NOW();

COMMIT;