-- ============================================================
-- NHPC Website
-- Operational Stations Seed Data
-- ============================================================

BEGIN;

INSERT INTO operational_power_stations
(
    name,
    slug,
    state_id,
    project_type_id,
    installed_capacity,
    capacity_unit_id,
    commissioned_on,
    latitude,
    longitude,
    description,
    is_featured,
    display_order,
    is_active
)

VALUES

(
'Teesta-V Power Station',
'teesta-v-power-station',
23,
1,
510.00,
2,
'2008-05-01',
27.5500,
88.5500,
'510 MW Hydroelectric Power Station located in Sikkim.',
TRUE,
1,
TRUE
),

(
'Chamera-I Power Station',
'chamera-i-power-station',
10,
1,
540.00,
2,
'1994-01-01',
32.5500,
76.1500,
'Hydroelectric station situated in Himachal Pradesh.',
TRUE,
2,
TRUE
),

(
'Kishanganga Power Station',
'kishanganga-power-station',
34,
1,
330.00,
2,
'2018-05-19',
34.4500,
74.6500,
'Strategic hydropower project in Jammu & Kashmir.',
TRUE,
3,
TRUE
)

ON CONFLICT (slug)

DO UPDATE SET

state_id = EXCLUDED.state_id,
project_type_id = EXCLUDED.project_type_id,
installed_capacity = EXCLUDED.installed_capacity,
capacity_unit_id = EXCLUDED.capacity_unit_id,
commissioned_on = EXCLUDED.commissioned_on,
latitude = EXCLUDED.latitude,
longitude = EXCLUDED.longitude,
description = EXCLUDED.description,
is_featured = EXCLUDED.is_featured,
display_order = EXCLUDED.display_order,
is_active = EXCLUDED.is_active;

COMMIT;