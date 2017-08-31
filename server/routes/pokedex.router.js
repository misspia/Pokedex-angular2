const router = require('express').Router();
const Pokedex = require('../controllers/pokedex.controller.js');

//EXAMPLES:
// http://localhost:3001/api/v1/pokedex/all
// http://localhost:3001/api/v1/pokedex/id/n1

router.get('/all', Pokedex.all);
router.get('/id/:id', Pokedex.id);

module.exports = router;