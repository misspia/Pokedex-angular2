var cheerio = require('cheerio');
var request = require('request');
var fs = require('file-system');

let pokemonList = require('./methods/pokemonList');
let evolutionChart = require('./methods/evolutionChart');
let masterTypeChart = require('./methods/masterTypeChart');
let masterMoveList = require('./methods/masterMoveList');
let masterAbilityList = require('./methods/masterAbilityList');

main();

function main() {
	
	const baseUrl = "http://pokemondb.net";

	pokemonList.get(baseUrl);
	// evolutionChart.get(baseUrl + '/evolution');	
	// masterTypeChart.get(baseUrl + '/type/dual');
	// masterMoveList.get(baseUrl + '/move/all');
	// masterAbilityList.get(baseUrl + '/ability');
}
