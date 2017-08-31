const QP = require('./qp.js');
const schema = require('./schema.js');

const tables = {
	all: ['main'],
	pid: ['main', 'general', 'moves', 'base_stats', 'min_stats', 'max_stats', 'training', 'types', 'location']
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
	pid: (pid) => {
		const whereCondition = QP.whereCondition(`unique_id='${pid}'`);
		const queryString = QP.eachTable(tables.pid, whereCondition);

		return QP.query(tables.pid, queryString)
		.then((res) => {
			return res;
		}) 
		.catch((err) => {
			return err;
		})
	}
}

module.exports = Model;