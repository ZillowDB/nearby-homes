require('newrelic');
const express = require('express');
const cassandra = require('cassandra-driver');
const bodyParser = require('body-parser');
require('circular-json');

const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

const { PlainTextAuthProvider } = cassandra.auth;
const client = new cassandra.Client({ contactPoints: ['localhost'], authProvider: new PlainTextAuthProvider('cassandra', 'cassandra'), protocolOptions: { port: 9042 } });

router.post('/', (req, res) => {
  const homeInfo = req.body;
  const query = 'INSERT INTO neighborhood.homes (id, address, dateOfPosting, status, numberOfLikes, '
  + 'numberOfBathroom, numberOfBedroom, homeValue, sqft, cityName, stateName, zipCode, homeImage)'
  + ' VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const params = [homeInfo.id, homeInfo.address, homeInfo.dateOfPosting,
    homeInfo.status, homeInfo.numberOfLikes, homeInfo.numberOfBathroom,
    homeInfo.numberOfBedroom, homeInfo.homeValue, homeInfo.sqft,
    homeInfo.cityName, homeInfo.stateName, homeInfo.zipCode, homeInfo.homeImage];

  client.execute(query, params)
    .then(() => res.status(200))
    .catch(err => res.status(404).send(err));
});

router.put('/homes/:homeid/nearbyHomes', (req, res) => {
  const query = 'UPDATE neighborhood.homes SET (id=?, address=?, dateOfPosting=?, status=?, numberOfLikes=?, numberOfBathroom=?,'
  + ' numberOfBedroom=?, homeValue=?, sqft=?, cityName=?, stateName=?, zipCode=?, homeImage=?) WHERE id = ?';
  const currentHouse = req.params.homeid;
  const infoParams = [currentHouse.id, currentHouse.address, currentHouse.dateOfPosting,
    currentHouse.status, currentHouse.numberOfLikes,
    currentHouse.numberOfBathroom, currentHouse.numberOfBedroom, currentHouse.homeValue,
    currentHouse.sqft, currentHouse.cityName, currentHouse.stateName, currentHouse.zipCode,
    currentHouse.homeImage, currentHouse];

  client.execute(query, infoParams)
    .then(results => res.status(200).json(results))
    .catch(err => res.status(404).send(err));
});

router.put('/addresses/:address/nearbyHomes', (req, res) => {
  const query = ('UPDATE neighborhood.homes SET (id=?, address=?, dateOfPosting=?, status=?, numberOfLikes=?, numberOfBathroom=?'
  + 'numberOfBedroom=?, homeValue=?, sqft=?, cityName=?, stateName=?, zipCode=?, homeImage=?) WHERE address = ?');
  const currentAddress = (req.params.address).replace('-', ' ');
  const currentHouse = req.body;
  const infoParams = [currentHouse.id, currentHouse.address, currentHouse.dateOfPosting,
    currentHouse.status, currentHouse.numberOfLikes,
    currentHouse.numberOfBathroom, currentHouse.numberOfBedroom, currentHouse.homeValue,
    currentHouse.sqft, currentHouse.cityName, currentHouse.stateName, currentHouse.zipCode,
    currentHouse.homeImage, currentAddress];

  client.execute(query, infoParams)
    .then(results => res.status(200).json(results))
    .catch(err => res.status(404).send(err));
});

router.delete('/homes/:homeid/nearbyHomes', (req, res) => {
  const params = req.params.homeid;
  const query = 'DELETE * FROM neighborhood.homes where id = ?';

  client.execute(query, params)
    .then(results => res.status(200).json(results))
    .catch(err => res.status(404).send(err));
});

router.delete('/addresses/:address/nearbyHomes', (req, res) => {
  const params = (req.params.address).replace('-', ' ');
  const query = 'DELETE FROM neighborhood.homes where address = ?';

  client.execute(query, params)
    .then(results => res.status(200).json(results))
    .catch(err => res.status(404).send(err));
});

router.get('/homes/:homeid/nearbyHomes', (req, res) => {
  const paramsOne = [req.params.homeid];
  const queryOne = 'SELECT * FROM neighborhood.homes WHERE id = ?';
  const queryTwo = 'SELECT * FROM neighborhood.homes WHERE zipCode = ?';

  client.execute(queryOne, paramsOne, { prepare: true })
    .then(results => client.execute(queryTwo, [results.rows[0].zipcode], { prepare: true }))
    .then(result => res.send(result))
    .catch(err => res.status(404).send(err));
});

router.get('/addresses/:address/nearbyHomes', (req, res) => {
  const queryOne = 'SELECT * FROM neighborhood.homes WHERE address = ?';
  const params = (req.params.address).replace('-', ' ');
  const queryTwo = 'SELECT * FROM neighborhood.homes WHERE zipcode = ?';

  client.execute(queryOne, params, { prepare: true })
    .then(results => client.execute(queryTwo, [results.rows[0].zipcode], { prepare: true }))
    .then(result => res.send(result))
    .catch(err => res.status(404).send(err));
});

module.exports = router;
