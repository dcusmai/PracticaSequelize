require('dotenv').config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
const { Sequelize } = require('sequelize');
const  userModel = require('./models/User');
const postModel = require('./models/Post');


const database = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
    logging: false
});

userModel(database);
postModel(database);

module.exports = {
    database,
    ...database.models
}