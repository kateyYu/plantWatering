drop database if exists PlantDB
create database PlantDB
GO
if exists (select TABLE_NAME from INFORMATION_SCHEMA.TABLES where TABLE_NAME = 'Plant')
	drop table Plant

use PlantDB
CREATE TABLE Plant(
	PlantId int identity(1,1),
	PlantName varchar(50),
	WaterDateTime datetime DEFAULT CURRENT_TIMESTAMP,
	IsWatering bit
);	

INSERT into Plant(PlantName,IsWatering) values('plant1', 0);
INSERT into Plant(PlantName,IsWatering) values('plant2', 0);
INSERT into Plant(PlantName,IsWatering) values('plant3', 0);
INSERT into Plant(PlantName,IsWatering) values('plant4', 0);
INSERT into Plant(PlantName,IsWatering) values('plant5', 0);



 
