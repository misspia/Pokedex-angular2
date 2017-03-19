var cheerio = require('cheerio');
var request = require('request');
var fs = require('file-system');

main();

function main() {
	
	const baseUrl = "http://pokemondb.net";

	getPokemonList(baseUrl);
	// getEvolutionChart(baseUrl + '/evolution');	
	// getMasterTypeChart(baseUrl + '/type/dual');
	// getMasterMoveList(baseUrl + '/move/all');
	// getMasterAbilityList(baseUrl + '/ability');
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

	// if(pokemon.name.toLowerCase() == 'caterpie') {
	if(pokemon.name.toLowerCase() == 'deoxys') {
	// if(pokemon.name.toLowerCase() == 'bulbasaur') {
		// console.log(pokemon);
		enterPokemonEntry(baseUrl + pokemon.profileUrl, pokemon.form);
	}

	return pokemon;
}

function enterPokemonEntry(url, form) {

	requestUrl(url).then( body => {
		
		let $ = cheerio.load(body);
		let formTabs = $('.tabset-basics .svtabs-tab-list').children('.svtabs-tab'),
			main 	 = $('article');

		if(form === "") {
			let tabContainer = formTabs.children('a').eq(0).attr('href');
			scrapeProfileSections($, tabContainer, main);

		} else {
			multipleForms($, form, formTabs, main);
		}		

	}).catch( err => {
		console.log(err);
	})
}

function multipleForms($, form, formTabs, main) {

	$(formTabs).map( (i, element) => {

		if(form == $(element).text().toLowerCase()) {

			let tabContainer = $(element).children('a').attr('href');
			scrapeProfileSections($, tabContainer, main);
		}
	})
}


function scrapeProfileSections($, tab, main) {

	let summaryTable = $(tab).find('h2:contains("Pokédex data")').next(),
		trainingTable = $(tab).find('h2:contains("Training")').next(),
		breedingTable = $(tab).find('h2:contains("Breeding")').next(),
		statTable = $(tab).find('h2:contains("Base stats")').next(),
		entryTable = $(main).find('h2:contains("Pokédex entries")').next(),
		movesSection = $(main).find('h2:contains("Moves learned by")').next().next().remove('.hidden'),
		locationTable = $(main).find('h2:contains("Where to find")').next();

		scrapeSummaryTable($, summaryTable);
		scrapeTrainingTable($, trainingTable);
		scrapeBreedingTable($, breedingTable);
		scrapeStatTable($, statTable);
		scrapeEntryTable($, entryTable);
		scrapeMovesSection($, movesSection);
		scrapeLocationTable($, locationTable);
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
	
	$(nodeContainer).map( (i, element) => {
		 characteristics.push($(element).text());
	})

	return characteristics;
}

function scrapeTrainingTable($, table) {
	let tr = table.find('tbody').children('tr');
	let training = {};

	$(tr).map( (i, element) => {
		
		let category = $(element).find('th').text();
		training[category] = $(element).find('td').text().replace(/\t|\n/g, '');

	})

	console.log(training);

}

function scrapeBreedingTable($, table) {

	let tr = table.find('tbody').children('tr');
	let breeding = {};

	$(tr).map( (i, element) => {
		
		let category = $(element).find('th').text();
		breeding[category] = $(element).find('td').text().replace(/\t|\n/g, '');

	})

	// console.log(breeding);
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
	// console.log(stats);
}

function scrapeEntryTable($, table) {

	let tr = $(table).find('tbody').children('tr');
	let entries = {};

	$(tr).map( (i, element) => {

		let version = $(element).find('th').text();

		entries[version] = $(element).find('td').text();
	});

	// console.log(entries);
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
	// since they're both rendered into the page. 
	$(movesByTutorTable).find('tbody').children('tr').map( (i, element) => {
		moves['byTutor'].push(getFormattedMovesNoLevels($, $(element).find('td')));
	});

	$(movesByTMTable).find('tbody').children('tr').map( (i, element) => {
		moves['byTM'].push(getFormattedMovesWithLevels($, $(element).find('td')));
	});

	// console.log(moves);
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

	// console.log(locations);
}


////////////////////////EVOLUTIONS////////////////////////

function getEvolutionChart(url) {

	let requestEvolution = requestUrl(url); 

	requestEvolution.then( body => {

		let $ = cheerio.load(body);
		let family = $('.infocard-evo-list');
		let allFamilies = [];
		
		scrapeEachEvolFamily($, family);
		
	}).catch( err => {

		console.log(err);
	});
}

function scrapeEachEvolFamily($, family) {

	$(family).map( (i, family) => {
			
		let tree = {},
			memberCard = $(family).children('span').not('.small'); 

		if($(family).text().indexOf('Eevee') >= 0) {			
			tree = eeveeEvolutionCase($, family);

		} else if($(family).text().indexOf('Wurmple') >= 0 || $(family).text().indexOf('Nincada') >= 0) {				
			doubleGroupedEvolCase($, family);

		} else if($(family).text().indexOf('Burmy') >= 0 ) {
			tree = burmyEvolutionCase($, family);
			
		} else {
			$(memberCard).map( (stage, familyMember) => {

				if($(familyMember).attr('class')  == 'infocard-group') {
					tree['stage' + stage] = groupedEvolStage($, stage, familyMember);
				} else {					
					tree['stage' + stage] = [unGroupedEvolStage($, stage, familyMember)];
				}					
			})
		}
		// console.log(tree)
	})
}


function unGroupedEvolStage($, stage, member, specialCase = false)  {

	let memberInfo = {};
		
		memberInfo['name'] = $(member).find('.ent-name').text();
		memberInfo['condition'] = [];

	if(stage > 0) {
		
		if(specialCase == 'eevee') {
			let conditionContainer = $(member).next();
				memberInfo['condition'] = $(conditionContainer).text().replace(/[^0-9a-zA-Z, ]/g, '').split(',');

		} else {
			if(specialCase == 'burmy' && memberInfo.name != 'Mothim') {
				
				let suffix = '-' + $(member).find('.ent-name').next().next().text().replace(/\s/g, "-");	
				memberInfo['name'] += suffix;

			}

			let conditionContainer = $(member).prev();
				memberInfo['condition'] = $(conditionContainer).text().replace(/[^0-9a-zA-Z, ]/g, '').split(',');
		}	
	}
	// console.log(memberInfo);
	return memberInfo;
}

function groupedEvolStage($, stage, group) {
	
	let stageMembers = [];

	$($(group).children('span').not('.small')).map( (index, member) => {
		
		let memberInfo = unGroupedEvolStage($, stage, member);

		stageMembers.push(memberInfo);
	})
	
	return stageMembers;
}

function eeveeEvolutionCase($, tree) {
	let memberInfo = {},
		eeveeLeft = $(tree).children('span').eq(0),
		eeveeRight = $(tree).children('span').eq(2);

	memberInfo['stage0'] = [unGroupedEvolStage($, 0, $(tree).children('span').eq(1))];
	memberInfo['stage1'] = groupedEvolStageEevee($, 1, eeveeLeft, eeveeRight);

	// console.log(JSON.stringify(memberInfo));
	return memberInfo;
}

// Eevee evolution case
function groupedEvolStageEevee($, stage, groupLeft, groupRight) {
	
	let stageMembers = [];
	
	$($(groupLeft).children('span').not('.small')).map( (index, member) => {
		
		let memberInfo = unGroupedEvolStage($, stage, member, 'eevee');

		stageMembers.push(memberInfo);
	});


	$($(groupRight).children('span').not('.small')).map( (index, member) => {
		
		let memberInfo = unGroupedEvolStage($, stage, member);

		stageMembers.push(memberInfo);
	})

	return stageMembers;
}

function burmyEvolutionCase($, tree) {
	let memberInfo = {}

	memberInfo['stage0'] = [unGroupedEvolStage($, 0, $(tree).children('span').eq(0))];
	memberInfo['stage1'] = [];

	$($(tree).children('span').not('.small')).map( (index, member) => {
		
		if($(member).find('.ent-name').text() != 'Burmy') {
			memberInfo['stage1'].push(unGroupedEvolStage($, 1, member, 'burmy'));
		}		
	})
	// console.log(JSON.stringify(memberInfo));
	return memberInfo;
}

// Wurmple and Nincada
function doubleGroupedEvolCase($, tree) {

	let memberInfo = {};
	memberInfo['stage0'] = [unGroupedEvolStage($, 0, $(tree).children('span').eq(0))];
	memberInfo['stage1'] = [unGroupedEvolStage($, 1, $(tree).children('span').eq(1).children('span').eq(1))];
	memberInfo['stage1'].push(unGroupedEvolStage($, 1, $(tree).children('span').eq(1).children('span').eq(5)));

	memberInfo['stage2'] = [unGroupedEvolStage($, 2, $(tree).children('span').eq(1).children('span').eq(3))];
	memberInfo['stage2'].push(unGroupedEvolStage($, 2, $(tree).children('span').eq(1).children('span').eq(7)));

	console.log(JSON.stringify(memberInfo));
}


//////////////////// DUAL TYPE CHART ////////////////////////

function getMasterTypeChart(url) {
	
	let requestMasterTypeChart = requestUrl(url);

	requestMasterTypeChart.then( body => {

		let $ = cheerio.load(body),
			masterTable = $('#dualtypechart').find('tbody');
			
			scrapeMasterTypeChart($, masterTable);

	}).catch( err => {

		console.log(err);
	})
}

function scrapeMasterTypeChart($, master) {

	let typeEffects = [];

	$($(master).children('tr')).map( (index, type) => {

		if($(type).attr('class') == 'hasPkmn' || $(type).attr('class') == 'noPkmn') {
			typeEffects.push(scrapeTypeRow($, type));
		}
	})
	console.log(typeEffects);
	return typeEffects;
}

function scrapeTypeRow($, typeRow) {

	let currentTypes = $(typeRow).find('th');
	let key = formatTypeKey($, currentTypes);
	let effectValues = getTypeEffectValues($, typeRow);
	let type = {};

	type[key] = effectValues;

	return type;
}

function formatTypeKey($, nameContainer) {
	
	let type1 = $(nameContainer).children('a').eq(0).text(),
		type2 = $(nameContainer).children('a').eq(1).text() == '—' ? '' : '-' + $(nameContainer).children('a').eq(1).text(),
		name =  type1 + type2;
	
	return name.toLowerCase();
}

function getTypeEffectValues($, typeRow) {
	
	let effectCells = $(typeRow).children('.type-fx-cell');
	let effectsArr = [];

	$(effectCells).map( (index, cell) => {
		
		// let effectValue = $(cell).text();
		let effectValue = $(cell).attr('class').replace('type-fx-cell type-fx-', '');

		effectsArr.push(effectValue);
	});

	console.log(effectsArr);
	return effectsArr;
}

//////////////////// MOVE LIST ////////////////////////

function getMasterMoveList(url) {
	
	let requestMasterMoveList = requestUrl(url);

	requestMasterMoveList.then( body => {

		let $ = cheerio.load(body),
			masterTable = $('#moves');
			console.log(masterTable)
			scrapeMasterMoveList($, masterTable);

	}).catch( err => {

		console.log(err);
	})
}

function scrapeMasterMoveList($, master) {

	let moveList = [];

	$($(master).find('tbody').children('tr')).map( (index, move) => {
		moveList.push(scrapeMoveRow($, $(move).find('td')));
	})
	console.log(moveList);
	return moveList;
}

function scrapeMoveRow($, moveRow) {

	let moveDetails = {};

	$(moveRow).map( (i, element) => {
		if(i === 0) {
			moveDetails['Name'] = $(element).text();
 		} else if (i === 1) {
 			moveDetails['Type'] = $(element).text();
 		} else if (i === 2) {
 			moveDetails['Category'] = $(element).attr('data-filter-val');
 		} else if (i === 3) {
 			moveDetails['Power'] = $(element).text()
 		} else if (i === 4) {
 			moveDetails['Accuracy'] = $(element).text();
 		} else if (i === 5) {
 			moveDetails['PP'] = $(element).text();
 		} else if (i === 6) {
 			moveDetails['TM'] = $(element).text();
 		} else if (i === 7) {
 			moveDetails['Effect'] = $(element).text();
 		} else if (i === 8) {
 			moveDetails['Probability'] = $(element).text();
 		}
	});

	return moveDetails;
}

//////////////////// MOVE LIST ////////////////////////

function getMasterAbilityList(url) {
	
	let requestMasterAbilityList = requestUrl(url);

	requestMasterAbilityList.then( body => {

		let $ = cheerio.load(body),
			masterTable = $('#abilities');
			console.log(masterTable)
			scrapeMasterAbilityList($, masterTable);

	}).catch( err => {

		console.log(err);
	})
}

function scrapeMasterAbilityList($, master) {

	let abilityList = [];

	$($(master).find('tbody').children('tr')).map( (index, ability) => {
		abilityList.push(scrapeAbilityRow($, $(ability).find('td')));
	})
	console.log(abilityList);
	return abilityList;
}

function scrapeAbilityRow($, abilityRow) {

	let abilityDetails = {};

	$(abilityRow).map( (i, element) => {
		if(i === 0) {
			abilityDetails['Name'] = $(element).text();
 		} else if (i === 1) {
 			abilityDetails['Pokemon'] = $(element).text();
 		} else if (i === 2) {
 			abilityDetails['Description'] = $(element).text();
 		} else if (i === 3) {
 			abilityDetails['Generation'] = $(element).text()
 		}
	});

	return abilityDetails;
}