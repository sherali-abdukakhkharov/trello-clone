const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'node-express',
    'root',
    '12345678sh',
    {dialect: 'mysql', host: 'localhost'}
);

module.exports = sequelize;