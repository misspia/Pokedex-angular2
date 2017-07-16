const writeFile = require('./scraperMethods/helpers/writeFile.js');
const fs = require('fs');
let EventEmitter = require('events');
require('events').EventEmitter.defaultMaxListeners = Infinity;

const pokemonList = require('./json/pokemon.json');

mergeProfiles(pokemonList);

function mergeProfiles(list) {
	readAllProfiles(list)
		.then((allProfiles) => {
			const profilesObj = objectifyArray(allProfiles);
			
			writeFile.json('./models/json/mergedProfiles.json', profilesObj);
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
			
			let profileObj = {};
			profileObj[pokemon.unique_id] = profile;
			resolve(profileObj);
		})
	})	
}

function objectifyArray(arr) {
	return arr.reduce((acc, data, index) => {
		const key = Object.keys(data)[0];
		acc[key] = data[key];
		return acc;
	}, {});
}