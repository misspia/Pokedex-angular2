const express = require('express');
const app = express();
const port = 3001;

const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/pokedex';
const { Client } = require('pg');

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

const QP = {
	query: (tables, where, target) => {
		const tablesArr = tables.split(',');
		const additionalArg = where === '*' ? '' : `WHERE ${where}='${target}'`;	
		const queryString = QP.eachTable(tablesArr, additionalArg);
		console.log(queryString);

		const client = new Client({connectionString});
		client.connect();
		
		return new Promise( (resolve, reject) => {
			client.query(queryString)
			.then((res) => {
				console.log('SUCCESS');
				const prettyResult = QP.prettifyResult(tablesArr, res);
				resolve(JSON.stringify(prettyResult));
			})
			.catch((err) => {
				console.log('QUERY ERROR :(', err);
				reject(err);
			});
		})
	},
	selectString: (table, additionalArg) => {
		return `SELECT * FROM ${schema[table]} ${additionalArg};\n`;
	},
	eachTable: (tables, additionalArg) => {
		let queryString = ``;
		tables.forEach((table) => {
			queryString += QP.selectString(table, additionalArg);
		});
		return queryString;
	},
	prettifyResult: (tables, result) => {
		if(tables.length === 1) return QP.prettifySingleTable(tables[0], result);
		return QP.prettifyMultiTable(tables, result);
	},
	prettifyMultiTable: (tables, result) => {
		const pretty = {};
		tables.forEach((table, index) => {
			pretty[table] = result[index].rows;
		});
		return pretty;
	},
	prettifySingleTable: (tableName, result) => {
		const pretty = {
			[tableName]: result.rows
		};
		return pretty;
	}
}

//EXAMPLES:
// http://localhost:3001/api/category=main,location&where=unique_id&target=n1
// http://localhost:3001/api/category=evolutions&where=*&target=*
app.get('/api/category=:category&where=:where?&target=:target?', (req, res) => {
	let queryString = "";
	const tables = req.params.category;
	const target = req.params.target;
	const where = req.params.where;
	QP.query(tables, where, target)
	.then((data) => {
		res.send(data);
	})
	.catch((err) => {
		res.send(err);
	});
});

app.listen(port, () => {
	console.log('Listening on port ', port);
});