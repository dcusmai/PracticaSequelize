const express = require('express');
const morgan = require('morgan');
const { User } = require('./db');
//const { Post } = require('./db');

const server = express();

server.use(express.json()); 
server.use(morgan('dev'));

server.post('/user', async(req, res) => {
    try {
        const { name, lastname, birthday } = req.body;

        const newUser = await User.create({
            name, lastname, birthday
        });

        res.status(200).json(newUser);

    } catch (error) {
        res.status(404).send(error.message)
    }
});

server.get('/user/?', async (req, res) => {
    try {
        const { name } = req.query;

        if(!name) {
            const allUsers = await User.findAll();
    
            res.status(200).json(allUsers);
        } else {
            const usersByName = await User.findAll({ 
                where: { 
                    name // Esto es lo mismo que {name: name} porque tienen el mismo valor
                }
            });

            res.status(200).json(usersByName);
        }


    } catch (error) {
        res.status(404).send(error.message);
    }
});

server.delete('/user/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const userDeleted = await User.findByPk(id);
        userDeleted.destroy();

        res.status(200).json(userDeleted)

    } catch (error) {
        res.status(404).send(error.message)
    }
});

server.get('/user/:id', async (req, res) => {
    try{
        const { id } = req.params;        
        const userById = await User.findByPk(id);

        if(!userById) throw new Error('Usuario no encontrado');

        res.status(200).json(userById);

    }catch (error) {
        res.status(404).send(error.message)
    }
});

module.exports = server;