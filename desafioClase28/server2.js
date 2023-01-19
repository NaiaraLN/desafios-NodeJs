import express from 'express';
import randomRouter from './router/randomRouter.js';

const app = express();

app.use('/api/randoms', randomRouter)

const PORT = 8000;
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))