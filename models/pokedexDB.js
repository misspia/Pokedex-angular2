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

const tables = {
	pokemon: [
		"pokedex.main", " pokedex.general", "pokedex.moves", 
		"pokedex.base_stats", "pokedex.min_stats", "pokedex.max_stats",
		"pokedex.training", "pokedex.types", "pokedex.location"
	],
	abilities: ["pokedex.abilities_description"],
	moves: ["pokedex.moves_description"],
	types: ["pokedex.types_chart"]
};

function generateQueryString(tables, field, target) {
	let queryString = "";
	
	if(field == '*') {
		for(let i = 0; i < tables.length; i ++) {
			queryString += "SELECT * FROM " + tables[i] + ";\n";
		} 	
	} else {
		for(let i = 0; i < tables.length; i ++) {
			queryString += "SELECT * FROM " + tables[i] + " WHERE " + field + "='" + target + "';\n";
		};
	}	
	return queryString;
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
};

// let test = generateQueryString(tables.pokemon, 'unique_id', 'n1');
// console.log(test);

// let result = jsonifyDBQuery(test).then( (data) => {
// 	console.log(data);
// });


app.get('/api/pokedex/n1', (req, res) => {
	let queryString = generateQueryString(tables.pokemon, 'unique_id', 'n1');

	jsonifyDBQuery(queryString).then( (data) => {
		res.send(data);
	});
});

app.get('/api/types_chart', (req, res) => {
	let queryString = generateQueryString(tables.types, '*');

	jsonifyDBQuery(queryString).then( (data) => {
		res.send(data);
	})
});

app.get('/api/moves_description', (req, res) => {
	let queryString = generateQueryString(tables.moves, '*');

	jsonifyDBQuery(queryString).then( (data) => {
		res.send(data);
	})
});

app.get('/api/abilities_description', (req, res) => {
	let queryString = generateQueryString(tables.abilities, '*');

	jsonifyDBQuery(queryString).then( (data) => {
		res.send(data);
	})
});

app.listen(port, () => {
	console.log('Listening on port ' + port);
});

