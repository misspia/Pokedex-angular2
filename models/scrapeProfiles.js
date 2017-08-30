const sleepFor = require('./scraperMethods/helpers/sleep');
const writeFile = require('./scraperMethods/helpers/writeFile');
const randTimer = require('./scraperMethods/helpers/randTimer');
const pokemonList = require('./scraperMethods/pokemonList');

const fs = require('fs');
const EventEmitter = require('events');
require('events').EventEmitter.defaultMaxListeners = Infinity;

const jsonFilepath = './json/';
const imageFilepath = './images/'
const baseUrl = 'http://pokemondb.net';


// writeProfiles(baseUrl, jsonFilepath, imageFilepath);

function writeProfiles(baseUrl, jsonFilepath, imageFilepath) {

	fs.readFile(jsonFilepath + 'pokemon.json', 'utf8', (err, data) => {
		if (err) throw err;

		let pkmList = JSON.parse(data);

		// for(let i = 0; i < pkmList.length; i ++) {
		for(let i = 600; i < pkmList.length; i ++) {
			
			pokemonList.enterProfile(baseUrl + pkmList[i].profileUrl, pkmList[i].form, pkmList[i].name + pkmList[i].form).then( profile => {
				// writeFile.json(jsonFilepath + pkmList[i].unique_id + '.json', profile);
				writeFile.image(profile.imageUrl, imageFilepath + pkmList[i].unique_id + ".png", 1);
			})
			sleepFor(randTimer());
		}
	})
}

function convertToPNG(jsonFilepath, imageFilepath, newImageFilepath) {
	fs.readFile(jsonFilepath + 'pokemon.json', 'utf8', (err, data) => {
		if(err) throw err;

		let pkmList = JSON.parse(data);

		for(let i = 0; i < pkmList.length; i ++) {
			fs.readFile(imageFilepath + pkmList[i].unique_id + '.jpg', (err, data) => {
				if(err) throw err;
				fs.createWriteStream(newImageFilepath + pkmList[i].unique_id + '.png');
				sleepFor(randTimer());
			})
		}
	})
}

module.exports = writeProfiles;