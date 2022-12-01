const options = {
    client: 'sqlite3',
    connection: {
        filename: "./DB/messagesDB.sqlite",
    },
    useNullAsDefault: true
}
console.log(options)

module.exports = {
    options
}