DROP KEYSPACE IF EXISTS neighborhood;
DROP TABLE IF EXISTS neighborhood.homes;
CREATE KEYSPACE IF NOT EXISTS neighborhood WITH REPLICATION = {'class': 'SimpleStrategy', 'replication_factor': 1};
USE neighborhood;

CREATE TABLE IF NOT EXISTS neighborhood.homes(
    id INT PRIMARY KEY,
    address TEXT,
    dateOfPosting TEXT,
    status TEXT,
    numberOfLikes INT,
    numberOfBathroom INT,
    numberOfBedroom INT,
    homeValue INT,
    sqft INT,
    cityName TEXT,
    stateName TEXT,
    zipCode INT,
    homeImage TEXT
); 

COPY neighborhood.homes (id, address, dateOfPosting, status, numberOfLikes, numberOfBathroom, numberOfBedroom, homeValue, sqft, cityName, stateName, zipCode, homeImage) FROM '/Users/kathrynhoesley/Desktop/nearby-homes/data.csv' WITH DELIMITER=',' AND HEADER=TRUE; 

CREATE INDEX zip_index on neighborhood.homes (zipCode);