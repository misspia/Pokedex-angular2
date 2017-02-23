// https://youtu.be/DjUVlOg2wXM?t=5m49s

// https://docs.microsoft.com/en-us/azure/sql-database/sql-database-develop-nodejs-simple


var mysql = require('mysql');
var readline = require('readline');

var con = mysql.createConnection({
	host:'localhost',
	user: 'root',
	password: '',
	database: 'pokedex'
});

con.connect(function(err) {
	if(err) {

		console.log('Error connecting to db: ' + err);

	}
})