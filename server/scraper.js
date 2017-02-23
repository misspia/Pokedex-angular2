var cheerio = require('cheerio');
var request = require('request');
var fs = require('file-system');

main();

function main() {
	
	var baseUrl = "http://pokemondb.net";

	getPokemonList(baseUrl);	
}

function requestUrl(url) {

	return promise = new Promise(function(resolve, reject) {

		request(url, function(error, response, body) {
			if(!error && response.statusCode == 200){
				
				resolve(body);

			} else {
				reject(error);
			}
		})
	})
}

function getPokemonList(baseUrl) {
	
	var requestPokedex = requestUrl(baseUrl + "/pokedex/all");
	var pokedex = [];

	requestPokedex.then(function(body) {
		
		var $ = cheerio.load(body);
		var pokemonRow = $('#pokedex').children('tbody').children('tr');

		$(pokemonRow).each(function(i, element) {

			var td = $(this).children('td');
			var pokemon = eachPokemonInList(td, baseUrl);

			pokedex.push(pokemon);
		});

		// console.log(pokedex);

	}, function(err) {
		console.log(err);
	})	
}

function eachPokemonInList(td, baseUrl) {

	var pokemon = {
		id: parseInt(td.eq(0).text()),
		idStr: td.eq(0).text().replace(/\s/g, ''),
		icon: td.eq(0).children('i').attr('data-sprite').split(' ')[1],
		name: td.eq(1).children('a').eq(0).text().replace(/\\/g, '') ,
		form: td.eq(1).find('.aside').text().toLowerCase(),
		profileUrl: td.eq(1).children('a').attr('href')
	};
	if(pokemon.name.toLowerCase() == 'deoxys') {
		console.log(pokemon)
		enterPokemonEntry(baseUrl + pokemon.profileUrl, pokemon.form);
	
	}

	return pokemon;
}

function enterPokemonEntry(url, form) {

	requestUrl(url).then(function(body) {
	
		var $ = cheerio.load(body);
		var formTabs = $('.tabset-basics .svtabs-tab-list').children('.svtabs-tab'),
			main = $('.main-content');

		$(formTabs).each(function(i, element) {

			if(form == $(this).text().toLowerCase()) {

				var tabContainer = $(this).children('a').attr('href');
				scrapeProfileSections($, tabContainer, main);
			}
		})

	}, function(error) {
		console.log(error);
	})
}

function scrapeProfileSections($, tab, main) {

	var summaryTable = $(tab).find('h2:contains("Pokédex data")').next(),
		statTable = $(tab).find('h2:contains("Base stats")').next(),
		entryTable = $(main).find('h2:contains("Pokédex entries")').next(),
		evolutionTable = $(main).find('h2:contains("Evolution chart")').next(),
		movesSection = $(main).find('h2:contains("Moves learned by")').next().next();
}



















