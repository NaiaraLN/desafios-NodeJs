const options = {
    client: 'sqlite3',
    connection: {
        filename: "./DB/messagesDB.sqlite",
    },
    useNullAsDefault: true
}


module.exports = {
    options
}