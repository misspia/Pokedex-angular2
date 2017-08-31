const QP = require('./qp.js');
const schema = require('./schema.js');

const tables = {
	all: ['main'],
	id: ['main', 'general', 'moves', 'base_stats', 'min_stats', 'max_stats', 'training', 'types', 'location']
};

const Model = {
	all: () => {
		const queryString = QP.eachTable(tables.all);

		return QP.query(tables.all, queryString)
		.then((res) => {
			return res;
		})
		.catch((err) => {
			return err;
		});
	},
	id: (id) => {
		const whereCondition = QP.whereCondition(`unique_id='${id}'`);
		const queryString = QP.eachTable(tables.id, whereCondition);

		return QP.query(tables.id, queryString)
		.then((res) => {
			return res;
		}) 
		.catch((err) => {
			return err;
		})
	}
}

module.exports = Model;










