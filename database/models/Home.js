const Sequelize = require('sequelize');
const db = require('../index');

module.exports = db.define('homes', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  address: {
    type: Sequelize.STRING,
  },
  dateOfPosting: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  numberOfLikes: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  numberOfBathroom: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  numberOfBedroom: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  homeValue: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  sqft: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  streetName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  cityName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  stateName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  zipCode: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  homeImage: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
