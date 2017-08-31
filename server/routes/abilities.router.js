const router = require('express').Router();
const Abilities = require('../controllers/abilities.controller.js');

// Examples
// http://localhost:3001/api/v1/abilities/all
// http://localhost:3001/api/v1/abilities/name/Aftermath
// http://localhost:3001/api/v1/abilities/learn/Aftermath
// http://localhost:3001/api/v1/abilities/pid/n1

router.get('/all', Abilities.all);
router.get('/name/:name', Abilities.name);
router.get('/learn/:name', Abilities.learn); // list of pkm that can learn the ability
router.get('/pid/:pid', Abilities.pid);

module.exports = router;