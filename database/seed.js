const faker = require('faker');
const fs = require('fs');

const rockvilleZipCodes = [20847, 20848, 20849, 20850, 20851, 20852, 20853, 20854, 20857, 20877];

const streetNames = new Set();
faker.seed(123);
while (streetNames.size < 1000) {
  streetNames.add(faker.address.streetName());
}
const streetArray = Array.from(streetNames);

const columnNames = ['id', 'address', 'dateOfPosting', 'status', 'numberOfLikes', 'numberOfBathroom',
  'numberOfBedroom', 'homeValue', 'sqft', 'cityName', 'stateName', 'zipCode', 'homeImage'];

const statusName = ['FOR SALE', 'FORECLOSURE', 'AUCTION', 'OFF MARKET', 'FOR RENT', 'SOLD'];

const createRandomNum = function (min, max) {
  return Math.ceil(Math.random() * (max - min)) + (min - 1);
};

const createFakeHomes = function createFakeHomes() {
  fs.writeFileSync('./data.csv', columnNames.join(','));
  for (let j = 0; j < 1000; j += 1) {
    let fakeHomes = '';
    for (let i = 1; i <= 10000; i += 1) {
      const address = `${i} ${streetArray[j]}`;
      const dateOfPosting = `${createRandomNum(2015, 2018)}-${createRandomNum(1, 12)}-${createRandomNum(1, 31)}`;
      const status = statusName[createRandomNum(0, 5)];
      const numberOfLikes = createRandomNum(0, 15);
      const numberOfBathroom = createRandomNum(1, 8);
      const numberOfBedroom = createRandomNum(1, 8);
      const homeValue = createRandomNum(100000, 150000000);
      const sqft = createRandomNum(3000, 15000);
      const cityName = 'Rockville';
      const stateName = 'MD';
      const zipCode = rockvilleZipCodes[createRandomNum(0, 9)];
      const homeImage = 'IMAGE_PNG';
      const home = `${address}, ${dateOfPosting}, ${status}, ${numberOfLikes}, ${numberOfBathroom}, ${numberOfBedroom}, ${homeValue}, ${sqft}, ${cityName}, ${stateName}, ${zipCode}, ${homeImage}`;

      fakeHomes += `${home}\n`;
    }
    fs.appendFileSync('./data.csv', fakeHomes);
  }
};

createFakeHomes();
