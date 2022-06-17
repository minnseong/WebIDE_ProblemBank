const mysql = require('mysql2/promise')

const connection = mysql.createPool({
	host: 'localhost',
	port: '3306',
	user: 'root',
	password: '1234',
	database: 'problems',

    connectionLimit: 100,
	connectTimeout: 600000
})

module.exports = connection;