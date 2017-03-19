var cheerio = require('cheerio');
var requestUrl = require('./helpers/requestUrl');

//////////////////// MOVE LIST ////////////////////////

function getMasterMoveList(url) {
	
	let requestMasterMoveList = requestUrl(url);

	requestMasterMoveList.then( body => {

		let $ = cheerio.load(body),
			masterTable = $('#moves');
			console.log(masterTable)
			scrapeMasterMoveList($, masterTable);

	}).catch( err => {

		console.log(err);
	})
}

function scrapeMasterMoveList($, master) {

	let moveList = [];

	$($(master).find('tbody').children('tr')).map( (index, move) => {
		moveList.push(scrapeMoveRow($, $(move).find('td')));
	})
	console.log(moveList);
	return moveList;
}

function scrapeMoveRow($, moveRow) {

	let moveDetails = {};

	$(moveRow).map( (i, element) => {
		if(i === 0) {
			moveDetails['Name'] = $(element).text();
 		} else if (i === 1) {
 			moveDetails['Type'] = $(element).text();
 		} else if (i === 2) {
 			moveDetails['Category'] = $(element).attr('data-filter-val');
 		} else if (i === 3) {
 			moveDetails['Power'] = $(element).text()
 		} else if (i === 4) {
 			moveDetails['Accuracy'] = $(element).text();
 		} else if (i === 5) {
 			moveDetails['PP'] = $(element).text();
 		} else if (i === 6) {
 			moveDetails['TM'] = $(element).text();
 		} else if (i === 7) {
 			moveDetails['Effect'] = $(element).text();
 		} else if (i === 8) {
 			moveDetails['Probability'] = $(element).text();
 		}
	});

	return moveDetails;
}

module.exports = {
	get: getMasterMoveList
};