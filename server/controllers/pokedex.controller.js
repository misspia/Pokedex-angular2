const Pokedex = require('../models/pokedex.model.js');

const Controller = {
	all: (req, res) => {
		Pokedex.all()
			.then((data) => { res.send(data); })
			.catch((err) => { res.send( err); });
	},
	id: (req, res) => {
		Pokedex.id(req.params.id)
			.then((data) => { res.send(data); })
			.catch((err) => { res.send(err); });
	}
};

module.exports = Controller;