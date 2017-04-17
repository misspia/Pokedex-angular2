const createTables = require ('./createTables.js');
const mainDict = require('../json/pokemon.json');
const abilitiesDict = require('../json/abilities.json');
const movesDict = require('../json/moves.json');
const typesDict = require('../json/types.json');
const evolutionsDict = require('../json/evolution.json');
const insert = require('./insertions');

const fs = require('fs');
const filepath = '../initPokemonDatabase.txt';


fs.unlink(filepath, cb => {

	// create initial tables
	fs.appendFileSync(filepath, createTables.tables);



	// for (let i = 0; i < mainDict.length; i++ ) {
	for (let i = 0; i < 2; i++ ) {

		let mainString = 'INSERT into pokedex.main VALUES (\'' + mainDict[i].unique_id + '\', ' + mainDict[i].id + '\', ' + mainDict[i].name + '\', ' + mainDict[i].form + '\', ' + ');\n';
		
		let profileDict = require('../json/' + mainDict[i].unique_id + '.json');
		// let profile = 'INSERT into pokedex.general VALUES (\'' + mainDict[i].unique_id + '\', ' + profileDict.summary.type + '\', ' + profileDict.summary.species + '\', ' + profileDict.summary.weight + '\', ' + profileDict.summary.height + '\', ' + profileDict.summary.abilities + ');\n';
		//**type, abilities, missing hidden_ability

		// let baseStats = 'INSERT into pokedex.base_stats VALUES (\'' + mainDict[i].unique_id + '\', ' + profileDict.stats["HP"].base + '\', ' + profileDict.stats["Attack"].base + ', \'' + profileDict.stats["Defence"].base + '\', ' + profileDict.stats["Sp. Atk"].base + ', \'' + profileDict.stats["Sp. Def"].base + ', \'' + profileDict.stats["Speed"].base + ');\n';
		// let minStats = 'INSERT into pokedex.min_stats VALUES (\'' + mainDict[i].unique_id + '\', ' + profileDict.stats["HP"].min + '\', ' + profileDict.stats["Attack"].min + ', \'' + profileDict.stats["Defence"].min + '\', ' + profileDict.stats["Sp. Atk"].min + ', \'' + profileDict.stats["Sp. Def"].min + ', \'' + profileDict.stats["Speed"].min + ');\n';
		// let maxStats = 'INSERT into pokedex.max_stats VALUES (\'' + mainDict[i].unique_id + '\', ' + profileDict.stats["HP"].max + '\', ' + profileDict.stats["Attack"].max + ', \'' + profileDict.stats["Defence"].max + '\', ' + profileDict.stats["Sp. Atk"].max + ', \'' + profileDict.stats["Sp. Def"].max + ', \'' + profileDict.stats["Speed"].max + ');\n';

		// let training = 'INSERT into pokedex.max_stats VALUES (\'' + mainDict[i].unique_id + '\', ' + profileDict.training["EV yield"] + '\', ' + profileDict.training["Catch rate"] + ', \'' + profileDict.training["Base Happiness"] + '\', ' + profileDict.training["Base EXP"] + ', \'' + profileDict.training["Growth Rate"] + ', \'' + profileDict.breeding["Egg Groups"] + ');\n';
		// let description = insert.generate('pokedex.description', mainDict[i].unique_id, mainDict[i]);
		
		//moves, location

		// fs.appendFileSync(filepath, mainString);
		// fs.appendFileSync(filepath, profile);
		// fs.appendFileSync(filepath, baseStats);
		// fs.appendFileSync(filepath, minStats);
		// fs.appendFileSync(filepath, maxStats);
		// fs.appendFileSync(filepath, training);
		// fs.appendFileSync(filepath, description);

	}




	// Abilities
	for (let i = 0; i < abilitiesDict.length; i++) {

		let formattedString = 'INSERT into pokedex.abilities VALUES (\'' + abilitiesDict[i].Name + '\', ' + abilitiesDict[i].Pokemon + ', \'' + abilitiesDict[i].Description + '\', ' + abilitiesDict[i].Generation + ');\n';

		fs.appendFileSync(filepath, formattedString);
	}

	
	// Moves
	for (let i = 0; i < movesDict.length; i++) {

		let formattedString = 'INSERT into pokedex.moves_description VALUES (\'' + movesDict[i].Name + '\', \'' + movesDict[i].Type + '\', \'' + movesDict[i].Category + '\', ' + movesDict[i].Power + ', ' + movesDict[i].Accuracy + ', '  + movesDict[i].PP + ', \'' + movesDict[i].TM + '\', \'' + movesDict[i].Effect + '\', ' + movesDict[i].Probability + ');\n';

		fs.appendFileSync(filepath, formattedString);
	}

	// Types
	for (let i = 0; i < typesDict.length; i++) {
		for (defense in typesDict[i]) {
			if (typesDict[i][defense]) {
				let formattedString = 'INSERT into pokedex.types VALUES (' + typesDict[i][defense].normal + ', ' + 
				typesDict[i][defense].fire + ', ' + typesDict[i][defense].water + ', ' + typesDict[i][defense].electric + ', ' + 
				typesDict[i][defense].grass + ', ' + typesDict[i][defense].ice + ', ' + typesDict[i][defense].fighting + ', ' + 
				typesDict[i][defense].poison + ', ' + typesDict[i][defense].ground + ', ' + typesDict[i][defense].flying + ', ' + 
				typesDict[i][defense].psychic + ', ' + typesDict[i][defense].bug + ', ' + typesDict[i][defense].rock + ', ' + 
				typesDict[i][defense].ghost + ', ' + typesDict[i][defense].dragon + ', ' + typesDict[i][defense].dark + ', ' + 
				typesDict[i][defense].steel + ', ' + typesDict[i][defense].fairy + ');\n';

				fs.appendFileSync(filepath, formattedString);
			}
		}		
	}

	// Evolutions 
	for (let i = 0; i < evolutionsDict.length; i++) {
		let formattedString = '';

		// Assume base, stage0, stage1, stage2, condition 
		if (evolutionsDict[i]['stage0'][0].name === 'Wurmple') {
			formattedString = 'INSERT into pokedex.evolutions (base, stage0, stage1, stage2, condition) VALUES (\'' + evolutionsDict[i]['stage0'][0].name + '\', \'' + evolutionsDict[i]['stage0'][0].name + '\', \'' + evolutionsDict[i]['stage1'][0].name + '\', \'' + evolutionsDict[i]['stage2'][0].name + '\', \'' + evolutionsDict[i]['stage0'][0].condition + '\');\n';
			formattedString += 'INSERT into pokedex.evolutions (base, stage0, stage1, stage2, condition) VALUES (\'' + evolutionsDict[i]['stage0'][0].name + '\', \'' + evolutionsDict[i]['stage0'][0].name + '\', \'' + evolutionsDict[i]['stage1'][1].name + '\', \'' + evolutionsDict[i]['stage2'][1].name + '\', \'' + evolutionsDict[i]['stage0'][0].condition + '\');\n';
			// Beautifly
			formattedString += 'INSERT into pokedex.evolutions (base, stage0, condition) VALUES (\'' + evolutionsDict[i]['stage1'][0].name + '\', \'' + evolutionsDict[i]['stage0'][0].name + '\', \'' + evolutionsDict[i]['stage1'][0].condition + '\');\n';
			formattedString += 'INSERT into pokedex.evolutions (base, stage0, condition) VALUES (\'' + evolutionsDict[i]['stage2'][1].name + '\', \'' + evolutionsDict[i]['stage0'][0].name + '\', \'' + evolutionsDict[i]['stage2'][1].condition + '\');\n';
			// Dustox
			formattedString += 'INSERT into pokedex.evolutions (base, stage0, condition) VALUES (\'' + evolutionsDict[i]['stage1'][0].name + '\', \'' + evolutionsDict[i]['stage0'][0].name + '\', \'' + evolutionsDict[i]['stage1'][0].condition + '\');\n';
			formattedString += 'INSERT into pokedex.evolutions (base, stage0, condition) VALUES (\'' + evolutionsDict[i]['stage2'][1].name + '\', \'' + evolutionsDict[i]['stage0'][0].name + '\', \'' + evolutionsDict[i]['stage2'][1].condition + '\');\n';

		} else {
			for(let i1 = 0; i1 < evolutionsDict[i]['stage1'].length; i1++) {
				if (evolutionsDict[i]['stage2']) {
					for(let i2 = 0; i2 < evolutionsDict[i]['stage2'].length; i2++) {
						formattedString = 'INSERT into pokedex.evolutions (base, stage0, stage1, stage2, condition) VALUES (\'' + evolutionsDict[i]['stage0'][0].name + '\', \'' + evolutionsDict[i]['stage0'][0].name + '\', \'' + evolutionsDict[i]['stage1'][i1].name + '\', \'' + evolutionsDict[i]['stage2'][i2].name + '\', \'' + evolutionsDict[i]['stage0'][0].condition + '\');\n';
						formattedString += 'INSERT into pokedex.evolutions (base, stage0, condition) VALUES (\'' + evolutionsDict[i]['stage1'][i1].name + '\', \'' + evolutionsDict[i]['stage0'][0].name + '\', \'' + evolutionsDict[i]['stage1'][i1].condition + '\');\n';
						formattedString += 'INSERT into pokedex.evolutions (base, stage0, condition) VALUES (\'' + evolutionsDict[i]['stage2'][i2].name + '\', \'' + evolutionsDict[i]['stage0'][0].name + '\', \'' + evolutionsDict[i]['stage2'][i2].condition + '\');\n';
						fs.appendFileSync(filepath, formattedString);
					}
				} else {
					formattedString = 'INSERT into pokedex.evolutions (base, stage0, stage1, condition) VALUES (\'' + evolutionsDict[i]['stage0'][0].name + '\', \'' + evolutionsDict[i]['stage0'][0].name + '\', \'' + evolutionsDict[i]['stage1'][i1].name + '\', \'' + evolutionsDict[i]['stage0'][0].condition + '\');\n';
					formattedString += 'INSERT into pokedex.evolutions (base, stage0, condition) VALUES (\'' + evolutionsDict[i]['stage1'][i1].name + '\', \'' + evolutionsDict[i]['stage0'][0].name + '\', \'' + evolutionsDict[i]['stage1'][i1].condition + '\');\n';
					fs.appendFileSync(filepath, formattedString);
				}
			}

		}
	}

});
