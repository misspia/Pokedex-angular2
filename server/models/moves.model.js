const QP = require('./qp.js');
const schema = require('./schema.js');

const tables = {
	all: ['moves_description'],
	name: ['moves_description'],
	learn: ['moves'],
	pid: ['moves'],
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
		const whereCondition = QP.whereCondition(`name='${name}'`);
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
	},
	type: (type) => {
		const whereCondition = QP.whereCondition(`type='${type}'`);
		const queryString = QP.eachTable(tables.type, whereCondition);

		return QP.query(tables.type, queryString)
			.then((res) => { return res; })
			.catch((err) => { return err; });
	},
	category: (category) => {
		const whereCondition = QP.whereCondition(`category='${category}'`);
		const queryString = QP.eachTable(tables.category, whereCondition);

		return QP.query(tables.category, queryString)
			.then((res) => { return res; })
			.catch((err) => { return err; });
	}
};

module.exports = Model;