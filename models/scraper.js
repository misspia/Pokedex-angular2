let cheerio = require('cheerio');
let request = require('request');

let pokemonList = require('./scraperMethods/pokemonList');
let evolutionChart = require('./scraperMethods/evolutionChart');
let masterTypeChart = require('./scraperMethods/masterTypeChart');
let masterMoveList = require('./scraperMethods/masterMoveList');
let masterAbilityList = require('./scraperMethods/masterAbilityList');

main();

function main() {
	
	const baseUrl = "http://pokemondb.net";

	pokemonList.get(baseUrl);
	// evolutionChart.get(baseUrl + '/evolution');	
	// masterTypeChart.get(baseUrl + '/type/dual');
	// masterMoveList.get(baseUrl + '/move/all');
	// masterAbilityList.get(baseUrl + '/ability');
}
