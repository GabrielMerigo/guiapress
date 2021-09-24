const Sequelize = require('sequelize');

const connection = new Sequelize('guiapress', 'root', 'flashzika2003', {
  host: 'localhost',
  dialect: 'mysql'
})

module.exports = connection;