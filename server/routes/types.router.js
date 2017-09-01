const router = require('express').Router();
const Types = require('../controllers/types.controller.js');

// Examples
// http://localhost:3001/api/v1/types/chart
// http://localhost:3001/api/v1/types/type/all
// http://localhost:3001/api/v1/types/type/Grass,Poison
// http://localhost:3001/api/v1/types/pid/n3

router.get('/chart', Types.chart); 
router.get('/type/all', Types.all);
router.get('/type/:type', Types.type);  // can take comma seperated list
router.get('/pid/:pid', Types.pid);

module.exports = router;