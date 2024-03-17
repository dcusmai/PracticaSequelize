const { DataTypes } = require('sequelize');

module.exports = (database) => {
    database.define('Page', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        page_name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
}