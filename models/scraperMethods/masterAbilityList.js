let cheerio = require('cheerio');
let requestUrl = require('./helpers/requestUrl');

function getMasterAbilityList(url, callback) {
	
	let requestMasterAbilityList = requestUrl(url);

	requestMasterAbilityList.then( body => {

		let $ = cheerio.load(body),
			masterTable = $('#abilities'),
			masterAbilityList = scrapeMasterAbilityList($, masterTable);
		
		callback(masterAbilityList);

	}).catch( err => {
		console.log(err);
	});
}

function scrapeMasterAbilityList($, master) {

	let abilityList = [];

	$($(master).find('tbody').children('tr')).map( (index, ability) => {
		abilityList.push(scrapeAbilityRow($, $(ability).find('td')));
	})
	
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

module.exports = {
	get: getMasterAbilityList
}