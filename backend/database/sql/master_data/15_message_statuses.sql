-- ============================================================
-- Master Data : Message Statuses
-- ============================================================

INSERT INTO message_statuses
(
    name,
    code,
    description,
    display_order,
    is_active
)
VALUES

(
    'New',
    'NEW',
    'Message received',
    1,
    TRUE
),

(
    'In Progress',
    'IN_PROGRESS',
    'Message under processing',
    2,
    TRUE
),

(
    'Resolved',
    'RESOLVED',
    'Issue resolved',
    3,
    TRUE
),

(
    'Closed',
    'CLOSED',
    'Conversation closed',
    4,
    TRUE
),

(
    'Spam',
    'SPAM',
    'Spam or irrelevant message',
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