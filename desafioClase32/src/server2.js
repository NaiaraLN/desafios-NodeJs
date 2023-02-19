import express from 'express';
import randomRouter from './router/randomRouter.js';

const app = express();

app.use('/api/randoms', randomRouter)

const numCPUs = os.cpus().length

const modoCluster = process.argv[3] == "CLUSTER";
if (modoCluster && cluster.isPrimary) {
    console.log(numCPUs)
    console.log(`PID MASTER ${process.pid}`)

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
    }

    cluster.on('exit', worker => {
        console.log('Worker', worker.process.pid, 'died', new Date().toLocaleString())
        cluster.fork()
    })
}else{
    const PORT = parseInt(process.argv[2]) || 8081
    const server = app.listen(PORT, () => {
        console.log(`Servidor escuchando en el puerto ${server.address().port}`)
    })
    server.on('error', error => console.log(`Error en servidor ${error}`))
}