CREATE DATABASE if not exists ecoHabitationDb;
USE ecoHabitationDb;

DROP TABLE if exists conn;
DROP TABLE if exists companies;
DROP TABLE if exists habitations;
DROP TABLE if exists features;


CREATE TABLE features (
	feat_id int auto_increment primary key,
    feat_name varchar(100),
    feat_price int,
    feat_durability int,
    feat_intallation_cost int,
    feat_rentability_per_year int
);




CREATE TABLE companies (
	company_id int auto_increment primary key,
    company_name varchar(100),
    company_nb_employees int,
    company_location varchar(100),
    company_phone_number varchar(100),
    company_speciality int,
    CONSTRAINT fk_company_speciality FOREIGN KEY (company_speciality) REFERENCES features(feat_id)
);

CREATE TABLE habitations (
	habitation_id int auto_increment primary key,
    habitation_type varchar (100),
    habitation_size int,
    habitation_price int,
    habitation_location varchar(100),
    habitation_sun_exposure varchar(100)
);



CREATE TABLE conn (
	conn_id int auto_increment primary key,
    conn_habitation int,
    conn_feature int,
    CONSTRAINT fk_conn_habitation FOREIGN KEY (conn_habitation) REFERENCES habitations(habitation_id),
    CONSTRAINT fk_conn_feature FOREIGN KEY (conn_feature) REFERENCES features(feat_id)
);

INSERT INTO features VALUES
    (1, 'solar panel', 10000, 30, 2000, 1200),
    (2, 'wind turbine', 10000, 20, 3000, 1000),
    (3, 'heat pump', 13000, 20, 8000, 3500),
    (4, 'canadian well', 7000, 15, 4000, 300),
    (5, 'geothermal heat pump', 14000, 20, 3000, 1000),
    (6, 'wood heating', 4000, 30, 3000, 900),
    (7, 'double flow CMV', 5000, 20, 1000, 250),
    (8, 'LED lighting', 200, 15, 0, 100),
    (9, 'rainwater collector', 2000, 30, 500, 750),
    (10, 'vegetal wall', 12000, 10, 3000, 100),
	(11, 'isolated windows', 7000, 40, 3000, 1000);

INSERT INTO companies VALUES 
	(1,'Energy+',400,'Germany','(+49) 643651824',1),
	(2,'GreenTechny',56,'Senegal','(+221)546825967',10),
	(3,'HouseSupport',144,'Austria','(+43)752495748',7),
	(4,'ImmoEnergy',650,'France','(+33)642517584',3),
	(5,'Immo+',351,'Spain','(+34)346821958',1),
	(6,'PlanetSaver',54,'USA','(+01)735268475',2),
	(7,'GreenNRJ',34,'South Africa','(+27)642510403',2),
	(8,'NewCompany',480,'India','(+91)742455768',9),
	(9,'Sunny Ecology',125,'Germany','(+49)572431524',4),
	(10,'EarthHousing',23,'USA','(+01)356720908',6);
    
INSERT INTO habitations VALUES
    (1, 'studio', 20, 300000, 'Paris', 'west'),
    (2, 'villa', 300, 4000000, 'Ibiza', 'south'),
    (3, 'farmhouse', 200, 300000, 'Miskolc', 'east'),
    (4, 'house', 150, 700000, 'Milan', 'south'),
    (5, 'manor', 170, 500000, 'Sighisoara', 'north'),
    (6, 'duplex', 75, 400000, 'Tokyo', 'west'),
    (7, 'villa', 400, 5000000, 'Dubaï', 'south'),
    (8, 'house', 140, 600000, 'Vienna', 'north'),
    (9, 'loft', 45, 500000, 'Montreal', 'west'),
    (10, 'triplex', 220, 700000, 'Los angeles','south');


    
INSERT INTO conn(conn_habitation, conn_feature) VALUES 
	(1,5),
    (1,6),
    (3,7),
    (4,2),
    (4,3),
    (4,6),
    (5,1),
    (6,2),
    (8,1),
	(10,4);
    
SELECT * FROM features;
SELECT * FROM companies;
SELECT * FROM habitations;
SELECT * FROM conn;
 
DROP VIEW if exists AllData;
CREATE VIEW AllData AS
	SELECT habitation_type, habitation_size, habitation_price, habitation_location, 
		ifnull(feat_name, '=NO EXTRA=') as featureName, 
		ifnull(feat_price, '=NO EXTRA=') as featurePrice
	FROM habitations 
		LEFT JOIN conn ON habitation_id=conn_habitation
		LEFT JOIN features ON feat_id = conn_feature;
SELECT * FROM AllData;

DROP VIEW if exists HabitationExtraPrices;    -- carId + sumExtraPrice
DROP VIEW if exists HabitationTotalPrices;    -- cars.* + totatPrice
SET sql_mode = 'ONLY_FULL_GROUP_BY';
CREATE VIEW HabitationExtraPrices AS
    SELECT conn_habitation, sum(feat_price) as sumExtraPrice, sum(feat_intallation_cost) as sumExtraPriceInst
    FROM features INNER JOIN conn ON feat_id=conn_feature
    GROUP BY conn_habitation;
CREATE VIEW HabitationTotalPrices AS
    SELECT habitations.*, 
        habitation_price+ifnull(sumExtraPrice, 0)+ifnull(sumExtraPriceInst, 0) as totalPrice_hab_feat_instCost
    FROM habitations LEFT JOIN HabitationExtraPrices ON (habitation_id=conn_habitation);
SELECT * FROM HabitationTotalPrices;

    


    