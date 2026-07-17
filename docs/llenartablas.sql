-- 11 Escuderías
INSERT INTO escuderia (id, nombre, pais_base, jefe_equipo, motor, campeonatos_constructores, debut, logo, auto_img) VALUES
(1, 'Oracle Red Bull Racing', 'Austria', 'Christian Horner', 'Red Bull Ford', 6, 'Gran Premio de Australia (Melbourne) - 2005', 'redbull_logo.png', 'rb_car.png'),
(2, 'Mercedes AMG Petronas', 'Reino Unido', 'Toto Wolff', 'Mercedes', 8, 'Gran Premio de Bahréin (Sakhir) - 2010', 'mercedes_logo.png', 'mercedes_car.png'),
(3, 'Scuderia Ferrari', 'Italia', 'Frédéric Vasseur', 'Ferrari', 16, 'Gran Premio de Mónaco (Mónaco) - 1950', 'ferrari_logo.png', 'ferrari_car.png'),
(4, 'McLaren', 'Reino Unido', 'Andrea Stella', 'Mercedes', 8, 'Gran Premio de Mónaco (Mónaco) - 1966', 'mclaren_logo.png', 'mclaren_car.png'),
(5, 'Aston Martin Aramco', 'Reino Unido', 'Mike Krack', 'Mercedes', 0, 'Gran Premio de Bahréin (Sakhir) - 2021', 'aston_logo.png', 'aston_car.png'),
(6, 'BWT Alpine F1 Team', 'Francia', 'Bruno Famin', 'Renault', 0, 'Gran Premio de Bahréin (Sakhir) - 2021 (debut como Alpine)', 'alpine_logo.png', 'alpine_car.png'),
(7, 'Williams Racing', 'Reino Unido', 'James Vowles', 'Mercedes', 9, 'Gran Premio de España (Jarama) - 1977', 'williams_logo.png', 'williams_car.png'),
(8, 'Racing Bulls', 'Italia', 'Alan Permane', 'Red Bull Ford', 0, 'Gran Premio de Bahréin (Sakhir) - 2006', 'at_logo.png', 'at_car.png'),
(9, 'Audi Revolut', 'Suiza', 'Mattia Binotto', 'Audi', 0, 'Gran Premio de Australia (Melbourne) - 2026', 'audi_logo.png', 'audi_car.png'),
(10, 'Haas F1 Team', 'Estados Unidos', 'Ayao Komatsu', 'Ferrari', 0, 'Gran Premio de Australia (Melbourne) - 2016', 'haas_logo.png', 'haas_car.png'),
(11, 'Cadillac', 'Suiza', 'Graeme Lowdon', 'Ferrari', 0, 'Gran Premio de Australia (Melbourne) - 2026', 'cad_logo.png', 'cad_car.png');


INSERT INTO piloto (id, nombre, apellido, nacionalidad, numero, fecha_nacimiento, estado, debut, titulos, piloto_img, escuderia_id) VALUES
(1, 'Juan', 'Fangio', 'Argentina', 4, '1911-06-24', 'Retirado', '1950', 5, 'fangio.png', NULL),
(2, 'Carlos', 'Reutemann', 'Argentina', 5, '1942-04-12', 'Retirado', '1972', 0, 'reutemann.png', NULL),
(3, 'Max', 'Verstappen', 'Neerlandesa', 1, '1997-09-30', 'Activo', '2015', 3, 'verstappen.png', 1),
(4, 'Isaac', 'Hadjar', 'Francia', 6, '2004-09-28', 'Activo', '2025', 0, NULL, 1),
(5, 'Charles', 'Leclerc', 'Mónaco', 16, '1997-10-16', 'Activo', '2018', 0, 'leclerc.png', 3),
(6, 'Lewis', 'Hamilton', 'Gran Bretaña', 44, '1985-01-07', 'Activo', '2007', 7, 'hamilton.png', 3),
(7, 'George', 'Russell', 'Gran Bretaña', 63, '1998-02-15', 'Activo', '2019', 0, 'russell.png', 2),
(8, 'Kimi', 'Antonelli', 'Italia', 12, '2006-08-25', 'Activo', '2024', 0, NULL, 2),
(9, 'Lando', 'Norris', 'Gran Bretaña', 4, '1999-11-13', 'Activo', '2019', 0, 'norris.png', 4),
(10, 'Oscar', 'Piastri', 'Australia', 81, '2001-04-06', 'Activo', '2023', 0, 'piastri.png', 4),
(11, 'Fernando', 'Alonso', 'España', 14, '1981-07-29', 'Activo', '2001', 2, 'alonso.png', 5),
(12, 'Lance', 'Stroll', 'Canadá', 18, '1998-10-29', 'Activo', '2017', 0, 'stroll.png', 5),
(13, 'Franco', 'Colapinto', 'Argentina', 43, '2003-08-26', 'Activo', '2024', 0, 'colapinto.png', 6),
(14, 'Pierre', 'Gasly', 'Francia', 10, '1996-02-07', 'Activo', '2017', 0, 'gasly.png', 6),
(15, 'Alex', 'Albon', 'Tailandia', 23, '1996-03-23', 'Activo', '2019', 0, 'albon.png', 7),
(16, 'Carlos', 'Sainz', 'España', 55, '1994-09-01', 'Activo', '2015', 0, 'sainz.png', 7),
(17, 'Liam', 'Lawson', 'Nueva Zelanda', 30, '2002-02-11', 'Activo', '2023', 0, NULL, 8),
(18, 'Arvid', 'Lindblad', 'Gran Bretaña', 41, '2007-08-08', 'Activo', '2026', 0, NULL, 8),
(19, 'Nico', 'Hülkenberg', 'Alemania', 27, '1987-08-19', 'Activo', '2009', 0, 'hulkenberg.png', 9),
(20, 'Gabriel', 'Bortoleto', 'Brasil', 5, '2004-10-14', 'Activo', '2025', 0, NULL, 9),
(21, 'Esteban', 'Ocon', 'Francia', 31, '1996-09-17', 'Activo', '2015', 0, 'ocon.png', 10),
(22, 'Oliver', 'Bearman', 'Gran Bretaña', 87, '2005-05-08', 'Activo', '2024', 0, NULL, 10),
(23, 'Sergio', 'Pérez', 'México', 11, '1990-01-26', 'Activo', '2011', 0, 'perez.png', 11),
(24, 'Valtteri', 'Bottas', 'Finlandia', 77, '1989-08-28', 'Activo', '2013', 0, 'bottas.png', 11),
(25, 'Logan', 'Sargeant', 'Estados Unidos', 2, '2000-12-31', 'Inactivo', '2023', 0, 'sargeant.png', NULL),
(26, 'Daniel', 'Ricciardo', 'Australia', 3, '1989-07-01', 'Retirado', '2011', 0, 'ricciardo.png', NULL),
(27, 'Yuki', 'Tsunoda', 'Japón', 22, '2000-05-11', 'Inactivo', '2021', 0, 'tsunoda.png', NULL),
(28, 'Guanyu', 'Zhou', 'China', 24, '1996-05-30', 'Inactivo', '2022', 0, 'zhou.png', NULL),
(29, 'Kevin', 'Magnussen', 'Dinamarca', 20, '1992-10-05', 'Retirado', '2014', 0, 'magnussen.png', NULL),
(30, 'Jack', 'Doohan', 'Australia', 88, '2003-01-20', 'Inactivo', '2024', 0, 'doohan.png', NULL);

-- Crear Circuitos
INSERT INTO circuito (id, nombre, ubicacion, pais, vueltas, longitud_km) VALUES
(1,  'Albert Park',                 'Melbourne',            'Australia', 58, 5.278),
(2,  'Shanghai International',      'Shanghai',             'China',     56, 5.451),
(3,  'Suzuka Circuit',              'Suzuka',               'Japón',     53, 5.807),
(4,  'Bahrain International Circuit','Sakhir',               'Bahréin',   57, 5.412),
(5,  'Jeddah Corniche Circuit',     'Jeddah',               'Arabia Saudita', 50, 6.174),
(6,  'Miami International Autodrome','Miami Gardens',        'Estados Unidos', 57, 5.412),
(7,  'Circuit Gilles Villeneuve',   'Montreal',             'Canadá',    70, 4.361),
(8,  'Circuit de Monaco',           'Monte Carlo',          'Mónaco',    78, 3.337),
(9,  'Circuit de Barcelona-Catalunya','Montmeló',           'España',    66, 4.657),
(10, 'Red Bull Ring',               'Spielberg',            'Austria',   71, 4.318),
(11, 'Silverstone Circuit',         'Silverstone',          'Reino Unido', 52, 5.891),
(12, 'Circuit de Spa-Francorchamps','Stavelot',             'Bélgica',   44, 7.004),
(13, 'Hungaroring',                 'Mogyoród',             'Hungría',   70, 4.381),
(14, 'Circuit Park Zandvoort',      'Zandvoort',            'Países Bajos', 72, 4.259),
(15, 'Autodromo Nazionale di Monza','Monza',                'Italia',    53, 5.793),
(16, 'Madrid Street Circuit',       'Madrid',               'España',    57, 5.416),
(17, 'Baku City Circuit',           'Bakú',                 'Azerbaiyán',51, 6.003),
(18, 'Marina Bay Street Circuit',   'Singapur',             'Singapur',  62, 4.940),
(19, 'Circuit of The Americas',     'Austin',               'Estados Unidos',56, 5.513),
(20, 'Autódromo Hermanos Rodríguez','Ciudad de México',     'México',    71, 4.304),
(21, 'Autódromo José Carlos Pace',  'São Paulo',            'Brasil',    71, 4.309),
(22, 'Las Vegas Strip Circuit',     'Las Vegas',            'Estados Unidos',50, 6.201),
(23, 'Losail International Circuit', 'Lusail',              'Qatar',     57, 5.419),
(24, 'Yas Marina Circuit',          'Abu Dhabi',            'Emiratos Árabes Unidos',58, 5.281);

-- Crear Carreras
INSERT INTO carrera (id, nombre, fecha_carrera, hora_carrera, estado, vuelta_rapida_id, pole_id, circuito_id, duelo_piloto_a_id, duelo_piloto_b_id, pit_stops_piloto_id,
 resultado_puesto1_id, resultado_puesto2_id, resultado_puesto3_id, resultado_safety_car, resultado_duelo_ganador_id, resultado_pit_stops_cantidad,
 resultado_escuderia_parada_rapida_id, resultado_piloto_del_dia_id, resultado_posicion_colapinto)
VALUES
(1,  'Australian Grand Prix',       '2026-03-08', 15, 'en preparacion', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(2,  'Chinese Grand Prix',          '2026-03-15', 15, 'en preparacion', NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(3,  'Japanese Grand Prix',         '2026-03-29', 15, 'en preparacion', NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(4,  'Bahrain Grand Prix',          '2026-04-12', 15, 'en preparacion', NULL, NULL, 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(5,  'Saudi Arabian Grand Prix',    '2026-04-19', 15, 'en preparacion', NULL, NULL, 5, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(6,  'Miami Grand Prix',            '2026-05-03', 15, 'en preparacion', NULL, NULL, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(7,  'Canadian Grand Prix',         '2026-05-24', 15, 'en preparacion', NULL, NULL, 7, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(8,  'Monaco Grand Prix',           '2026-06-07', 15, 'en preparacion', NULL, NULL, 8, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(9,  'Barcelona-Catalunya GP',      '2026-06-14', 15, 'en preparacion', NULL, NULL, 9, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(10, 'Austrian Grand Prix',        '2026-06-28', 15, 'en preparacion', NULL, NULL, 10, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(11, 'British Grand Prix',         '2026-07-05', 15, 'en preparacion', NULL, NULL, 11, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(12, 'Belgian Grand Prix',         '2026-07-19', 15, 'en preparacion', NULL, NULL, 12, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(13, 'Hungarian Grand Prix',       '2026-07-26', 15, 'en preparacion', NULL, NULL, 13, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(14, 'Dutch Grand Prix',           '2026-08-23', 15, 'en preparacion', NULL, NULL, 14, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(15, 'Italian Grand Prix',         '2026-09-06', 15, 'en preparacion', NULL, NULL, 15, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(16, 'Madrid Grand Prix',          '2026-09-13', 15, 'en preparacion', NULL, NULL, 16, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(17, 'Azerbaijan Grand Prix',      '2026-09-27', 15, 'en preparacion', NULL, NULL, 17, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(18, 'Singapore Grand Prix',       '2026-10-11', 15, 'en preparacion', NULL, NULL, 18, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(19, 'United States Grand Prix',   '2026-10-25', 15, 'en preparacion', NULL, NULL, 19, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(20, 'Mexico City Grand Prix',     '2026-11-01', 15, 'en preparacion', NULL, NULL, 20, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(21, 'Brazil Grand Prix',          '2026-11-08', 15, 'en preparacion', NULL, NULL, 21, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(22, 'Las Vegas Grand Prix',       '2026-11-21', 15, 'en preparacion', NULL, NULL, 22, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(23, 'Qatar Grand Prix',           '2026-11-29', 15, 'en preparacion', NULL, NULL, 23, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(24, 'Abu Dhabi Grand Prix',       '2026-12-06', 15, 'en preparacion', NULL, NULL, 24, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- R1 Australia (id=1)
UPDATE carrera SET
  pole_id = 7,
  vuelta_rapida_id = 3,
  duelo_piloto_a_id = 7,
  duelo_piloto_b_id = 5,
  pit_stops_piloto_id = 7,
  resultado_duelo_ganador_id = 7,
  resultado_pit_stops_cantidad = 1,
  resultado_piloto_del_dia_id = 7,
  resultado_escuderia_parada_rapida_id = 2,
  resultado_posicion_colapinto = 14
WHERE id = 1;

-- R2 China (id=2)
UPDATE carrera SET
  pole_id = 8,
  vuelta_rapida_id = 8,
  duelo_piloto_a_id = 8,
  duelo_piloto_b_id = 7,
  pit_stops_piloto_id = 8,
  resultado_duelo_ganador_id = 8,
  resultado_pit_stops_cantidad = 1,
  resultado_piloto_del_dia_id = 8,
  resultado_escuderia_parada_rapida_id = 2,
  resultado_posicion_colapinto = 10
WHERE id = 2;

-- R3 Japan (id=3)
UPDATE carrera SET
  pole_id = 8,
  vuelta_rapida_id = 8,
  duelo_piloto_a_id = 8,
  duelo_piloto_b_id = 10,
  pit_stops_piloto_id = 8,
  resultado_duelo_ganador_id = 8,
  resultado_pit_stops_cantidad = 1,
  resultado_piloto_del_dia_id = 8,
  resultado_escuderia_parada_rapida_id = 2,
  resultado_posicion_colapinto = 16
WHERE id = 3;

-- R4 Bahrain (id=4)
UPDATE carrera SET
  pole_id = 8,
  vuelta_rapida_id = 8,
  duelo_piloto_a_id = 8,
  duelo_piloto_b_id = 9,
  pit_stops_piloto_id = 8,
  resultado_duelo_ganador_id = 8,
  resultado_pit_stops_cantidad = 1,
  resultado_piloto_del_dia_id = 8,
  resultado_escuderia_parada_rapida_id = 2,
  resultado_posicion_colapinto = 8
WHERE id = 4;

-- R5 Saudi Arabia (id=5)  -- pole según reportes: Leclerc (si prefieres otra fuente, lo ajusto)
UPDATE carrera SET
  pole_id = 5,
  vuelta_rapida_id = NULL,
  duelo_piloto_a_id = 5,
  duelo_piloto_b_id = 6,
  pit_stops_piloto_id = 5,
  resultado_duelo_ganador_id = 5,
  resultado_pit_stops_cantidad = NULL,
  resultado_piloto_del_dia_id = 5,
  resultado_escuderia_parada_rapida_id = NULL,
  resultado_posicion_colapinto = NULL
WHERE id = 5;

-- R6 Miami (id=6)
UPDATE carrera SET
  pole_id = 8,
  vuelta_rapida_id = 9,
  duelo_piloto_a_id = 9,
  duelo_piloto_b_id = 10,
  pit_stops_piloto_id = 9,
  resultado_duelo_ganador_id = 9,
  resultado_pit_stops_cantidad = 1,
  resultado_piloto_del_dia_id = 8,
  resultado_escuderia_parada_rapida_id = 4,
  resultado_posicion_colapinto = 7
WHERE id = 6;

-- R7 Canada (id=7)
UPDATE carrera SET
  pole_id = 7,
  vuelta_rapida_id = 8,
  duelo_piloto_a_id = 7,
  duelo_piloto_b_id = 8,
  pit_stops_piloto_id = 7,
  resultado_duelo_ganador_id = 8,
  resultado_pit_stops_cantidad = 1,
  resultado_piloto_del_dia_id = 8,
  resultado_escuderia_parada_rapida_id = 2,
  resultado_posicion_colapinto = NULL
WHERE id = 7;

-- R8 Monaco (id=8)
UPDATE carrera SET
  pole_id = 8,
  vuelta_rapida_id = 8,
  duelo_piloto_a_id = 6,
  duelo_piloto_b_id = 8,
  pit_stops_piloto_id = 6,
  resultado_duelo_ganador_id = 8,
  resultado_pit_stops_cantidad = 4,
  resultado_piloto_del_dia_id = 8,
  resultado_escuderia_parada_rapida_id = 2,
  resultado_posicion_colapinto = 14
WHERE id = 8;

-- R9 Barcelona (id=9)
UPDATE carrera SET
  pole_id = 7,
  vuelta_rapida_id = 6,
  duelo_piloto_a_id = 7,
  duelo_piloto_b_id = 6,
  pit_stops_piloto_id = 6,
  resultado_duelo_ganador_id = 6,
  resultado_pit_stops_cantidad = 3,
  resultado_piloto_del_dia_id = 6,
  resultado_escuderia_parada_rapida_id = 3,
  resultado_posicion_colapinto = NULL
WHERE id = 9;

-- R10 Austria (id=10)
UPDATE carrera SET
  pole_id = 7,
  vuelta_rapida_id = 8,
  duelo_piloto_a_id = 7,
  duelo_piloto_b_id = 3,
  pit_stops_piloto_id = 7,
  resultado_duelo_ganador_id = 7,
  resultado_pit_stops_cantidad = 1,
  resultado_piloto_del_dia_id = 7,
  resultado_escuderia_parada_rapida_id = 2,
  resultado_posicion_colapinto = NULL
WHERE id = 10;

-- R11 Great Britain (id=11)
UPDATE carrera SET
  pole_id = 8,
  vuelta_rapida_id = 8,
  duelo_piloto_a_id = 8,
  duelo_piloto_b_id = 5,
  pit_stops_piloto_id = 8,
  resultado_duelo_ganador_id = 5,
  resultado_pit_stops_cantidad = 4,
  resultado_piloto_del_dia_id = 5,
  resultado_escuderia_parada_rapida_id = 3,
  resultado_posicion_colapinto = NULL
WHERE id = 11;
