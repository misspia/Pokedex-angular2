const router = require('express').Router();

router.get('/all', (req, res) => {
	res.send('get all type defences from types_chart');
});

router.get('/', (req, res) => {
	res.send('get specific type defence');
})

module.exports = router;