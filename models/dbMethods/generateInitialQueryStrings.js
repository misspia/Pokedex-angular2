const createTables = require ('./createTables.js');
const abilitiesDict = require('../json/abilities.json');

const fs = require('fs');
const filepath = '../initPokemonDatabase.txt';


fs.unlink(filepath, cb => {

	// create initial tables
	fs.appendFileSync(filepath, createTables.tables);

	for (let i = 0; i < abilitiesDict.length; i++) {

		// Assuming Name, Pokemon, Description, Generation
		let formattedString = 'INSERT into pokedex.abilities VALUES (\'' + abilitiesDict[i].Name + '\', ' + abilitiesDict[i].Pokemon + ', \'' + abilitiesDict[i].Description + '\', ' + abilitiesDict[i].Generation + ');\n';

		fs.appendFileSync(filepath, formattedString);
	}
});

