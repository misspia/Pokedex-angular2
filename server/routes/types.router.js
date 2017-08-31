const router = require('express').Router();
const Types = require('../controllers/types.controller.js');

// Examples
// http://localhost:3001/api/v1/types/all
// http://localhost:3001/api/v1/types/type/Normal
// http://localhost:3001/api/v1/types/pid/n3

router.get('/all', Types.all); // /all or /chart ?
router.get('/type/:type', Types.type); //todo: take list of types -> return pkm that have all types
router.get('/pid/:pid', Types.pid);

module.exports = router;