let cheerio = require('cheerio');
let request = require('request');
let requestUrl = require('./helpers/requestUrl');
let randTimer = require('./helpers/randTimer');
let getArrayCharacteristics = require('./helpers/getArrayCharacteristics');
let fs = require('fs');


function getPokemonList(baseUrl, callback) {
	
	let requestPokedex = requestUrl(baseUrl + "/pokedex/all");
	let pokedex = [];

	requestPokedex.then( body => {
		
		let $ = cheerio.load(body);
		let pokemonRow = $('#pokedex').children('tbody').children('tr');

		$(pokemonRow).map( (i, element) => {

			let td = $(element).children('td');

			eachPokemonInList(td, baseUrl).then( pokemon => {
				
				pokedex.push(pokemon);
				return pokedex;

			}).then( pokedex => {

				callback(pokedex);
			});
		});

	}).catch( err => {
		console.log(err)
	});
}

function eachPokemonInList(td, baseUrl) {
	return new Promise ( (resolve, reject) => {
		let pokemon = {
			id: parseInt(td.eq(0).text()),
			unique_id: td.eq(0).children('i').attr('data-sprite').split(' ')[1],
			name: td.eq(1).children('a').eq(0).text().replace(/\\/g, '') ,
			form: td.eq(1).find('.aside').text().toLowerCase(),
			profileUrl: td.eq(1).children('a').attr('href')
		};

		// setTimeout(enterPokemonProfile(baseUrl + pokemon.profileUrl, pokemon.form, pokemon.name + "-" + pokemon.form).then( profile => {
		// 	pokemon['profile'] = profile;
		// 	resolve(pokemon);
		// }), randTimer());
		
		// if(pokemon.name.toLowerCase() == 'caterpie') {
		// if(pokemon.name.toLowerCase() == 'deoxys') {
		if(pokemon.name.toLowerCase() == 'charizard') {
		// if(pokemon.name.toLowerCase() == 'bulbasaur') {
			
			enterPokemonProfile(baseUrl + pokemon.profileUrl, pokemon.form, pokemon.name + pokemon.form).then( profile => {
				pokemon['profile'] = profile;
				// console.log(pokemon.profile);
				resolve(pokemon);
			});

		} else {
			// reject('These are not the Pokemon you\'re looking for.')
		}
	});
}

function enterPokemonProfile(url, form, pokemonName) {
	
	return requestUrl(url).then( body => {
		console.log("now scraping " + pokemonName);

		let $ = cheerio.load(body);
		let pokemonProfile;
		let formTabs = $('.tabset-basics .svtabs-tab-list').children('.svtabs-tab'),
			main 	 = $('article');

		if(form === "") {
			let tabContainer = formTabs.children('a').eq(0).attr('href');
			pokemonProfile = scrapeProfileSections($, tabContainer, main, pokemonName);

		} else {
			pokemonProfile = multipleForms($, form, formTabs, main, pokemonName);
		}		
	
		return  pokemonProfile;

	}).catch( err => {

		return "ERROR: " + err;
	})	
}

function multipleForms($, form, formTabs, main, pokemonName) {
	let pokemonProfile;
	$(formTabs).map( (i, element) => {

		if(form == $(element).text().toLowerCase()) {

			let tabContainer = $(element).children('a').attr('href');
			pokemonProfile = scrapeProfileSections($, tabContainer, main, pokemonName);
		}
	})
	return pokemonProfile;
}

function scrapeProfileSections($, tab, main, pokemonName) {

	let summaryTable = $(tab).find('h2:contains("Pokédex data")').next(),
		trainingTable = $(tab).find('h2:contains("Training")').next(),
		breedingTable = $(tab).find('h2:contains("Breeding")').next(),
		statTable = $(tab).find('h2:contains("Base stats")').next(),
		entryTable = $(main).find('h2:contains("Pokédex entries")').next(),
		movesSection = $(main).find('h2:contains("Moves learned by")').next().next().remove('.hidden'),
		locationTable = $(main).find('h2:contains("Where to find")').next(),
		imgUrl = $(tab).find('.figure').find('img').attr('src');

	let pokemonProfile = {
		summary: scrapeSummaryTable($, summaryTable),
		training: scrapeTrainingTable($, trainingTable),
		breeding: scrapeBreedingTable($, breedingTable),
		stats: scrapeStatTable($, statTable),
		entry: scrapeEntryTable($, entryTable),
		moves: scrapeMovesSection($, movesSection),
		location: scrapeLocationTable($, locationTable)
	}
		
	// writeFile.image(imgUrl, pokemwonName);
	return pokemonProfile;
}

function scrapeSummaryTable($, table) {

	let tbody = table.find('tbody');

	let summary = {
		types: getArrayCharacteristics($, tbody.find('th:contains("Type")').next().children('a')),
		species: tbody.find('th:contains("Species")').next().text(),
		height: tbody.find('th:contains("Height")').next().text(),
		weight: tbody.find('th:contains("Weight")').next().text(),
		abilities: getArrayCharacteristics($, tbody.find('th:contains("Abilities")').next().find('a'))
	}
	return summary;
}

function scrapeTrainingTable($, table) {
	let tr = table.find('tbody').children('tr');
	let training = {};

	$(tr).map( (i, element) => {
		
		let category = $(element).find('th').text();
		training[category] = $(element).find('td').text().replace(/\t|\n/g, '');
	})

	return training;
}

function scrapeBreedingTable($, table) {

	let tr = table.find('tbody').children('tr');
	let breeding = {};

	$(tr).map( (i, element) => {
		
		let category = $(element).find('th').text();
		breeding[category] = $(element).find('td').text().replace(/\t|\n/g, '');
	})

	return breeding;
}

function scrapeStatTable($, table) {
	
	let tr = table.find('tbody').children('tr');
	let stats = {};
	
	$(tr).map( (i, element) => {
		
		let statName = $(element).find('th').text();

		if(statName != '') {

			stats[statName] = {
				base: $(element).find('td').eq(0).text(),
				min: $(element).find('td').eq(2).text(),
				max: $(element).find('td').eq(3).text(),
			};	
		}			
	})
	return stats;
}

function scrapeEntryTable($, table) {

	let tr = $(table).find('tbody').children('tr');
	let entries = {};

	$(tr).map( (i, element) => {

		let version = $(element).find('th').text();
		entries[version] = $(element).find('td').text();
	});

	return entries;
}

function scrapeMovesSection($, section) {
	let movesByLevelUpTable = $(section).find('h3:contains("Moves learnt by level up")').first().next().next(),
		movesbyEggTable = $(section).find('h3:contains("Egg moves")').first().next().next(),
		movesByTutorTable = $(section).find('h3:contains("Move Tutor moves")').first().next().next(),
		movesByTMTable = $(section).find('h3:contains("Moves learnt by TM")').first().next().next();

	let moves = {
		'byLevelUp': [],
		'byEgg': [],
		'byTutor': [],
		'byTM': []
	};
	let movesByLevelUp = [];

	$(movesByLevelUpTable).find('tbody').children('tr').map( (i, element) => {
		moves['byLevelUp'].push(getFormattedMovesWithLevels($, $(element).find('td')));
	});
	
	$(movesbyEggTable).find('tbody').children('tr').map( (i, element) => {
		moves['byEgg'].push(getFormattedMovesNoLevels($, $(element).find('td')));
	});

	// Messed up because not all Pokemon have tutor moves in S/M and 
	// so the behaviour of this function will also look at the ORAS moves
	// since they're both rendered into the page. UPDATE: Should be fixed.
	$(movesByTutorTable).find('tbody').children('tr').map( (i, element) => {
		moves['byTutor'].push(getFormattedMovesNoLevels($, $(element).find('td')));
	});

	$(movesByTMTable).find('tbody').children('tr').map( (i, element) => {
		moves['byTM'].push(getFormattedMovesWithLevels($, $(element).find('td')));
	});

	return moves;
}

function getFormattedMovesWithLevels($, nodeContainer) {
	
	let moveDetails = {};
	
	$(nodeContainer).map( (i, element) => {
		if(i === 0) {
			moveDetails['Level'] = $(element).text();
 		} else if (i === 1) {
 			moveDetails['Name'] = $(element).text();
 		} else if (i === 2) {
 			moveDetails['Type'] = $(element).text();
 		} else if (i === 3) {
 			moveDetails['Category'] = $(element).attr('data-filter-val');
 		} else if (i === 4) {
 			moveDetails['Power'] = $(element).text();
 		} else if (i === 5) {
 			moveDetails['Accuracy'] = $(element).text();
 		}
	});

	return moveDetails;
}

function getFormattedMovesNoLevels($, nodeContainer) {
	
	let moveDetails = {};
	
	$(nodeContainer).map( (i, element) => {
		if(i === 0) {
 			moveDetails['Name'] = $(element).text();
 		} else if (i === 1) {
 			moveDetails['Type'] = $(element).text();
 		} else if (i === 2) {
 			moveDetails['Category'] = $(element).attr('data-filter-val');
 		} else if (i === 3) {
 			moveDetails['Power'] = $(element).text();
 		} else if (i === 4) {
 			moveDetails['Accuracy'] = $(element).text();
 		}
	});

	return moveDetails;
}

function scrapeLocationTable($, table) {

	let tr = $(table).find('tbody').children('tr');
	let locations = {};

	$(tr).map( (i, element) => {

		let version = $(element).find('th').text();

		locations[version] = getArrayCharacteristics($, $(element).find('td'));
	});

	return locations;
}



module.exports = {
	get: getPokemonList
}