import dotenv from 'dotenv';
dotenv.config()
import yargsParse from "yargs/yargs"

const MONGO_URI = process.env.MONGO_URI

const yargs = yargsParse(process.argv.slice(2))
const {port, mode, persistence} = yargs
    .boolean('debug')
    .alias({
        p: 'port',
        m:'mode',
        per:'persistence'
    })
    .default({
        port: 8080,
        mode: 'FORK',
        persistence:'FILE'
    })
    .argv


export {MONGO_URI, port, mode, persistence}
