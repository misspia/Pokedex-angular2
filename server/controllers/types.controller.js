const Types = require('../models/types.model.js');

const Controller = {
	chart: (req, res) => {
		Types.chart()
			.then((data) => { res.send(data); })
			.catch((err) => { res.send( err); });
	},
	all: (req, res) => {
		Types.all()
			.then((data) => { res.send(data); })
			.catch((err) => { res.send(err); });
	},
	type: (req, res) => {
		Types.type(req.params.type)
			.then((data) => { res.send(data); })
			.catch((err) => { res.send(err); });
	},
	pid: (req, res) => {
		Types.pid(req.params.pid)
			.then((data) => { res.send(data); })
			.catch((err) => { res.send(err); });
	}
};

module.exports = Controller;