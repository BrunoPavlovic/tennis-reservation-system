-- Korisnici
INSERT INTO users (user_id, first_name, last_name, email, password, role, credit_amount, created_at) VALUES
(1000, 'Ivan', 'Horvat', 'ivan.horvat@example.com', '$2a$10$yYVQo9mC.QB.Hh4/64bIDu.8vEZa8EvzK1OyJqV7eTxQLu2aXHkwe', 'USER', 120.0, '2025-07-21 09:00:00'),
(2000, 'Ana', 'Marić', 'ana.maric@example.com', '$2a$10$qW2ZrZKieHp8RcIfUuNd8uFYO/9iTfN2ocQOEPQ2SlZIlRFeuOMTe', 'USER', 300.0, '2025-07-20 15:30:00'),
(3000, 'Petra', 'Kovač', 'petra.kovac@example.com', '$2a$10$n7bR0CeRzDcbtlAbnxrbOeScdOQFfAf7khMEYe9.E2ZAP/WzKnNLu', 'USER', 85.0, '2025-07-19 08:45:00'),
(4000, 'Admin', 'Admin', 'admin@example.com', '$2a$10$z8YOZQfL/xfpDJRyN/XRbe5mDuUOjIvXZLxkqapZlybIurXpOC/Me', 'ADMIN', 500.0, '2025-07-18 12:00:00');

-- Klubovi
INSERT INTO club (club_id, name, credit_price, created_at) VALUES
(100, 'Teniski Klub Požega', 25.0, '2025-07-15 10:00:00'),
(200, 'Dalmacija Tennis Center', 18.0, '2025-07-18 12:30:00');

-- Članarine
INSERT INTO membership (membership_id, user_id, club_id) VALUES
(1000, 1000, 100),  -- Ivan u TK Požega
(2000, 2000, 100),  -- Ana u TK Požega
(3000, 3000, 200),  -- Petra u Dalmacija TC
(4000, 4000, 100);  -- Marko (admin) također u TK Požega

-- Tereni
INSERT INTO courts (name, club_id) VALUES
("Teren 1", 100),
("Teren Ivanišević", 100),
("Teren Australian OPEN", 100),
("Teren Rolland Garros", 200),
("Teren Test", 200);
