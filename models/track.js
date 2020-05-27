const Sequelize = require('sequelize')
const sequelize = new Sequelize('sqlite://db.sqlite')

const Track = sequelize.define('track', {
    // attributes
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    color: {
        type: Sequelize.STRING,
        defaultValue: '#ffff',
        allowNull: false
    }
}, {
    // options
});

module.exports = Track;