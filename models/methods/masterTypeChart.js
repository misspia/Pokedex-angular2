var cheerio = require('cheerio');
var requestUrl = require('./helpers/requestUrl');

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

module.exports = {
	get: getMasterTypeChart
}