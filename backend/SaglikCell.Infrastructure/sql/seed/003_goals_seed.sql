INSERT INTO goals (user_id, metric_type, target_value, period, current_streak, status)
SELECT id, 'STEPS', 10000, 'DAILY', 3, 'ACTIVE'
FROM users WHERE gsm = '5321112233';

INSERT INTO goals (user_id, metric_type, target_value, period, current_streak, status)
SELECT id, 'WATER', 2500, 'DAILY', 5, 'ACTIVE'
FROM users WHERE gsm = '5322223344';

INSERT INTO goals (user_id, metric_type, target_value, period, current_streak, status)
SELECT id, 'SLEEP', 8, 'DAILY', 2, 'ACTIVE'
FROM users WHERE gsm = '5322223344';

INSERT INTO goals (user_id, metric_type, target_value, period, current_streak, status)
SELECT id, 'CALORIES', 2200, 'DAILY', 1, 'ACTIVE'
FROM users WHERE gsm = '5321112233';

INSERT INTO goals (user_id, metric_type, target_value, period, current_streak, status)
SELECT id, 'HEART_RATE', 80, 'DAILY', 7, 'ACTIVE'
FROM users WHERE gsm = '5322223344';