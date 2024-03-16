const server = require('./src/app');
const { database } = require('./src/db');

database.sync({ force:true }).then(async () => {
    console.log('Database connected');
    server.listen(3001, () => {
        console.log('Server on port 3001');
    });
})