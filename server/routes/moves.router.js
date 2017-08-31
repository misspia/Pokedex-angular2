const router = require('express').Router();
const Moves = require('../controllers/moves.controller.js');

// Examples
// http://localhost:3001/api/v1/moves/all
// http://localhost:3001/api/v1/moves/name/Cotton%20Spore
// http://localhost:3001/api/v1/moves/learn/Acid
// http://localhost:3001/api/v1/moves/pid/n1
// http://localhost:3001/api/v1/moves/type/Grass
// http://localhost:3001/api/v1/moves/category/physical

router.get('/all', Moves.all);
router.get('/name/:name', Moves.name);
router.get('/learn/:name', Moves.learn); // list of pkm that can learn the move
router.get('/pid/:pid', Moves.pid);
router.get('/type/:type', Moves.type);
router.get('/category/:category', Moves.category);

module.exports = router;