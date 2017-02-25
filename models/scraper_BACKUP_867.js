const cheerio 	= require('cheerio');
const request 	= require('request');
const fs 		= require('file-system');

main();

function main() {
	
	const baseUrl = "http://pokemondb.net";

	getPokemonList(baseUrl);	
}

function requestUrl(url) {
	return new Promise( (resolve, reject) => {
		request(url, (error, response, body) => {
			if(!error && response.statusCode == 200){
				resolve(body);
			} else {
				reject(error);
			}
		})
	})
}

function getPokemonList(baseUrl) {
	
	let requestPokedex = requestUrl(baseUrl + "/pokedex/all");
	let pokedex = [];

	requestPokedex.then( body => {
		
		let $ = cheerio.load(body);
		let pokemonRow = $('#pokedex').children('tbody').children('tr');

		$(pokemonRow).map( (i, element) => {

			let td = $(element).children('td');
			let pokemon = eachPokemonInList(td, baseUrl);

			pokedex.push(pokemon);
		});

		// console.log(pokedex);

	}).catch( err => {
		console.log(err)
	})
}

function eachPokemonInList(td, baseUrl) {
	let pokemon = {
		id: parseInt(td.eq(0).text()),
		idStr: td.eq(0).text().replace(/\s/g, ''),
		icon: td.eq(0).children('i').attr('data-sprite').split(' ')[1],
		name: td.eq(1).children('a').eq(0).text().replace(/\\/g, '') ,
		form: td.eq(1).find('.aside').text().toLowerCase(),
		profileUrl: td.eq(1).children('a').attr('href')
	};
	if(pokemon.name.toLowerCase() == 'deoxys') {
	// if(pokemon.name.toLowerCase() == 'bulbasaur') {
		console.log(pokemon)
		enterPokemonEntry(baseUrl + pokemon.profileUrl, pokemon.form);
	}

	return pokemon;
}

function enterPokemonEntry(url, form) {

	requestUrl(url).then( body => {
		
		let $ = cheerio.load(body);
		let formTabs = $('.tabset-basics .svtabs-tab-list').children('.svtabs-tab'),
			main     = $('.main-content');

		if(form === "") {
			let tabContainer = formTabs.children('a').eq(0).attr('href');
			scrapeProfileSections($, tabContainer, main);

		} else {
			multipleForms($, form, formTabs);
		}		

	}).catch( err => {
		console.log(err);
	})
}

function multipleForms($, form, formTabs) {
	$(formTabs).each( (i, element) => {
		if(form == $(this).text().toLowerCase()) {
			let tabContainer = $(this).children('a').attr('href');
			scrapeProfileSections($, tabContainer, main);
		}
	})
}

function scrapeProfileSections($, tab, main) {

<<<<<<< HEAD
	var summaryTable = $(tab).find('h2:contains("Pokédex data")').next(),
		breedingTable = $(tab).find('h2:contains("Breeding")').next(),
=======
	let summaryTable = $(tab).find('h2:contains("Pokédex data")').next(),
>>>>>>> 35dfea8ad731e90f14a9dc1d19aa53df645e43a6
		statTable = $(tab).find('h2:contains("Base stats")').next(),
		entryTable = $(main).find('h2:contains("Pokédex entries")').next(),
		evolutionTable = $(main).find('h2:contains("Evolution chart")').next(),
		moveSection = $(main).find('h2:contains("Moves learned by")').next().next();

		scrapeSummaryTable($, summaryTable);
		scrapeStatTable($, statTable);
		scrapeBreedingTable($, breedingTable);
}

function scrapeSummaryTable($, table) {

	let tbody = table.find('tbody');
	let types = getArrayCharacteristics($, tbody.find('th:contains("Type")').next().children('a'))
	let species = tbody.find('th:contains("Species")').next();
	let height = tbody.find('th:contains("Height")').next();
	let weight = tbody.find('th:contains("Weight")').next();
	let abilities = getArrayCharacteristics($, tbody.find('th:contains("Abilities")').next().find('a'));
	
	// console.log(abilities);
}

function getArrayCharacteristics($, nodeContainer) {
	
	let characteristics = [];
	
	$(nodeContainer).each( (i, ele) => {
		 characteristics.push($(this).text());
	})

	return characteristics;
}
<<<<<<< HEAD

function scrapeBreedingTable($, table) {

	var tr = table.find('tbody').children('tr');
	var breeding = {};

	$(tr).each(function(i, element) {

		var category = $(this).find('th').text();

		breeding[category] = $(this).find('td').text().replace(/\t|\n/g, '');
	});
	// console.log(breeding);
}

function scrapeStatTable($, table) {
	
	var tr = table.find('tbody').children('tr');
	var stats = {};
	
	$(tr).each(function(i, element) {
		
		var statName = $(this).find('th').text();

		if(statName != '') {

			stats[statName] = {
				avg: $(this).find('td').eq(0).text(),
				min: $(this).find('td').eq(2).text(),
				max: $(this).find('td').eq(3).text(),
			};	
		}			
	})
	// console.log(stats);
}



















=======
>>>>>>> 35dfea8ad731e90f14a9dc1d19aa53df645e43a6
