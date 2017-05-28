// http://mherman.org/blog/2015/02/12/postgresql-and-nodejs/#.WM3SshLyvfY?
// https://github.com/brianc/node-postgres/wiki/Client

const express = require('express');
const app = express();
const port = 3001;

const pg = require('pg');
const path = require('path');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/pokedex';

const schema = {
	main: 'pokedex.main',
	general: 'pokedex.general',
	moves: 'pokedex.moves',
	base_stats: 'pokedex.base_stats',
	min_stats: 'pokedex.min_stats',
	max_stats: 'pokedex.max_stats',
	training: 'pokedex.training',
	types: 'pokedex.types',
	location: 'pokedex.location',
	abilities_description: 'pokedex.abilities_description',
	moves_description: 'pokedex.moves_description',
	types_chart: 'pokedex.types_chart',
	evolutions: 'pokedex.evolutions'
};

function generateQueryString(tableNames, field, target) {
	let queryString = "";
	let tables = tableNames.includes(",") ? tableNames.split(",") : [tableNames];

	if(field == '*') {
		for(let i = 0; i < tables.length; i ++) {
			queryString += "SELECT * FROM " + schema[tables[i]] + ";\n";
		} 	
	} else {
		for(let i = 0; i < tables.length; i ++) {
			queryString += "SELECT * FROM " + schema[tables[i]] + " WHERE " + field + "='" + target + "';\n";
		};
	}	
	return queryString;
}

function generateConditionString(fields, targets) {
	let condition = " WHERE ";
	let fieldsArr = fields.split(",");
	let targetsArr = targets.split(",");

	for(let i = 0; i < fieldsArr.length; i ++) {
		if(i == fieldsArr.length - 1) {
			condition += fieldsArr[i] + "='" + targetsArr[i] + "';\n";
		} else {
			condition += fieldsArr[i] + "='" + targetsArr[i] + "' AND\n";
		}	
	}
	return condition;
}

function jsonifyDBQuery(queryString) {
	
	const client = new pg.Client(connectionString);
	client.connect();
	let query = client.query(queryString);	
	
	query.on("row", function (row, result) {
	    result.addRow(row);
	    // result["test"] = row;
	    console.log(result.test);

	    // console.log(row);
	});

	return new Promise( (resolve, reject) => {
		query.on("end", function (result) {
			resolve(JSON.stringify(result.rows));
			// resolve(JSON.stringify(result.test));
		    client.end();
		});	
	})
};

// jsonifyDBQuery(generateQueryString('types_chart', '*'))
// jsonifyDBQuery(generateQueryString('main,location', 'unique_id', 'n1'))

//EXAMPLES:
// http://localhost:3001/api/category=main,location&field=unique_id&target=n1
// http://localhost:3001/api/category=evolutions&field=*&target=false

app.get('/api/category=:category&field=:field&target=:target?', (req, res) => {
	let queryString = "";
	let tables = req.params.category;

	if(req.params.target) {
		queryString = generateQueryString(tables, req.params.field, req.params.target);
	} else {
		queryString = generateQueryString(tables, req.params.field);
	}
	jsonifyDBQuery(queryString).then( (data) => {
		res.send(data);
	});
});

app.listen(port, () => {
	console.log('Listening on port ' + port);
});

