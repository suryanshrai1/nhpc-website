-- ============================================================
-- NHPC Website
-- Homepage Seed Data
-- ============================================================

BEGIN;

-- ============================================================
-- HOMEPAGE SECTIONS
-- ============================================================

INSERT INTO homepage_sections
(
    section_key,
    title,
    subtitle,
    display_order,
    is_visible
)

VALUES

(
'hero',
'Hero',
'Powering Sustainable India',
1,
TRUE
),

(
'statistics',
'Statistics',
'Our Achievements',
2,
TRUE
),

(
'featured_projects',
'Featured Projects',
'Major Projects Across India',
3,
TRUE
),

(
'latest_news',
'Latest News',
'Recent Updates',
4,
TRUE
),

(
'sustainability',
'Sustainability',
'Building A Greener Future',
5,
TRUE
),

(
'investor_highlights',
'Investor Highlights',
'Financial Performance',
6,
TRUE
),

(
'operational_stations',
'Operational Stations',
'Power Stations Across India',
7,
TRUE
)

ON CONFLICT (section_key)

DO UPDATE SET

title = EXCLUDED.title,
subtitle = EXCLUDED.subtitle,
display_order = EXCLUDED.display_order,
is_visible = EXCLUDED.is_visible;

---------------------------------------------------------------
-- HERO CONTENT
---------------------------------------------------------------

INSERT INTO homepage_content
(
section_id,
content_key,
content_value
)

VALUES

(
(
SELECT id
FROM homepage_sections
WHERE section_key='hero'
),
'hero_title',
'Powering Sustainable India'
),

(
(
SELECT id
FROM homepage_sections
WHERE section_key='hero'
),
'hero_subtitle',
'India''s Leading Hydropower Company Driving Clean Energy Growth.'
),

(
(
SELECT id
FROM homepage_sections
WHERE section_key='hero'
),
'hero_description',
'NHPC Limited is committed to delivering sustainable, reliable and affordable power through hydropower, solar and renewable energy projects across the country.'
),

(
(
SELECT id
FROM homepage_sections
WHERE section_key='hero'
),
'hero_badge',
'50+ Years of Excellence'
),

(
(
SELECT id
FROM homepage_sections
WHERE section_key='hero'
),
'hero_primary_cta',
'Explore Projects'
),

(
(
SELECT id
FROM homepage_sections
WHERE section_key='hero'
),
'hero_secondary_cta',
'Investor Relations'
),

(
(
SELECT id
FROM homepage_sections
WHERE section_key='hero'
),
'hero_image',
NULL
),

(
(
SELECT id
FROM homepage_sections
WHERE section_key='hero'
),
'hero_video',
NULL
)

ON CONFLICT
(section_id,content_key)

DO UPDATE SET

content_value = EXCLUDED.content_value;

---------------------------------------------------------------
-- HERO BUTTONS
---------------------------------------------------------------

INSERT INTO hero_buttons
(
section_id,
label,
url,
button_style,
display_order,
is_active
)

VALUES

(
(
SELECT id
FROM homepage_sections
WHERE section_key='hero'
),

'Explore Projects',

'/projects',

'primary',

1,

TRUE
),

(
(
SELECT id
FROM homepage_sections
WHERE section_key='hero'
),

'Investor Relations',

'/investors',

'secondary',

2,

TRUE
)

ON CONFLICT
(section_id,display_order)

DO UPDATE SET

label = EXCLUDED.label,

url = EXCLUDED.url,

button_style = EXCLUDED.button_style,

is_active = EXCLUDED.is_active;

COMMIT;