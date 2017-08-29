const QP = require('../helpers/qp.js');

const Default =  {
	query: (client, tables, where, target) => {
		const whereCondition = where === '*' ? '' : `WHERE ${where}='${target}'`;	
		const queryString = QP.eachTable(tables, whereCondition);
		console.log(queryString);

		return new Promise( (resolve, reject) => {
			client.query(queryString)
			.then((res) => {
				console.log('SUCCESS');
				const prettyResult = QP.prettifyResult(tables, res);
				resolve(JSON.stringify(prettyResult));
			})
			.catch((err) => {
				console.log('QUERY ERROR :(', err);
				reject(err);
			});
		})
	}
};

module.exports = Default;