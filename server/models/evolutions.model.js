const QP = require('../helpers/qp.js');
const schema = require('./schema.js');
const PokedexModel = require('./pokedex.model.js');

const QPEvolutions = {
	findEvoTable: (tables) => {
		return tables.indexOf('evolutions');
	},
	initialQuery: (client, tables, where, target) => {
		return PokedexModel.query(client, tables, where, target)
		.then((res) => {
			console.log('EVOS SUCCESS', res);
			console.log(res);
			return res;
		})
	}
};

const Evolutions = {
	query: (client, tables, where, target) => {
		const evoTableIndex = QPEvolutions.findEvoTable(tables);
		return QPEvolutions.initialQuery(client, tables, where, target)
		.then((res) => {

			return res;
		})

	}
};

module.exports = Evolutions;