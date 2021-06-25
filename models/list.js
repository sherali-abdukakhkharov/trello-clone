const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const List = sequelize.define('list', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = List;