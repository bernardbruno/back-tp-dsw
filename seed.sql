-- OPCIONAL
DELETE FROM usuario;
DELETE FROM piloto;
DELETE FROM escuderia;
DELETE FROM circuito;
ALTER TABLE usuario AUTO_INCREMENT = 1;
ALTER TABLE piloto AUTO_INCREMENT = 1;
ALTER TABLE escuderia AUTO_INCREMENT = 1;
ALTER TABLE circuito AUTO_INCREMENT = 1;

-- ESCUDERÍAS
INSERT INTO escuderia (nombre, pais_base, jefe_equipo, motor, campeonatos_constructores, debut, logo, auto_img) VALUES
('Scuderia Ferrari', 'Italia', 'Frédéric Vasseur', 'Ferrari', 16, 'Gran Premio de Mónaco 1950', 'https://logoeps.com/wp-content/uploads/2013/03/ferrari-vector-logo.png', ''),
('Oracle Red Bull Racing', 'Reino Unido', 'Christian Horner', 'Red Bull Powertrains', 6, 'Gran Premio de Australia 2005', 'https://logos-world.net/wp-content/uploads/2020/11/Red-Bull-Racing-Logo.png', ''),
('Mercedes-AMG Petronas F1 Team', 'Reino Unido', 'Toto Wolff', 'Mercedes', 8, 'Gran Premio de Argentina 1954', 'https://logos-world.net/wp-content/uploads/2020/11/Mercedes-AMG-Petronas-Logo.png', ''),
('McLaren F1 Team', 'Reino Unido', 'Andrea Stella', 'Mercedes', 8, 'Gran Premio de Mónaco 1966', 'https://logoeps.com/wp-content/uploads/2013/03/mclaren-vector-logo.png', ''),
('Aston Martin Aramco F1 Team', 'Reino Unido', 'Mike Krack', 'Mercedes', 0, 'Gran Premio de Bahréin 2021', 'https://logos-world.net/wp-content/uploads/2020/12/Aston-Martin-Logo.png', ''),
('BWT Alpine F1 Team', 'Francia', 'Bruno Famin', 'Alpine', 2, 'Gran Premio de Francia 1986', 'https://logos-world.net/wp-content/uploads/2021/03/Alpine-F1-Logo.png', ''),
('MoneyGram Haas F1 Team', 'Estados Unidos', 'Ayao Komatsu', 'Ferrari', 0, 'Gran Premio de Australia 2016', 'https://logos-world.net/wp-content/uploads/2020/11/Haas-F1-Team-Logo.png', ''),
('Visa Cash App RB F1 Team', 'Italia', 'Laurent Mekies', 'Red Bull Powertrains', 0, 'Gran Premio de Australia 1985', 'https://logos-world.net/wp-content/uploads/2021/03/AlphaTauri-Logo.png', ''),
('Williams Racing', 'Reino Unido', 'James Vowles', 'Mercedes', 9, 'Gran Premio de Argentina 1975', 'https://logoeps.com/wp-content/uploads/2013/03/williams-vector-logo.png', ''),
('Stake F1 Team Kick Sauber', 'Suiza', 'Alessandro Alunni Bravi', 'Ferrari', 0, 'Gran Premio de Sudáfrica 1993', 'https://logos-world.net/wp-content/uploads/2020/11/Alfa-Romeo-Racing-Logo.png', '');

-- CIRCUITOS
INSERT INTO circuito (nombre, ubicacion, pais, vueltas, longitud_km) VALUES
('Circuit de Monaco', 'Monte Carlo', 'Mónaco', 78, 3.337),
('Silverstone Circuit', 'Silverstone', 'Reino Unido', 52, 5.891),
('Autodromo Nazionale di Monza', 'Monza', 'Italia', 53, 5.793),
('Spa-Francorchamps', 'Stavelot', 'Bélgica', 44, 7.004),
('Suzuka International Racing Course', 'Suzuka', 'Japón', 53, 5.807),
('Autódromo José Carlos Pace', 'São Paulo', 'Brasil', 71, 4.309),
('Circuit Gilles Villeneuve', 'Montreal', 'Canadá', 70, 4.361),
('Red Bull Ring', 'Spielberg', 'Austria', 71, 4.318),
('Hungaroring', 'Mogyoród', 'Hungría', 70, 4.381),
('Circuit Park Zandvoort', 'Zandvoort', 'Países Bajos', 72, 4.259),
('Bahrain International Circuit', 'Sakhir', 'Bahréin', 57, 5.412),
('Yas Marina Circuit', 'Abu Dhabi', 'Emiratos Árabes Unidos', 58, 5.281),
('Circuit of the Americas', 'Austin', 'Estados Unidos', 56, 5.513),
('Autodromo Hermanos Rodriguez', 'Ciudad de México', 'México', 71, 4.304),
('Marina Bay Street Circuit', 'Singapur', 'Singapur', 61, 5.063);

-- PILOTOS (Usa los IDs correctos de las escuderías que se crearon)
INSERT INTO piloto (nombre, apellido, nacionalidad, numero, fecha_nacimiento, estado, debut, titulos, piloto_img, escuderia_id) VALUES
-- Ferrari (escuderia_id = 1)
('Charles', 'Leclerc', 'Mónaco', 16, '1997-10-16', 'Activo', 'Gran Premio de Australia 2018', 0, '', 1),
('Lewis', 'Hamilton', 'Reino Unido', 44, '1985-01-07', 'Activo', 'Gran Premio de Australia 2007', 7, '', 1),
-- Red Bull Racing (escuderia_id = 2)
('Max', 'Verstappen', 'Países Bajos', 1, '1997-09-30', 'Activo', 'Gran Premio de Australia 2015', 3, '', 2),
('Sergio', 'Pérez', 'México', 11, '1990-01-26', 'Activo', 'Gran Premio de Australia 2011', 0, '', 2),
-- Mercedes (escuderia_id = 3)
('George', 'Russell', 'Reino Unido', 63, '1998-02-15', 'Activo', 'Gran Premio de Sakhir 2020', 0, '', 3),
-- McLaren (escuderia_id = 4)
('Lando', 'Norris', 'Reino Unido', 4, '1999-11-13', 'Activo', 'Gran Premio de Australia 2019', 0, '', 4),
('Oscar', 'Piastri', 'Australia', 81, '2001-04-06', 'Activo', 'Gran Premio de Bahréin 2023', 0, '', 4),
-- Aston Martin (escuderia_id = 5)
('Fernando', 'Alonso', 'España', 14, '1981-07-29', 'Activo', 'Gran Premio de Australia 2001', 2, '', 5),
('Lance', 'Stroll', 'Canadá', 18, '1998-10-29', 'Activo', 'Gran Premio de Australia 2017', 0, '', 5),
-- Alpine (escuderia_id = 6)
('Pierre', 'Gasly', 'Francia', 10, '1996-02-07', 'Activo', 'Gran Premio de Malasia 2017', 0, '', 6),
('Esteban', 'Ocon', 'Francia', 31, '1996-09-17', 'Activo', 'Gran Premio de Bélgica 2016', 0, '', 6),
-- Haas (escuderia_id = 7)
('Kevin', 'Magnussen', 'Dinamarca', 20, '1992-10-05', 'Activo', 'Gran Premio de Australia 2014', 0, '', 7),
('Nico', 'Hülkenberg', 'Alemania', 27, '1987-08-19', 'Activo', 'Gran Premio de Brasil 2010', 0, '', 7),
-- RB (escuderia_id = 8)
('Yuki', 'Tsunoda', 'Japón', 22, '2000-05-11', 'Activo', 'Gran Premio de Bahréin 2021', 0, '', 8),
('Daniel', 'Ricciardo', 'Australia', 3, '1989-07-01', 'Activo', 'Gran Premio de Reino Unido 2011', 0, '', 8),
-- Williams (escuderia_id = 9)
('Alexander', 'Albon', 'Tailandia', 23, '1996-03-23', 'Activo', 'Gran Premio de Bélgica 2019', 0, '', 9),
('Logan', 'Sargeant', 'Estados Unidos', 2, '2000-12-31', 'Activo', 'Gran Premio de Bahréin 2023', 0, '', 9),
-- Kick Sauber (escuderia_id = 10)
('Valtteri', 'Bottas', 'Finlandia', 77, '1989-08-28', 'Activo', 'Gran Premio de Australia 2013', 0, '', 10),
('Zhou', 'Guanyu', 'China', 24, '1999-05-30', 'Activo', 'Gran Premio de Bahréin 2022', 0, '', 10),
-- ============================
-- PILOTOS INACTIVOS (sin escudería)
-- ============================
('Mick', 'Schumacher', 'Alemania', 47, '1999-03-22', 'Inactivo', 'Gran Premio de Bahréin 2021', 0, '', NULL),
('Nyck', 'de Vries', 'Países Bajos', 21, '1995-02-06', 'Inactivo', 'Gran Premio de Italia 2022', 0, '', NULL),
-- ============================
-- PILOTOS RETIRADOS (sin escudería)
-- ============================
('Kimi', 'Räikkönen', 'Finlandia', 7, '1979-10-17', 'Retirado', 'Gran Premio de Australia 2001', 1, '', NULL),
('Sebastian', 'Vettel', 'Alemania', 5, '1987-07-03', 'Retirado', 'Gran Premio de Estados Unidos 2007', 4, '', NULL),
('Felipe', 'Massa', 'Brasil', 19, '1981-04-25', 'Retirado', 'Gran Premio de Australia 2002', 0, '', NULL);
-- USUARIOS 
INSERT INTO usuario (nombre_usuario, nombre, apellido, email, password, pais, rol, puntos, piloto_fav_id) VALUES
('admin_f1', 'Administrador', 'Principal', 'admin@f1predictions.com', '123456', 'Argentina', 'admin', 0, NULL),
('juancho_16', 'Juan', 'Pérez', 'juan.perez@email.com', 'password123', 'Argentina', 'user', 150, 1),
('mariagonz', 'María', 'González', 'maria.gonzalez@email.com', 'pass123', 'España', 'user', 89, 2),
('carlitox11', 'Carlos', 'Rodríguez', 'carlos.rodriguez@email.com', 'pass123', 'México', 'user', 234, 3),
('anitaF1', 'Ana', 'López', 'ana.lopez@email.com', 'password123', 'Italia', 'user', 178, 1),
('pedro_bras', 'Pedro', 'Silva', 'pedro.silva@email.com', 'pass123', 'Brasil', 'user', 267, 5),
('sofii_martin', 'Sofía', 'Martín', 'sofia.martin@email.com', 'pass123', 'Colombia', 'user', 134, NULL),
('diegoF1uy', 'Diego', 'Fernández', 'diego.fernandez@email.com', 'pass123', 'Uruguay', 'user', 198, 9),
('lucitorres99', 'Lucía', 'Torres', 'lucia.torres@email.com', 'pass123', 'Chile', 'user', 156, 3),
('miguel_castro22', 'Miguel', 'Castro', 'miguel.castro@email.com', 'pass123', 'Perú', 'user', 87, NULL);
