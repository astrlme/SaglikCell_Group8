INSERT INTO health_metrics (user_id, metric_type, value, recorded_date)
SELECT 
    u.id,
    m.metric_type::metric_type,
    CASE 
        WHEN m.metric_type = 'STEPS' THEN 5000 + floor(random() * 8000)
        WHEN m.metric_type = 'WATER' THEN 1500 + floor(random() * 1500)
        WHEN m.metric_type = 'SLEEP' THEN 6 + round((random() * 3)::numeric, 1)
        WHEN m.metric_type = 'WEIGHT' THEN 70 + round((random() * 4)::numeric, 1)
        WHEN m.metric_type = 'HEART_RATE' THEN 60 + floor(random() * 35)
        WHEN m.metric_type = 'CALORIES' THEN 1600 + floor(random() * 900)
    END,
    CURRENT_DATE - d.day
FROM users u
CROSS JOIN generate_series(0, 29) AS d(day)
CROSS JOIN (
    VALUES 
    ('STEPS'),
    ('WATER'),
    ('SLEEP'),
    ('WEIGHT'),
    ('HEART_RATE'),
    ('CALORIES')
) AS m(metric_type)
WHERE u.role != 'ADMIN';