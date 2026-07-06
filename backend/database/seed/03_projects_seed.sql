-- ============================================================
-- NHPC Website
-- Featured Projects Seed Data
-- ============================================================

BEGIN;

INSERT INTO projects
(
    name,
    slug,
    state_id,
    project_type_id,
    project_status_id,
    capacity,
    capacity_unit_id,
    summary,
    latitude,
    longitude,
    is_featured,
    display_order,
    is_active
)

VALUES

(
'Subansiri Lower Hydro Electric Project',
'subansiri-lower-hydro-electric-project',
3,
1,
3,
2000.00,
2,
'One of India''s largest hydroelectric projects under construction on the Subansiri River.',
27.5160,
94.0500,
TRUE,
1,
TRUE
),

(
'Parbati-II Hydro Electric Project',
'parbati-ii-hydro-electric-project',
10,
1,
3,
800.00,
2,
'Run-of-the-river hydroelectric project in Himachal Pradesh.',
31.8500,
77.2000,
TRUE,
2,
TRUE
),

(
'Teesta-V Power Station',
'teesta-v-power-station',
23,
1,
4,
510.00,
2,
'Operational hydropower station located in Sikkim.',
27.5500,
88.5500,
TRUE,
3,
TRUE
),

(
'Kishanganga Hydroelectric Project',
'kishanganga-hydroelectric-project',
34,
1,
4,
330.00,
2,
'Strategic hydroelectric project in Jammu & Kashmir.',
34.4500,
74.6500,
TRUE,
4,
TRUE
),

(
'Chamera-I Power Station',
'chamera-i-power-station',
10,
1,
4,
540.00,
2,
'One of NHPC''s earliest major hydropower stations.',
32.5500,
76.1500,
TRUE,
5,
TRUE
),

(
'Dibang Multipurpose Project',
'dibang-multipurpose-project',
3,
1,
2,
2880.00,
2,
'Proposed multipurpose hydroelectric project in Arunachal Pradesh.',
28.6500,
95.9000,
TRUE,
6,
TRUE
)

ON CONFLICT (slug)

DO UPDATE SET

state_id = EXCLUDED.state_id,
project_type_id = EXCLUDED.project_type_id,
project_status_id = EXCLUDED.project_status_id,
capacity = EXCLUDED.capacity,
capacity_unit_id = EXCLUDED.capacity_unit_id,
summary = EXCLUDED.summary,
latitude = EXCLUDED.latitude,
longitude = EXCLUDED.longitude,
is_featured = EXCLUDED.is_featured,
display_order = EXCLUDED.display_order,
is_active = EXCLUDED.is_active;

COMMIT;