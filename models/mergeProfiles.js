const writeFile = require('./scraperMethods/helpers/writeFile.js');
const fs = require('fs');
let EventEmitter = require('events');
require('events').EventEmitter.defaultMaxListeners = Infinity;

const pokemonList = require('./json/pokemon.json');

mergeProfiles(pokemonList);

function mergeProfiles(list) {
	readAllProfiles(list)
		.then((allProfiles) => {
			//path from root directory
			writeFile.json('./models/json/mergedProfiles.json', allProfiles);
		})
		.catch((err) => { console.log('ERROR :( ', err); });
}

function readAllProfiles(list) {
	return Promise.all(
		list.map((pokemon) => {
			return readProfile(pokemon)
			.then((profileData) => { return profileData; })
			.catch((err) => { console.log(err); });
		})
	)		
}

function readProfile(pokemon) {
	//path from root directory
	return new Promise((resolve, reject) => {
		fs.readFile(`./models/json/${pokemon.unique_id}.json`, 'utf8', (err, profile) => {
			if(err) reject(`COULDNT READ FILE OF ${pokemon.unique_id}`, err);
			
			resolve(profile);
		})
	})	
}