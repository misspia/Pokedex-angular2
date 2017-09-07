const QP = require('./qp.js');
const schema = require('./schema.js');

const tables = {
	all: ['evolutions'],
	pid: ['evolutions'],
};
const qEvo = {
	query: (tables, queryString) => {
		return qEvo.base(tables, queryString)
			.then(qEvo.stages)
			.catch((err) => { return err})
	},
	base: (tables, queryString) => {
		return QP.query(tables, queryString)
			.then((res) => { return res; })
			.catch((err) => {return err; });
	},
	isStage0: (family) => {
		return family.base == family.stage0;
	},
	stages: (evoObject) => {
		const family = evoObject.evolutions[0]; 
		const members = Object.keys(family).reduce((acc, key) => { 
			if(key == 'base' || key == 'condition') return acc;
			return acc.concat(family[key])
		}, []);
		const whereCondition = QP.multiWhere('OR', 'base=', members);
		const queryString = QP.eachTable(tables.pid, whereCondition);

		return QP.query(tables.pid, queryString)
			.then((res) => {return res; })
			.catch((err) => {return err; });
	}
};

const Model = {
	all: () => {
		const queryString = QP.eachTable(tables.all);

		return QP.query(tables.all, queryString)
			.then((res) => { return res; })
			.catch((err) => { return err; });
	},
	pid: (pid) => {
		const whereCondition = QP.whereCondition(`base='${pid}'`);
		const queryString = QP.eachTable(tables.pid, whereCondition);

		return qEvo.query(tables.pid, queryString)
			.then((res) => { return res; })
			.catch((err) => { return err; });
	}
};

module.exports = Model;

