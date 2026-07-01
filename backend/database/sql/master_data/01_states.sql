-- ============================================================
-- Master Data : States & Union Territories
-- ============================================================

INSERT INTO states
(
    name,
    code,
    description,
    display_order,
    is_active
)
VALUES

('Andhra Pradesh','AP','State',1,TRUE),
('Arunachal Pradesh','AR','State',2,TRUE),
('Assam','AS','State',3,TRUE),
('Bihar','BR','State',4,TRUE),
('Chhattisgarh','CG','State',5,TRUE),
('Goa','GA','State',6,TRUE),
('Gujarat','GJ','State',7,TRUE),
('Haryana','HR','State',8,TRUE),
('Himachal Pradesh','HP','State',9,TRUE),
('Jharkhand','JH','State',10,TRUE),
('Karnataka','KA','State',11,TRUE),
('Kerala','KL','State',12,TRUE),
('Madhya Pradesh','MP','State',13,TRUE),
('Maharashtra','MH','State',14,TRUE),
('Manipur','MN','State',15,TRUE),
('Meghalaya','ML','State',16,TRUE),
('Mizoram','MZ','State',17,TRUE),
('Nagaland','NL','State',18,TRUE),
('Odisha','OD','State',19,TRUE),
('Punjab','PB','State',20,TRUE),
('Rajasthan','RJ','State',21,TRUE),
('Sikkim','SK','State',22,TRUE),
('Tamil Nadu','TN','State',23,TRUE),
('Telangana','TS','State',24,TRUE),
('Tripura','TR','State',25,TRUE),
('Uttar Pradesh','UP','State',26,TRUE),
('Uttarakhand','UK','State',27,TRUE),
('West Bengal','WB','State',28,TRUE),

('Andaman and Nicobar Islands','AN','Union Territory',29,TRUE),
('Chandigarh','CH','Union Territory',30,TRUE),
('Dadra and Nagar Haveli and Daman and Diu','DH','Union Territory',31,TRUE),
('Delhi','DL','Union Territory',32,TRUE),
('Jammu and Kashmir','JK','Union Territory',33,TRUE),
('Ladakh','LA','Union Territory',34,TRUE),
('Lakshadweep','LD','Union Territory',35,TRUE),
('Puducherry','PY','Union Territory',36,TRUE)

ON CONFLICT (code)
DO UPDATE
SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    display_order = EXCLUDED.display_order,
    is_active = EXCLUDED.is_active;