-- ============================================================
-- Master Data : News Categories
-- ============================================================

INSERT INTO news_categories
(
    name,
    code,
    description,
    display_order,
    is_active
)
VALUES

(
    'Latest News',
    'LATEST_NEWS',
    'General company news and announcements',
    1,
    TRUE
),

(
    'Press Release',
    'PRESS_RELEASE',
    'Official press releases',
    2,
    TRUE
),

(
    'Awards & Recognition',
    'AWARDS',
    'Awards and recognitions received by NHPC',
    3,
    TRUE
),

(
    'Corporate Announcement',
    'CORPORATE',
    'Corporate announcements and updates',
    4,
    TRUE
),

(
    'Events',
    'EVENTS',
    'Events, conferences and public engagements',
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