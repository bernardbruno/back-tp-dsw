create database if not exists f1predicts;

use f1predicts;

## uncomment if you are not using docker
## create user if not exists dsw@'%' identified by 'dsw';
## grant select, update, insert, delete on f1predicts.* to dsw@'%';


create table if not exists `f1predicts`.`circuitos` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255) NULL,
  `ubicacion` VARCHAR(255) NULL,
  `pais` VARCHAR(255) NULL,
  `vueltas` INT UNSIGNED NULL,
  `longitud_km` FLOAT UNSIGNED NULL,
    PRIMARY KEY (`id`));

/*
create table if not exists `f1predicts`.`piloto` (
  `characterId` INT UNSIGNED NOT NULL,
  `itemName` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`characterId`, `itemName`),
  CONSTRAINT `fk_characterItem_character`
    FOREIGN KEY (`characterId`)
    REFERENCES `f1predicts`.`characters` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE);
*/
INSERT INTO f1predicts.circuitos VALUES (
    1,
    'Circuit de Spa-Francorchamps',
    'Stavelot',
    'Bélgica',
    44,
    7.004
);

INSERT INTO f1predicts.circuitos VALUES (
    2,
    'Circuit de Spa-Francorchamps20',
    'Stavelot',
    'Bélgica',
    44,
    7.004
);
