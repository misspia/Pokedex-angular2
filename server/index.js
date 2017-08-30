const Controller = require('./controller.js');
const express = require('express');
const app = express();
const port = 3001;

const PokedexRouter = require('./routes/pokedex.router.js');
const EvolutionsRouter = require('./routes/evolutions.router.js');
const TypesRouter = require('./routes/types.router.js');
const MovesRouter = require('./routes/moves.router.js');
const AbilitiesRouter = require('./routes/abilities.router.js');

app.use('/api/v1/pokedex', PokedexRouter);
app.use('/api/v1/evolutions', EvolutionsRouter);
app.use('/api/v1/types_chart/', TypesRouter);
app.use('/api/v1/moves_description', MovesRouter);
app.use('/api/v1/abilities_description', AbilitiesRouter);

app.listen(port, () => {
	console.log('Listening on port ', port);
});