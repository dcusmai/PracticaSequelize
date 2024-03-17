require('dotenv').config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
const { Sequelize } = require('sequelize');
const  userModel = require('./models/User');
const postModel = require('./models/Post');
const pageModel = require('./models/Page');


const database = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
    logging: false
});

userModel(database);
postModel(database);
pageModel(database);

const { User, Post, Page } = database.models;

//Relación 1:M =>
User.hasMany(Post); // las Foreign Keys (FK) se crean automáticamente.
Post.belongsTo(User);

//Relación  M:M =>
User.belongsToMany(Page, {through: 'UserPage'}); // Esto crea la tabla intermedia entre User y Page. La relación se establece colocalndo el mismo nombre en User y Page: UserPage
Page.belongsToMany(User, {through: 'UserPage'});

module.exports = {
    database,
    ...database.models
}