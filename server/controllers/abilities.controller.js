const Abilities = require('../models/abilities.model.js');

const Controller = {
	all: (req, res) => {
		Abilities.all()
			.then((data) => { res.send(data); })
			.catch((err) => { res.send( err); });
	},
	name: (req, res) => {
		Abilities.name(req.params.name)
			.then((data) => { res.send(data); })
			.catch((err) => { res.send(err); });
	},
	learn: (req, res) => {
		Abilities.learn(req.params.name)
			.then((data) => { res.send(data); })
			.catch((err) => { res.send(err); });
	},
	pid: (req, res) => {
		Abilities.pid(req.params.pid)
			.then((data) => { res.send(data); })
			.catch((err) => { res.send(err); });
	}
};

module.exports = Controller;