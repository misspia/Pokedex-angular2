const Controller = require('./controller.js');
const express = require('express');
const app = express();
const port = 3001;

//EXAMPLES:
// http://localhost:3001/api/category=main,location&where=unique_id&target=n1
// http://localhost:3001/api/category=evolutions&where=*&target=*
app.get('/api/category=:category&where=:where?&target=:target?', (req, res) => {
	let queryString = "";
	const tables = req.params.category;
	const target = req.params.target;
	const where = req.params.where;
	Controller.query(tables, where, target)
	.then((data) => {
		res.send(data);
	})
	.catch((err) => {
		res.send(err);
	});
});

app.listen(port, () => {
	console.log('Listening on port ', port);
});