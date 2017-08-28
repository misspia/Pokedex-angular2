const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/pokedex';
const { Client } = require('pg');

const schema = require('./models/schema.js');

const QP = {
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
};

const Controller = {
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
	}
};

module.exports = Controller;