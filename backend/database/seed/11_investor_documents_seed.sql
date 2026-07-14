-- ============================================================
-- NHPC Website
-- Investor Documents Seed Data
-- ============================================================

BEGIN;

INSERT INTO investor_documents
(
    title,
    investor_document_type_id,
    financial_year_id,
    description,
    media_file_id,
    published_at,
    display_order,
    is_active
)
VALUES

(
    'Annual Report 2025-26',
    (
        SELECT id
        FROM investor_document_types
        WHERE code = 'ANNUAL_REPORT'
    ),
    (
        SELECT id
        FROM financial_years
        WHERE label = '2025-26'
    ),
    'Annual Report for Financial Year 2025-26.',
    1,
    NOW() - INTERVAL '90 days',
    1,
    TRUE
),

(
    'Quarterly Financial Results - Q4 FY 2025-26',
    (
        SELECT id
        FROM investor_document_types
        WHERE code = 'QUARTERLY_RESULTS'
    ),
    (
        SELECT id
        FROM financial_years
        WHERE label = '2025-26'
    ),
    'Audited quarterly financial results for Q4 FY 2025-26.',
    2,
    NOW() - INTERVAL '60 days',
    2,
    TRUE
),

(
    'Standalone Financial Statements',
    (
        SELECT id
        FROM investor_document_types
        WHERE code = 'FINANCIAL_STATEMENT'
    ),
    (
        SELECT id
        FROM financial_years
        WHERE label = '2025-26'
    ),
    'Standalone Financial Statements for FY 2025-26.',
    3,
    NOW() - INTERVAL '55 days',
    3,
    TRUE
),

(
    'Corporate Governance Report',
    (
        SELECT id
        FROM investor_document_types
        WHERE code = 'CORPORATE_GOVERNANCE'
    ),
    (
        SELECT id
        FROM financial_years
        WHERE label = '2025-26'
    ),
    'Corporate Governance Report for FY 2025-26.',
    4,
    NOW() - INTERVAL '45 days',
    4,
    TRUE
)

ON CONFLICT DO NOTHING;

COMMIT;