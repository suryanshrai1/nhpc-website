-- ============================================================
-- NHPC Website
-- Latest News Seed Data
-- ============================================================

BEGIN;

INSERT INTO news
(
    title,
    slug,
    news_category_id,
    summary,
    content,
    published_at,
    is_featured,
    display_order,
    is_active
)

VALUES

(
'NHPC Strengthens Renewable Energy Portfolio',
'nhpc-strengthens-renewable-energy-portfolio',
2,
'NHPC expands its renewable energy initiatives with new hydro and solar developments.',
'NHPC Limited continues to strengthen its renewable energy portfolio through strategic investments in hydropower and solar projects across India.',
NOW() - INTERVAL '2 days',
TRUE,
1,
TRUE
),

(
'NHPC Signs New Green Energy Partnership',
'nhpc-signs-green-energy-partnership',
4,
'Strategic collaboration to accelerate clean energy generation.',
'The partnership focuses on sustainable power generation, grid modernization and renewable energy expansion.',
NOW() - INTERVAL '5 days',
TRUE,
2,
TRUE
),

(
'NHPC Receives National Excellence Award',
'nhpc-receives-national-excellence-award',
3,
'Recognition for excellence in hydropower development and sustainability.',
'NHPC has been recognised for its contribution towards clean energy and environmental sustainability.',
NOW() - INTERVAL '10 days',
TRUE,
3,
TRUE
),

(
'NHPC Announces Capacity Expansion Plan',
'nhpc-announces-capacity-expansion-plan',
1,
'Upcoming projects will significantly increase installed capacity.',
'The expansion roadmap includes several hydroelectric and renewable energy projects scheduled over the coming years.',
NOW() - INTERVAL '15 days',
TRUE,
4,
TRUE
)

ON CONFLICT (slug)

DO UPDATE SET

title = EXCLUDED.title,
news_category_id = EXCLUDED.news_category_id,
summary = EXCLUDED.summary,
content = EXCLUDED.content,
published_at = EXCLUDED.published_at,
is_featured = EXCLUDED.is_featured,
display_order = EXCLUDED.display_order,
is_active = EXCLUDED.is_active;

COMMIT;