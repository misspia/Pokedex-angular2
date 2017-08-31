const Moves = require('../models/moves.model.js');

const Controller = {
	all: (req, res) => {
		Moves.all()
			.then((data) => { res.send(data); })
			.catch((err) => { res.send( err); });
	},
	name: (req, res) => {
		Moves.name(req.params.name)
			.then((data) => { res.send(data); })
			.catch((err) => { res.send(err); });
	},
	learn: (req, res) => {
		Moves.learn(req.params.name)
			.then((data) => { res.send(data); })
			.catch((err) => { res.send(err); });
	},
	pid: (req, res) => {
		Moves.pid(req.params.pid)
			.then((data) => { res.send(data); })
			.catch((err) => { res.send(err); });
	},
	type: (req, res) => {
		Moves.type(req.params.type)
			.then((data) => { res.send(data); })
			.catch((err) => { res.send(err); });
	},
	category: (req, res) => {
		Moves.category(req.params.category)
			.then((data) => { res.send(data); })
			.catch((err) => { res.send(err); });
	}
};

module.exports = Controller;