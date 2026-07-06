-- ============================================================
-- NHPC Website
-- Investor Highlights Seed Data
-- ============================================================

BEGIN;

WITH latest_financial_year AS (

    SELECT id
    FROM financial_years
    ORDER BY end_year DESC
    LIMIT 1

)

INSERT INTO investor_highlights
(
    financial_year_id,
    metric_name,
    metric_value,
    unit,
    display_order
)

SELECT
    latest_financial_year.id,
    data.metric_name,
    data.metric_value,
    data.unit,
    data.display_order

FROM latest_financial_year

CROSS JOIN
(
    VALUES
        ('Revenue', '11850', '₹ Cr', 1),
        ('Net Profit', '3850', '₹ Cr', 2),
        ('Installed Capacity', '7144', 'MW', 3),
        ('Power Stations', '24', NULL, 4)
) AS data(metric_name, metric_value, unit, display_order)

ON CONFLICT
(financial_year_id, metric_name)

DO UPDATE SET

metric_value = EXCLUDED.metric_value,
unit = EXCLUDED.unit,
display_order = EXCLUDED.display_order;

COMMIT;