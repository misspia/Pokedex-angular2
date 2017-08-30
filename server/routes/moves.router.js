const router = require('express').Router();

router.get('/all', (req, res) => {
	res.send('get all moves descriptions');
});

router.get('/', (req, res) => {
	res.send('get specific move based on base move identifier');
})

module.exports = router;