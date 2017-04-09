let writeFile = require('./scraperMethods/helpers/writeFile');
let pokemonList = require('./scraperMethods/pokemonList');
let evolutionChart = require('./scraperMethods/evolutionChart');
let masterTypeChart = require('./scraperMethods/masterTypeChart');
let masterMoveList = require('./scraperMethods/masterMoveList');
let masterAbilityList = require('./scraperMethods/masterAbilityList');

main();

function main() {
	
	const baseUrl = "http://pokemondb.net";

	pokemonList.get(baseUrl, list => {
		writeFile.json('./json/pokemon.json', list);
	})
	evolutionChart.get(baseUrl + '/evolution', evolFamilies => {
		writeFile.json('./json/evolution.json', evolFamilies);
	});	

	masterTypeChart.get(baseUrl + '/type/dual', types => {
		writeFile.json('./json/types.json', types);

	});

	masterMoveList.get(baseUrl + '/move/all', moves => {
		writeFile.json('./json/moves.json', moves);
	});

	masterAbilityList.get(baseUrl + '/ability', abilities => {
		writeFile.json('./json/abilities.json', abilities);
	});
}
