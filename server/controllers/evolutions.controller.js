const Evolutions = require('../models/evolutions.model.js');

const Controller = {
	all: (req, res) => {
		Evolutions.all()
			.then((data) => { res.send(data); })
			.catch((err) => { res.send(err); });
	},
	pid: (req, res) => {
		Evolutions.pid(req.params.pid)
			.then((data) => { res.send(data); })
			.catch((err) => { res.send(err); });
	}
};

module.exports = Controller;