const createTables = require ('./createTables.js');
const abilitiesDict = require('../json/abilities.json');
const movesDict = require('../json/moves.json');
const typesDict = require('../json/types.json');
const evolutionsDict = require('../json/evolution.json');

const fs = require('fs');
const filepath = '../initPokemonDatabase.txt';


fs.unlink(filepath, cb => {

	// create initial tables
	fs.appendFileSync(filepath, createTables.tables);

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
					}
				} else {
					formattedString = 'INSERT into pokedex.evolutions (base, stage0, stage1, condition) VALUES (\'' + evolutionsDict[i]['stage0'][0].name + '\', \'' + evolutionsDict[i]['stage0'][0].name + '\', \'' + evolutionsDict[i]['stage1'][i1].name + '\', \'' + evolutionsDict[i]['stage0'][0].condition + '\');\n';
					formattedString += 'INSERT into pokedex.evolutions (base, stage0, condition) VALUES (\'' + evolutionsDict[i]['stage1'][i1].name + '\', \'' + evolutionsDict[i]['stage0'][0].name + '\', \'' + evolutionsDict[i]['stage1'][i1].condition + '\');\n';
				}
			}

		}
		fs.appendFileSync(filepath, formattedString);
	}

});
