const QP = require('./qp.js');
const schema = require('./schema.js');

const tables = {
	chart: ['types_chart'],
	all: ['types'],
	type: ['types'],
	pid: ['types'],
};

const Model = {
	chart: () => {
		const queryString = QP.eachTable(tables.chart);

		return QP.query(tables.chart, queryString)
			.then((res) => { return res; })
			.catch((err) => { return err; });
	},
	all: () => {
		const queryString = QP.eachTable(tables.all);

		return QP.query(tables.all, queryString)
			.then((res) => { return res; })
			.catch((err) => { return err; });
	},
	type: (type) => {
		const typeArr = type.split(',');
		const whereCondition = QP.multiWhere('OR', 'type=', typeArr);
		const queryString = QP.eachTable(tables.type, whereCondition);
		console.log(queryString);

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