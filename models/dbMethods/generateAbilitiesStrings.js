const abilitiesDict = require('../json/abilities.json');
const fs = require('fs');


fs.unlink('abilitiesInsertion.txt', cb => {

	for (let i = 0; i < abilitiesDict.length; i++) {

		// Assuming Name, Pokemon, Description, Generation
		let formattedString = 'INSERT into abilities VALUES (\'' + abilitiesDict[i].Name + '\', ' + abilitiesDict[i].Pokemon + ', \'' + abilitiesDict[i].Description + '\', ' + abilitiesDict[i].Generation + ');\n';

		fs.appendFileSync('abilitiesInsertion.txt', formattedString)
	}

});

