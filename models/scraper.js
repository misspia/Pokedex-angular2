let pokemonList = require('./scraperMethods/pokemonList.js');
let evolutionChart = require('./scraperMethods/evolutionChart.js');
let masterTypeChart = require('./scraperMethods/masterTypeChart.js');
let masterMoveList = require('./scraperMethods/masterMoveList.js');
let masterAbilityList = require('./scraperMethods/masterAbilityList.js');
let writeFile = require('./scraperMethods/helpers/writeFile.js');
let writeProfiles = require('./scrapeProfiles.js');
let EventEmitter = require('events');
require('events').EventEmitter.defaultMaxListeners = Infinity;

main();

function main() {
	
	const baseUrl = "http://pokemondb.net";

	// pokemonList.get(baseUrl, list => {
	// 	writeFile.json('./json/pokemon.json', list);
	// 	writeProfiles.profiles();
	// });
	evolutionChart.get(baseUrl + '/evolution', evolFamilies => {
		writeFile.json('./json/evolutions.json', evolFamilies);
	});	

	// masterTypeChart.get(baseUrl + '/type/dual', types => {
	// 	writeFile.json('./json/types.json', types);

	// });

	// masterMoveList.get(baseUrl + '/move/all', moves => {
	// 	writeFile.json('./json/moves.json', moves);
	// });

	// masterAbilityList.get(baseUrl + '/ability', abilities => {
	// 	writeFile.json('./json/abilities.json', abilities);
	// });
}
