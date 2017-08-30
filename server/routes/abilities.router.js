const router = require('express').Router();

router.get('/all', (req, res) => {
	res.send('get all abilities descriptions');
});

router.get('/', (req, res) => {
	res.send('get specific ability based on ability identifier');
})

module.exports = router;