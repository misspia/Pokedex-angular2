const schema = require('../models/schema.js');

const QP = {
	selectString: (table, whereCondition) => {
		return `SELECT * FROM ${schema[table]} ${whereCondition};\n`;
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