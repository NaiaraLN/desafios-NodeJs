import yargsParse from "yargs/yargs"
const yargs = yargsParse(process.argv.slice(2))

const {port} = yargs
    .boolean('debug')
    .alias({
        p: 'port'
    })
    .default({
        port: 8080,
    })
    .argv

export default port


