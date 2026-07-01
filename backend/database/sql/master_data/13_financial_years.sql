-- ============================================================
-- Master Data : Financial Years
-- ============================================================

INSERT INTO financial_years
(
    label,
    start_year,
    end_year,
    display_order,
    is_active
)
VALUES

('2022-23',2022,2023,1,TRUE),
('2023-24',2023,2024,2,TRUE),
('2024-25',2024,2025,3,TRUE),
('2025-26',2025,2026,4,TRUE),
('2026-27',2026,2027,5,TRUE)

ON CONFLICT (label)
DO UPDATE
SET
    start_year = EXCLUDED.start_year,
    end_year = EXCLUDED.end_year,
    display_order = EXCLUDED.display_order,
    is_active = EXCLUDED.is_active;