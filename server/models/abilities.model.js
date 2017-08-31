const QP = require('./qp.js');
const schema = require('./schema.js');

const tables = {
	all: ['abilities_description'],
	name: ['abilities_description'],
	learn: ['abilities'],
	pid: ['abilities'],
	type: ['moves_description'],
	category: ['moves_description']
};

const Model = {
	all: () => {
		const queryString = QP.eachTable(tables.all);

		return QP.query(tables.all, queryString)
			.then((res) => { return res; })
			.catch((err) => { return err; });
	},
	name: (name) => {
		const whereCondition = QP.whereCondition(`name='${name}'`);
		const queryString = QP.eachTable(tables.name, whereCondition);

		return QP.query(tables.name, queryString)
			.then((res) => { return res; })
			.catch((err) => { return err; });
	},
	learn: (name) => {
		const whereCondition = QP.whereCondition(`ability='${name}'`);
		const queryString = QP.eachTable(tables.learn, whereCondition);

		return QP.query(tables.learn, queryString)
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