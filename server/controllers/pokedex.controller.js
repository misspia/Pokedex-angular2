const Pokedex = require('../models/pokedex.model.js');

const Controller = {
	all: (req, res) => {
		Pokedex.all()
			.then((data) => { res.send(data); })
			.catch((err) => { res.send( err); });
	},
	pid: (req, res) => {
		Pokedex.pid(req.params.pid)
			.then((data) => { res.send(data); })
			.catch((err) => { res.send(err); });
	}
};

module.exports = Controller;