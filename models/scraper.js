let writeFile = require('./scraperMethods/helpers/writeFile');
let pokemonList = require('./scraperMethods/pokemonList');
// let evolutionChart = require('./scraperMethods/evolutionChart');
let masterTypeChart = require('./scraperMethods/masterTypeChart');
// let masterMoveList = require('./scraperMethods/masterMoveList');
// let masterAbilityList = require('./scraperMethods/masterAbilityList');

main();

function main() {
	
	const baseUrl = "http://pokemondb.net";

	// pokemonList.get(baseUrl, (list) => {
	// 	// console.log(list);
	// })
	// evolutionChart.get(baseUrl + '/evolution');	

	masterTypeChart.get(baseUrl + '/type/dual', chart => {
		writeFile.json('./masterTypeChart.json', chart);

	});

	// masterMoveList.get(baseUrl + '/move/all');
	// masterAbilityList.get(baseUrl + '/ability');
}
