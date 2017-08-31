const QP = require('./qp.js');
const schema = require('./schema.js');

const tables = {
	all: ['types_chart'],
	type: ['types'],
	pid: ['types'],
};

const Model = {
	all: () => {
		const queryString = QP.eachTable(tables.all);

		return QP.query(tables.all, queryString)
			.then((res) => { return res; })
			.catch((err) => { return err; });
	},
	type: (type) => {
		const whereCondition = QP.whereCondition(`type='${type}'`);
		const queryString = QP.eachTable(tables.type, whereCondition);

		return QP.query(tables.type, queryString)
			.then((res) => { return res; })
			.catch((err) => { return err; });
	},
	pid: (pid) => {
		const whereCondition = QP.whereCondition(`unique_id='${pid}'`);
		const queryString = QP.eachTable(tables.pid, whereCondition);

		return QP.query(tables.pid, queryString)
			.then((res) => { return res; })
			.catch((err) => { return err; });
	}
};

module.exports = Model;