-- ============================================================
-- Master Data : Tender Statuses
-- ============================================================

INSERT INTO tender_statuses
(
    name,
    code,
    description,
    display_order,
    is_active
)
VALUES

(
    'Upcoming',
    'UPCOMING',
    'Tender not yet open',
    1,
    TRUE
),

(
    'Open',
    'OPEN',
    'Tender currently accepting bids',
    2,
    TRUE
),

(
    'Under Evaluation',
    'UNDER_EVALUATION',
    'Tender under technical or financial evaluation',
    3,
    TRUE
),

(
    'Awarded',
    'AWARDED',
    'Tender awarded to successful bidder',
    4,
    TRUE
),

(
    'Closed',
    'CLOSED',
    'Tender closed',
    5,
    TRUE
),

(
    'Cancelled',
    'CANCELLED',
    'Tender cancelled',
    6,
    TRUE
)

ON CONFLICT (code)
DO UPDATE
SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    display_order = EXCLUDED.display_order,
    is_active = EXCLUDED.is_active;