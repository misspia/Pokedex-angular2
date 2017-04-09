let cheerio = require('cheerio');
let requestUrl = require('./helpers/requestUrl');

function getMasterTypeChart(url, callback) {
	
	let requestMasterTypeChart = requestUrl(url);

	requestMasterTypeChart.then( body => {

		let $ = cheerio.load(body),
			masterTable = $('#dualtypechart').find('tbody');

		scrapeMasterTypeChart($, masterTable, chart => {
			
			callback(chart);
		})
	})
}

function scrapeMasterTypeChart($, master, callback) {

	let typeEffects = [];
	let attackTypeKeys = getAttackTypes($, master);

	$($(master).children('tr')).map( (index, type) => {

		if($(type).attr('class') == 'hasPkmn' || $(type).attr('class') == 'noPkmn') {
			typeEffects.push( scrapeTypeRow($, type, attackTypeKeys) );
		}
	})
	
	callback(typeEffects);
}

function scrapeTypeRow($, typeRow, attackTypeKeys) {

	let currentTypes = $(typeRow).find('th');
	let key = formatTypeKey($, currentTypes);
	
	let effectValues = getTypeEffectValues($, typeRow, attackTypeKeys);
	let type = {};

	type[key] = effectValues;

	return type;
}

function getAttackTypes($, master) {
	
	let firstRowCells = $(master).children('tr').eq(0).children('th'),
		types = {};

	$(firstRowCells).map( (index, cell) => {

		if($(cell).attr('class') != 'cell-nano') {

			let type = $(cell).find('a').attr('title').toLowerCase();

			// -2 to account for the two preceeding cells
			types[index-2] = type;
		}	
	});
	return types;
}

function formatTypeKey($, nameContainer) {
	
	let type1 = $(nameContainer).children('a').eq(0).text(),
		type2 = $(nameContainer).children('a').eq(1).text() == '—' ? '' : '-' + $(nameContainer).children('a').eq(1).text(),
		name =  type1 + type2;
	
	return name.toLowerCase();
}

function getTypeEffectValues($, typeRow, attackTypeKeys) {
	
	let effectCells = $(typeRow).children('.type-fx-cell'),
		effectsObj = {};

	$(effectCells).map( (index, cell) => {
		
		let effectValue = $(cell).attr('class').replace('type-fx-cell type-fx-', '');
		
		effectsObj[ attackTypeKeys[index] ] = effectValue;
	});
	return effectsObj;
}

module.exports = {
	get: getMasterTypeChart
}