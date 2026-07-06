-- ============================================================
-- NHPC Website
-- Sustainability Seed Data
-- ============================================================

BEGIN;

INSERT INTO sustainability
(
    title,
    slug,
    sustainability_type_id,
    summary,
    description,
    published_at,
    is_featured,
    display_order,
    is_active
)

VALUES

(
'Green Energy Expansion',
'green-energy-expansion',
3,
'Accelerating renewable energy generation across India.',
'NHPC continues to expand its renewable energy portfolio through hydropower, floating solar and hybrid renewable energy initiatives.',
'2026-06-15 10:00:00+05:30',
TRUE,
1,
TRUE
),

(
'Community Development Initiatives',
'community-development-initiatives',
4,
'Supporting education, healthcare and rural development.',
'NHPC actively contributes towards community welfare through CSR initiatives focused on education, healthcare, sanitation and livelihood development.',
'2026-06-10 10:00:00+05:30',
TRUE,
2,
TRUE
),

(
'Biodiversity Conservation',
'biodiversity-conservation',
5,
'Protecting ecological diversity around project locations.',
'NHPC undertakes biodiversity conservation programs including afforestation, habitat restoration and wildlife monitoring.',
'2026-06-05 10:00:00+05:30',
TRUE,
3,
TRUE
)

ON CONFLICT (slug)

DO UPDATE SET

title = EXCLUDED.title,
sustainability_type_id = EXCLUDED.sustainability_type_id,
summary = EXCLUDED.summary,
description = EXCLUDED.description,
published_at = EXCLUDED.published_at,
is_featured = EXCLUDED.is_featured,
display_order = EXCLUDED.display_order,
is_active = EXCLUDED.is_active;

COMMIT;