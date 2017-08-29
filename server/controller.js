const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/pokedex';
const { Client } = require('pg');

const schema = require('./models/schema.js');
const Evolutions = require('./models/evolutions.js');
const Default = require('./models/default.js');

const Controller = {
	query: (tables, where, target) => {
		const tablesArr = tables.split(',');
		const client = new Client({connectionString});
		client.connect();

		if(tablesArr.indexOf('evolutions') != -1) {
			return Evolutions.query(client, tablesArr, where, target)
			.then((res) => {
				return res;
			});
		} else {
			return Default.query(client, tablesArr, where, target)
			.then((res) => {
				return res;
			});
		}
	}
};

module.exports = Controller;