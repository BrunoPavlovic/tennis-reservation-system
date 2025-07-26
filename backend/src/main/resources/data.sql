-- Korisnici
INSERT INTO USERS (user_id, first_name, last_name, email, password, role, credit_amount, created_at) VALUES
(1, 'Ivan', 'Horvat', 'ivan.horvat@example.com', '$2a$10$yYVQo9mC.QB.Hh4/64bIDu.8vEZa8EvzK1OyJqV7eTxQLu2aXHkwe', 'USER', 120.0, '2025-07-21 09:00:00'),
(2, 'Ana', 'Marić', 'ana.maric@example.com', '$2a$10$qW2ZrZKieHp8RcIfUuNd8uFYO/9iTfN2ocQOEPQ2SlZIlRFeuOMTe', 'USER', 300.0, '2025-07-20 15:30:00'),
(3, 'Petra', 'Kovač', 'petra.kovac@example.com', '$2a$10$n7bR0CeRzDcbtlAbnxrbOeScdOQFfAf7khMEYe9.E2ZAP/WzKnNLu', 'USER', 85.0, '2025-07-19 08:45:00'),
(4, 'Admin', 'Admin', 'admin@example.com', '$2a$10$z8YOZQfL/xfpDJRyN/XRbe5mDuUOjIvXZLxkqapZlybIurXpOC/Me', 'ADMIN', 500.0, '2025-07-18 12:00:00');

-- Klubovi
INSERT INTO CLUB (club_id, club_name, credit_price, created_at) VALUES
(1, 'Teniski Klub Požega', 25.0, '2025-07-15 10:00:00'),
(2, 'Dalmacija Tennis Center', 18.0, '2025-07-18 12:30:00');

-- Članarine
INSERT INTO MEMBERSHIP (membership_id, user_id, club_id) VALUES
(1, 1, 1),  -- Ivan u TK Požega
(2, 1, 2),  -- Ivan i u Dalmacija TC
(3, 2, 1),  -- Ana u TK Požega
(4, 3, 2),  -- Petra u Dalmacija TC
(5, 4, 1);  -- Marko (admin) također u TK Požega
