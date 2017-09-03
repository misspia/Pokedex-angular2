const config = require('../../config/local.json');
const { Client } = require('pg');
const schema = require('../models/schema.js');

const client = new Client({
	user: config.pg.user,
	host: config.pg.host,
	database: config.pg.database,
	password: config.pg.password,
	port: config.pg.port
});
client.connect();

const QP = {
	query: (tables, queryString) => {
		return new Promise( (resolve, reject) => {
			client.query(queryString)
			.then((res) => {
				console.log('SUCCESS');
				const prettyResult = QP.prettifyResult(tables, res);
				resolve(prettyResult);
			})
			.catch((err) => {
				console.log('ERROR :(', err);
				reject(err);
			});
		}) 
	},
	selectString: (table, whereCondition='') => {
		return `SELECT * FROM ${schema[table]} ${whereCondition};\n`;
	},
	whereCondition: (condition) => {
		return `WHERE ${condition}`;
	},
	multiWhere: (predicate='AND', prefix, conditions) => {		// ex prefix: unique_id=
		let where = QP.whereCondition(`${prefix}'${conditions[0]}'`)
		conditions.forEach((condition, index) => {
			if(index === 0) return;
			where += ` ${predicate} ${prefix}'${condition}'`;
		});
		return where;
	},
	eachTable: (tables, whereCondition) => {
		let queryString = ``;
		tables.forEach((table) => {
			queryString += QP.selectString(table, whereCondition);	
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

module.exports = QP;