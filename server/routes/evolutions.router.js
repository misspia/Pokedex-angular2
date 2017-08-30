const router = require('express').Router();

router.get('/all', (req, res) => {
	res.send('get all evos');
});

router.get('/', (req, res) => {
	res.send('get specific evo tree based on base unique_id');
})

module.exports = router;