-- Korisnici
INSERT INTO users (user_id, first_name, last_name, email, password, role, credit_amount, created_at, active) VALUES
(1000, 'Ivan', 'Horvat', 'ivan.horvat@example.com', '$2b$10$TLpopfy4btXXciD/CoC33Oo9bd1zP4C3t0KitkXg/cs8UDPiUKvhm', 'USER', 120.0, '2025-07-21 09:00:00', true),
(2000, 'Ana', 'Marić', 'ana.maric@example.com', '$2b$10$TLpopfy4btXXciD/CoC33Oo9bd1zP4C3t0KitkXg/cs8UDPiUKvhm', 'USER', 300.0, '2025-07-20 15:30:00', true),
(3000, 'Petra', 'Kovač', 'petra.kovac@example.com', '$2b$10$TLpopfy4btXXciD/CoC33Oo9bd1zP4C3t0KitkXg/cs8UDPiUKvhm', 'USER', 85.0, '2025-07-19 08:45:00', true),
(4000, 'Admin', 'Admin', 'admin@example.com', '$2b$10$TLpopfy4btXXciD/CoC33Oo9bd1zP4C3t0KitkXg/cs8UDPiUKvhm', 'ADMIN', 500.0, '2025-07-18 12:00:00', true);

-- Klubovi
INSERT INTO club (club_id, name, credit_price, created_at) VALUES
(100, 'Teniski Klub Pozega', 2.0, '2025-07-15 10:00:00'),
(200, 'Teniski Klub Zagreb', 7.0, '2025-07-18 12:30:00');

-- Članarine
INSERT INTO membership (membership_id, user_id, club_id) VALUES
(1000, 1000, 100),  -- Ivan u TK Požega
(2000, 2000, 100),  -- Ana u TK Požega
(3000, 3000, 200),  -- Petra u Dalmacija TC
(4000, 4000, 100);  -- Marko (admin) također u TK Požega

-- Tereni
INSERT INTO court (name, club_id) VALUES
('Teren 1', 100),
('Teren Ivanišević', 100),
('Teren Australian OPEN', 100),
('Teren Rolland Garros', 200),
('Teren Test', 200);
