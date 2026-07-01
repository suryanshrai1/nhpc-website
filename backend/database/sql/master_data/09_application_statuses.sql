-- ============================================================
-- Master Data : Application Statuses
-- ============================================================

INSERT INTO application_statuses
(
    name,
    code,
    description,
    display_order,
    is_active
)
VALUES

(
    'Submitted',
    'SUBMITTED',
    'Application submitted successfully',
    1,
    TRUE
),

(
    'Under Review',
    'UNDER_REVIEW',
    'Application under review',
    2,
    TRUE
),

(
    'Shortlisted',
    'SHORTLISTED',
    'Candidate shortlisted',
    3,
    TRUE
),

(
    'Interview Scheduled',
    'INTERVIEW_SCHEDULED',
    'Interview has been scheduled',
    4,
    TRUE
),

(
    'Selected',
    'SELECTED',
    'Candidate selected',
    5,
    TRUE
),

(
    'Rejected',
    'REJECTED',
    'Application rejected',
    6,
    TRUE
),

(
    'Withdrawn',
    'WITHDRAWN',
    'Application withdrawn by candidate',
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