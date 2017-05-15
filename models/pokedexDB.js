// http://mherman.org/blog/2015/02/12/postgresql-and-nodejs/#.WM3SshLyvfY?
// https://github.com/brianc/node-postgres/wiki/Client

// https://gigadom.wordpress.com/2014/07/20/working-with-node-js-and-postgresql/
// http://stackoverflow.com/questions/9205496/how-to-make-connection-to-postgres-via-node-js
// http://stackoverflow.com/questions/17441495/returning-result-from-select-with-node-postgres

const express = require('express');

const app = express();
const port = 3001;

const pg = require('pg');
const path = require('path');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/pokedex';

const client = new pg.Client(connectionString);
client.connect();

// const queryStrings = {
// 	main: "SELECT * FROM pokedex.main;", 
// 	general: "SELECT * FROM pokedex.general;",
// 	moves: "SELECT * FROM pokedex.moves;",
// 	evolutions: "SELECT * FROM pokedex.evolutions", //returns empty array
// 	baseStats:"SELECT * FROM pokedex.base_stats",
// 	minStats:"SELECT * FROM pokedex.min_stats",
// 	maxStats:"SELECT * FROM pokedex.max_stats",
// 	training: "SELECT * FROM pokedex.training",
// 	types: "SELECT * FROM pokedex.types",
// 	location: "SELECT * FROM pokedex.location",
// 	abilitiesDescription: "SELECT * FROM pokedex.abilities_description", //returns empty array
// 	movesDescription: "SELECT * FROM pokedex.moves_description", //returns empty array
// 	typesChart: "SELECT * FROM pokedex.types_chart" //returns empty array
// };

function getPokemonData(id, table) {
	return 'SELECT * FROM pokedex.' + table + 'WHERE unique_id=' + id; 
}


function jsonifyDBQuery(queryString) {
	let rows = [];
	let query = client.query(queryString);	
	
	query.on("row", function (row, result) {
	    result.addRow(row);
	});

	return new Promise( (resolve, reject) => {

		query.on("end", function (result) {
			resolve(JSON.stringify(result.rows));
		    client.end();
		});	
	})

}

// let test = jsonifyDBQuery(queryStrings.typesChart).then( (data) => {
// 	console.log(data);
// })

//ISSUES: 
// - each table quey only goes up to 172 ** UPDATE: queries arent working properly, wrong # of rows
// - socket connection is brokern when more than 1 request is made
// dont forget to install postgres on computer + run the initial set up queries

// app.get('/api/pokedex/master-list', (req, res) => {
// 	jsonifyDBQuery(queryStrings.main).then( (data) => {
// 		res.send(data);
// 	});
// });

// app.get('/api/pokedex/general', (req, res) => {
// 	jsonifyDBQuery(queryStrings.general).then( (data) => {
// 		res.send(data);
// 	});
// });

// app.get('/api/pokedex/moves', (req, res) => {
// 	jsonifyDBQuery(queryStrings.moves).then( (data) => {
// 		res.send(data);
// 	});
// });

// //evolutions go here

// app.get('/api/pokedex/base_stats', (req, res) => {
// 	jsonifyDBQuery(queryStrings.baseStats).then( (data) => {
// 		res.send(data);
// 	});
// });

// app.get('/api/pokedex/min_stats', (req, res) => {
// 	jsonifyDBQuery(queryStrings.minStats).then( (data) => {
// 		res.send(data);
// 	});
// });

// app.get('/api/pokedex/max_stats', (req, res) => {
// 	jsonifyDBQuery(queryStrings.maxStats).then( (data) => {
// 		res.send(data);
// 	});
// });

// app.get('/api/pokedex/training', (req, res) => {
// 	jsonifyDBQuery(queryStrings.training).then( (data) => {
// 		res.send(data);
// 	});
// });

// app.get('/api/pokedex/types', (req, res) => {
// 	jsonifyDBQuery(queryStrings.types).then( (data) => {
// 		res.send(data);
// 	});
// });


// app.get('/api/pokedex/location', (req, res) => {
// 	jsonifyDBQuery(queryStrings.location).then( (data) => {
// 		res.send(data);
// 	});
// });

// abilities description goes here

// moves description goes here

// types chart goes here

app.listen(port, () => {
	console.log('Listening on port ' + port);
});

