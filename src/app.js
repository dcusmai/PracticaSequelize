const express = require('express');
const morgan = require('morgan');
const { User, Page } = require('./db');
//const { Post } = require('./db');

const server = express();

server.use(express.json()); 
server.use(morgan('dev'));

server.post('/user', async(req, res) => {
    try {
        const { name, lastname, birthday, pages } = req.body;

        const newUser = await User.create({
            name, lastname, birthday
        });

        await newUser.addPage(pages) // NO FUNCIONA: falta crear un método post para Page, crear pages y después relacionarlas con users. En el Thunder Client, tenemos que pasarlo dentro de los atributos al crear un user (post) como pages: [id, id, ...] de las páginas que queremos relacionar al user.
        // await newUser.addPost(posts) // Funciona igual que addPage
        // addPage y addPost son métodos de Sequelize.
        res.status(200).json(newUser);

    } catch (error) {
        res.status(404).send(error.message)
    }
});

server.get('/user/?', async (req, res) => {
    try {
        const { name } = req.query;

        if(!name) { // Si no le llega un name por query, muestra todos
            const allUsers = await User.findAll(
                // {attributes: ['name', 'lastname']} // Le puedo pasar a findAll un parámetro que es un objeto y dentro la propiedad attibutes que es un array con los atributos que quiero mostrar. Muestra solo esos y ovbia los demás.
                // {attributes: {exclude: ['birthday']}} // O le puedo pasar lo que queiro que excluya.
                );
    
            res.status(200).json(allUsers);
        } else {
            const usersByName = await User.findAll({ // Pero si le llega un name por query, muestra los que coinciden con el name
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

server.post('/user/find', async (req, res) => {
    try {
        const { name, lastname, birthday } = req.body;
        const user = await User.findOrCreate({
            where: { name },
            defaults: {
                lastname,
                birthday
            }
        });

        res.status(200).json(user);

    } catch (error) {
        res.status(404).send(error.message);
    }
})

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