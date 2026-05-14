INSERT INTO users (gsm, role, is_verified)
VALUES 
('5321112233', 'FREE', true),
('5322223344', 'PREMIUM', true),
('5323334455', 'ADMIN', true);

INSERT INTO profiles (user_id, full_name, birth_date, gender, height_cm, weight_kg)
SELECT id, 'Ali Sağlıklı', '2000-05-10', 'MALE', 178, 74
FROM users WHERE gsm = '5321112233';

INSERT INTO profiles (user_id, full_name, birth_date, gender, height_cm, weight_kg)
SELECT id, 'Ayşe Fit', '1998-03-20', 'FEMALE', 165, 58
FROM users WHERE gsm = '5322223344';

INSERT INTO profiles (user_id, full_name, birth_date, gender, height_cm, weight_kg)
SELECT id, 'Admin Kullanıcı', '1995-01-01', 'OTHER', 170, 70
FROM users WHERE gsm = '5323334455';
