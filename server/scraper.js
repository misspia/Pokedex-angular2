var cheerio = require('cheerio');
var request = require('request');
var fs = require('file-system');


main();

function main() {
	
	var baseUrl = "http://pokemondb.net/";

	getPokemonList(baseUrl + "/pokedex/all");	
	

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

function getPokemonList(url) {
	
	var requestPokedex = requestUrl(url);
	var pokedex = [];

	requestPokedex.then(function(body) {
		
		var $ = cheerio.load(body);
		var pokemonRow = $('#pokedex').children('tbody').children('tr');

		$(pokemonRow).each(function(i, element) {

			var td = $(this).children('td');
			var pokemon = eachPokemonInList(td);

			pokedex.push(pokemon);
		});

		console.log(pokedex);

	}, function(err) {
		console.log(err);
	})	
}

function eachPokemonInList(td) {

	var pokemon = {
		id: parseInt(td.eq(0).text()),
		idStr: td.eq(0).text().replace(/\s/g, ''),
		icon: td.eq(0).children('i').attr('data-sprite').split(' ')[1],
		name: td.eq(1).children('a').eq(0).text().replace(/\\/g, '') ,
		form: td.eq(1).find('.aside').text().toLowerCase(),
		profileUrl: td.eq(1).children('a').attr('href')
	};

	return pokemon;
}
