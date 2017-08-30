const router = require('express').Router();

router.get('/all', (req, res) => {
	res.send('get all pokemon');
});

router.get('/', (req, res) => {
	res.send('get specific pokemon based on base unique_id');
})

module.exports = router;

//EXAMPLES:
// http://localhost:3001/api/category=main,location&where=unique_id&target=n1
// http://localhost:3001/api/category=evolutions&where=*&target=*
// app.get('/api/pokemon/category=:category&where=:where?&target=:target?', (req, res) => {
// 	const tables = req.params.category;
// 	const target = req.params.target;
// 	const where = req.params.where;
// 	res.send(req.url);
// 	// Controller.query(tables, where, target)
// 	// .then((data) => {
// 	// 	res.send(data);
// 	// })
// 	// .catch((err) => {
// 	// 	res.send(err);
// 	// });
// });