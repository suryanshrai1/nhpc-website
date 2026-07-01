-- ============================================================
-- Master Data : Investor Document Types
-- ============================================================

INSERT INTO investor_document_types
(
    name,
    code,
    description,
    display_order,
    is_active
)
VALUES

(
    'Annual Report',
    'ANNUAL_REPORT',
    'Annual reports',
    1,
    TRUE
),

(
    'Quarterly Results',
    'QUARTERLY_RESULTS',
    'Quarterly financial results',
    2,
    TRUE
),

(
    'Financial Statement',
    'FINANCIAL_STATEMENT',
    'Financial statements',
    3,
    TRUE
),

(
    'Corporate Governance',
    'CORPORATE_GOVERNANCE',
    'Corporate governance reports',
    4,
    TRUE
),

(
    'Shareholding Pattern',
    'SHAREHOLDING_PATTERN',
    'Shareholding disclosures',
    5,
    TRUE
),

(
    'Notice',
    'NOTICE',
    'Board, AGM and EGM notices',
    6,
    TRUE
),

(
    'Presentation',
    'PRESENTATION',
    'Investor presentations',
    7,
    TRUE
)

ON CONFLICT (code)
DO UPDATE
SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    display_order = EXCLUDED.display_order,
    is_active = EXCLUDED.is_active;