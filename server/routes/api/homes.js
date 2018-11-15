const express = require('express');
const Home = require('../../../database/models/Home');

const router = express.Router();
const createRandomId = () => Math.floor(Math.random() * 100) + 1;

router.post('/homes', (req, res) => {
  const homeInfo = req.body;
  Home.create(homeInfo)
    .then(() => {
      res.status(200);
    });
});

router.put('/nearbyHomes/homes/:home', (req, res) => {
  const currentHouse = req.body;
  Home.update(currentHouse, {
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.status(200);
    });
});

router.delete('/nearbyHomes/homes/:home', (req, res) => {
  const currentHouse = req.params.home;
  Home.destroy({
    where: {
      id: currentHouse,
    },
  })
    .then(() => {
      res.status(200);
    });
});

router.get('/nearbyHomes/homes/:home', (req, res) => {
  const randomId = createRandomId();
  Home.findByPk(randomId).then((home) => {
    if (!home) {
      return res.status(404).json({ noHomeFound: 'No home found with that ID' });
    }
    const { zipCode } = home;
    Home.findAll({ where: { zipCode }, exclude: [{ id: randomId }] }).then((homes) => {
      if (!homes) {
        return res.status(404).json({ noHomesFound: 'no homes found with that ZIP Code' });
      }
      return res.status(200).json(homes);
    });
  });
});

module.exports = router;
