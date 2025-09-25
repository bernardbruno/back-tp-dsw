-- OPCIONAL
#DELETE FROM usuario;
DELETE FROM piloto;
DELETE FROM escuderia;
DELETE FROM circuito;
DELETE FROM carrera;
DELETE FROM resultado;
#ALTER TABLE usuario AUTO_INCREMENT = 1;
ALTER TABLE piloto AUTO_INCREMENT = 1;
ALTER TABLE escuderia AUTO_INCREMENT = 1;
ALTER TABLE circuito AUTO_INCREMENT = 1;
ALTER TABLE carrera AUTO_INCREMENT = 1;
ALTER TABLE resultado AUTO_INCREMENT = 1;

-- ESCUDERÍAS
INSERT INTO escuderia (nombre, pais_base, jefe_equipo, motor, campeonatos_constructores, debut, logo, auto_img) VALUES
('Scuderia Ferrari', 'Italia', 'Frédéric Vasseur', 'Ferrari', 16, 'Gran Premio de Mónaco 1950', '', ''),
('Red Bull Racing', 'Reino Unido', 'Christian Horner', 'Red Bull Powertrains', 6, 'Gran Premio de Australia 2005', '', ''),
('Mercedes-AMG Petronas', 'Reino Unido', 'Toto Wolff', 'Mercedes', 8, 'Gran Premio de Argentina 1954', '', ''),
('McLaren', 'Reino Unido', 'Andrea Stella', 'Mercedes', 8, 'Gran Premio de Mónaco 1966', '', ''),
('Aston Martin Aramcom', 'Reino Unido', 'Mike Krack', 'Mercedes', 0, 'Gran Premio de Bahréin 2021', '', ''),
('BWT Alpine', 'Francia', 'Bruno Famin', 'Alpine', 2, 'Gran Premio de Francia 1986', '', ''),
('MoneyGram Haas', 'Estados Unidos', 'Ayao Komatsu', 'Ferrari', 0, 'Gran Premio de Australia 2016', '', ''),
('Visa Cash App RB', 'Italia', 'Laurent Mekies', 'Red Bull Powertrains', 0, 'Gran Premio de Australia 1985', '', ''),
('Williams Racing', 'Reino Unido', 'James Vowles', 'Mercedes', 9, 'Gran Premio de Argentina 1975', '', ''),
('Stake Kick Sauber', 'Suiza', 'Alessandro Alunni Bravi', 'Ferrari', 0, 'Gran Premio de Sudáfrica 1993', '', '');

-- CIRCUITOS
INSERT INTO circuito (nombre, ubicacion, pais, longitud_km, vueltas) VALUES
('Sakhir International Circuit', 'Sakhir', 'Baréin', 5.412, 57),
('Jeddah Corniche Circuit', 'Jeddah', 'Arabia Saudita', 6.174, 50),
('Albert Park Circuit', 'Melbourne', 'Australia', 5.278, 58),
('Suzuka Circuit', 'Suzuka', 'Japón', 5.807, 53),
('Shanghai International Circuit', 'Shanghai', 'China', 5.451, 56),
('Miami International Autodrome', 'Miami', 'Estados Unidos', 5.412, 57),
('Imola (Autodromo Enzo e Dino Ferrari)', 'Imola', 'Italia', 4.909, 63),
('Circuit de Monaco', 'Montecarlo', 'Mónaco', 3.337, 78),
('Circuit Gilles Villeneuve', 'Montreal', 'Canadá', 4.361, 70),
('Circuit de Barcelona-Catalunya', 'Barcelona', 'España', 4.675, 66),
('Red Bull Ring', 'Spielberg', 'Austria', 4.318, 71),
('Silverstone Circuit', 'Silverstone', 'Reino Unido', 5.891, 52),
('Hungaroring', 'Budapest', 'Hungría', 4.381, 70),
('Circuit de Spa-Francorchamps', 'Spa', 'Bélgica', 7.004, 44),
('Zandvoort Circuit', 'Zandvoort', 'Países Bajos', 4.259, 72),
('Monza (Autodromo Nazionale Monza)', 'Monza', 'Italia', 5.793, 53),
('Marina Bay Street Circuit', 'Singapur', 'Singapur', 4.940, 62),
('Las Vegas Strip Circuit', 'Las Vegas', 'Estados Unidos', 6.201, 50),
('Losail International Circuit', 'Lusail', 'Catar', 5.419, 57),
('Yas Marina Circuit', 'Abu Dabi', 'Emiratos Árabes Unidos', 5.281, 58),
-- Extras históricos
('Hockenheimring', 'Hockenheim', 'Alemania', 4.574, 67),
('Magny-Cours', 'Nevers', 'Francia', 4.411, 72);

-- PILOTOS 
INSERT INTO piloto (nombre, apellido, nacionalidad, numero, fecha_nacimiento, estado, debut, titulos, piloto_img, escuderia_id) VALUES
('Charles', 'Leclerc', 'Mónaco', 16, '1997-10-16', 'Activo', 'Gran Premio de Australia 2018', 0, '', 1),
('Carlos', 'Sainz Jr.', 'España', 55, '1994-09-01', 'Activo', 'Gran Premio de Australia 2015', 0, '', 1),
('Max', 'Verstappen', 'Países Bajos', 1, '1997-09-30', 'Activo', 'Gran Premio de Australia 2015', 3, '', 2),
('Sergio', 'Pérez', 'México', 11, '1990-01-26', 'Activo', 'Gran Premio de Australia 2011', 0, '', 2),
('Lewis', 'Hamilton', 'Reino Unido', 44, '1985-01-07', 'Activo', 'Gran Premio de Australia 2007', 7, '', 3),
('George', 'Russell', 'Reino Unido', 63, '1998-02-15', 'Activo', 'Gran Premio de Australia 2019', 0, '', 3),
('Lando', 'Norris', 'Reino Unido', 4, '1999-11-13', 'Activo', 'Gran Premio de Australia 2019', 0, '', 4),
('Oscar', 'Piastri', 'Australia', 81, '2001-04-06', 'Activo', 'Gran Premio de Bahréin 2023', 0, '', 4),
('Fernando', 'Alonso', 'España', 14, '1981-07-29', 'Activo', 'Gran Premio de Australia 2001', 2, '', 5),
('Lance', 'Stroll', 'Canadá', 18, '1998-10-29', 'Activo', 'Gran Premio de Australia 2017', 0, '', 5),
('Pierre', 'Gasly', 'Francia', 10, '1996-02-07', 'Activo', 'Gran Premio de Malasia 2017', 1, '', 6),
('Esteban', 'Ocon', 'Francia', 31, '1996-09-17', 'Activo', 'Gran Premio de Bélgica 2016', 1, '', 6),
('Kevin', 'Magnussen', 'Dinamarca', 20, '1992-10-05', 'Activo', 'Gran Premio de Australia 2014', 0, '', 7),
('Nico', 'Hülkenberg', 'Alemania', 27, '1987-08-19', 'Activo', 'Gran Premio de Bahréin 2010', 0, '', 7),
('Yuki', 'Tsunoda', 'Japón', 22, '2000-05-11', 'Activo', 'Gran Premio de Bahréin 2021', 0, '', 8),
('Daniel', 'Ricciardo', 'Australia', 3, '1989-07-01', 'Activo', 'Gran Premio de Reino Unido 2011', 8, '', 8),
('Alexander', 'Albon', 'Tailandia', 23, '1996-03-23', 'Activo', 'Gran Premio de Australia 2019', 0, '', 9),
('Logan', 'Sargeant', 'Estados Unidos', 2, '2000-12-31', 'Activo', 'Gran Premio de Bahréin 2023', 0, '', 9),
('Valtteri', 'Bottas', 'Finlandia', 77, '1989-08-28', 'Activo', 'Gran Premio de Australia 2013', 0, '', 10),
('Zhou', 'Guanyu', 'China', 24, '1999-05-30', 'Activo', 'Gran Premio de Bahréin 2022', 0, '', 10),
('Oliver', 'Bearman', 'Reino Unido', 87, '2005-05-08', 'Inactivo', 'Gran Premio de Arabia Saudita 2024', 0, '', NULL),
('Theo', 'Pourchaire', 'Francia', 98, '2003-08-20', 'Inactivo', 'Gran Premio de Estados Unidos de 2022', 0, '', NULL),
('Mick', 'Schumacher', 'Alemania', 47, '1999-03-22', 'Inactivo', 'Gran Premio de Bahréin 2021', 0, '', NULL),
('Nyck', 'de Vries', 'Países Bajos', 21, '1995-02-06', 'Inactivo', 'Gran Premio de Italia 2022', 0, '', NULL),
('Franco', 'Colapinto', 'Argentina', 43, '2003-05-27', 'Inactivo', 'Piloto de pruebas 2024 (Williams)', 0, '', NULL),
('Kimi', 'Räikkönen', 'Finlandia', 7, '1979-10-17', 'Retirado', 'Gran Premio de Australia 2001', 1, '', NULL),
('Sebastian', 'Vettel', 'Alemania', 5, '1987-07-03', 'Retirado', 'Gran Premio de Estados Unidos 2007', 4, '', NULL),
('Felipe', 'Massa', 'Brasil', 19, '1981-04-25', 'Retirado', 'Gran Premio de Australia 2002', 0, '', NULL),
('Ayrton', 'Senna', 'Brasil', 12, '1960-03-21', 'Retirado', 'Gran Premio de Brasil 1984', 3, '', NULL);

-- CARRERAS
INSERT INTO carrera (id, nombre, fecha_carrera, hora_carrera, estado, vuelta_rapida_id, pole_id, circuito_id) VALUES
(1, 'Gran Premio de Australia', '2025-03-16', 16, 'completada', NULL, NULL, 1),
(2, 'Gran Premio de Arabia Saudita', '2025-03-23', 18, 'completada', NULL, NULL, 2),
(3, 'Gran Premio de Japón', '2025-03-30', 7, 'completada', NULL, NULL, 3),
(4, 'Gran Premio de Italia', '2025-09-21', 14, 'en preparacion', NULL, NULL, 9),
(5, 'Gran Premio de Estados Unidos', '2025-10-05', 18, 'en preparacion', NULL, NULL, 10),
(6, 'Gran Premio de México', '2025-10-19', 20, 'en preparacion', NULL, NULL, 11);


-- RESULTADOS
INSERT INTO resultado (carrera_id, piloto_id, posicion, estado) VALUES
(1, 3, 1, NULL),
(1, 1, 2, NULL),
(1, 7, 3, NULL),
(1, 5, 4, NULL),
(1, 9, 5, NULL),
(1, 2, 6, NULL),
(1, 8, 7, NULL),
(1, 6, 8, NULL),
(1, 4, 9, NULL),
(1, 12, 10, NULL),
(1, 11, 11, NULL),
(1, 13, 12, NULL),
(1, 14, 13, NULL),
(1, 10, 14, NULL),
(1, 16, 15, NULL),
(1, 15, 16, NULL),
(1, 17, 17, NULL),
(1, 19, NULL, 'DNF'),
(1, 18, NULL, 'DNF'),
(1, 20, NULL, 'DNS'),
(2, 3, 1, NULL),
(2, 4, 2, NULL),
(2, 5, 3, NULL),
(2, 1, 4, NULL),
(2, 7, 5, NULL),
(2, 9, 6, NULL),
(2, 6, 7, NULL),
(2, 2, 8, NULL),
(2, 8, 9, NULL),
(2, 12, 10, NULL),
(2, 11, 11, NULL),
(2, 10, 12, NULL),
(2, 13, 13, NULL),
(2, 14, 14, NULL),
(2, 15, 15, NULL),
(2, 16, 16, NULL),
(2, 17, NULL, 'DNF'),
(2, 18, 17, NULL),
(2, 19, NULL, 'DNF'),
(2, 20, 18, NULL),
(3, 1, 1, NULL),
(3, 3, 2, NULL),
(3, 2, 3, NULL),
(3, 4, 4, NULL),
(3, 7, 5, NULL),
(3, 8, 6, NULL),
(3, 5, 7, NULL),
(3, 9, 8, NULL),
(3, 6, 9, NULL),
(3, 12, 10, NULL),
(3, 11, 11, NULL),
(3, 10, 12, NULL),
(3, 13, 13, NULL),
(3, 14, 14, NULL),
(3, 15, 15, NULL),
(3, 16, 16, NULL),
(3, 17, 17, NULL),
(3, 18, 18, NULL),
(3, 19, NULL, 'DNF'),
(3, 20, NULL, 'DNS'),
(4, 3, NULL, NULL),
(4, 1, NULL, NULL),
(4, 7, NULL, NULL);


