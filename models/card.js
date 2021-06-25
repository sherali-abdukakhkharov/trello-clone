const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Card = sequelize.define('card', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },

    description: Sequelize.STRING
});

module.exports = Card;