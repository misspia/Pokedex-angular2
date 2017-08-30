let cheerio = require('cheerio');
let requestUrl = require('./helpers/requestUrl');

function getEvolutionChart(url, callback) {

	let requestEvolution = requestUrl(url); 

	requestEvolution.then( body => {

		let $ = cheerio.load(body);
		let family = $('.infocard-evo-list');
		let allFamilies = scrapeEachEvolFamily($, family);

		callback(allFamilies);
		
	}).catch( err => {
		console.log(err);
	});
}

function scrapeEachEvolFamily($, family) {
	let allFamilies = [];	

	$(family).map( (i, family) => {
		let tree = {},
		memberCard = $(family).children('span').not('.small'); 

		if($(family).text().indexOf('Eevee') >= 0) {	//n133		
			tree = eeveeEvolutionCase($, family);

		} else if($(family).text().indexOf('Wurmple') >= 0 || $(family).text().indexOf('Nincada') >= 0) {	//n265, n290			
			tree = doubleGroupedEvolCase($, family);

		} else if($(family).text().indexOf('Burmy') >= 0 ) {	//n412
			tree = burmyEvolutionCase($, family);
			
		} else {
			$(memberCard).map( (stage, familyMember) => {
				if($(familyMember).attr('class')  == 'infocard-group') {
					tree['stage' + stage] = groupedEvolStage($, stage, familyMember);
				} else {					
					tree['stage' + stage] = [unGroupedEvolStage($, stage, familyMember)];
				}					
			})
		}
		allFamilies.push(tree);
	})

	return allFamilies;
}


function unGroupedEvolStage($, stage, member, specialCase = false)  {
	let memberInfo = {};
	memberInfo['unique_id'] = getUniqueId($, member);
	memberInfo['condition'] = [];

	if(stage > 0) {
		if(specialCase == 'eevee') {
			let conditionContainer = $(member).next();
			memberInfo['condition'] = $(conditionContainer).text().replace(/[^0-9a-zA-Z, ]/g, '').split(',');
		} else {
			let conditionContainer = $(member).prev();
			memberInfo['condition'] = $(conditionContainer).text().replace(/[^0-9a-zA-Z, ]/g, '').split(',');
		}	
	}
	return memberInfo;
}

function groupedEvolStage($, stage, group) {
	
	let stageMembers = [];

	$($(group).children('span').not('.small')).map( (index, member) => {
		
		let memberInfo = unGroupedEvolStage($, stage, member);
		stageMembers.push(memberInfo);
	})
	
	return stageMembers;
}

function eeveeEvolutionCase($, tree) {
	let memberInfo = {},
		eeveeLeft = $(tree).children('span').eq(0),
		eeveeRight = $(tree).children('span').eq(2);

	memberInfo['stage0'] = [unGroupedEvolStage($, 0, $(tree).children('span').eq(1))];
	memberInfo['stage1'] = groupedEvolStageEevee($, 1, eeveeLeft, eeveeRight);

	return memberInfo;
}

// Eevee evolution case
function groupedEvolStageEevee($, stage, groupLeft, groupRight) {
	
	let stageMembers = [];
	
	$($(groupLeft).children('span').not('.small')).map( (index, member) => {
		
		let memberInfo = unGroupedEvolStage($, stage, member, 'eevee');
		stageMembers.push(memberInfo);
	});

	$($(groupRight).children('span').not('.small')).map( (index, member) => {
		
		let memberInfo = unGroupedEvolStage($, stage, member);
		stageMembers.push(memberInfo);
	})

	return stageMembers;
}
function getUniqueId($, member) {
	const identifiers = $(member).find('.pkg').attr('data-sprite');
	if(!identifiers) return '';
	const identifiersArr = identifiers.trim().split(' '); 
	return identifiersArr[identifiersArr.length - 1];
}

function burmyEvolutionCase($, tree) {
	let memberInfo = {}

	memberInfo['stage0'] = [unGroupedEvolStage($, 0, $(tree).children('span').eq(0))];
	memberInfo['stage1'] = [];

	$($(tree).children('span').not('.small')).map( (index, member) => {
		const uniqueId = getUniqueId($, member);
		if(uniqueId != 'n412') {	// burmy == n412
			memberInfo['stage1'].push(unGroupedEvolStage($, 1, member, 'burmy'));
		}		
	})
	return memberInfo;
}

// Wurmple and Nincada
function doubleGroupedEvolCase($, tree) {

	let memberInfo = {};
	memberInfo['stage0'] = [unGroupedEvolStage($, 0, $(tree).children('span').eq(0))];
	memberInfo['stage1'] = [unGroupedEvolStage($, 1, $(tree).children('span').eq(1).children('span').eq(1))];
	memberInfo['stage1'].push(unGroupedEvolStage($, 1, $(tree).children('span').eq(1).children('span').eq(5)));

	memberInfo['stage2'] = [unGroupedEvolStage($, 2, $(tree).children('span').eq(1).children('span').eq(3))];
	memberInfo['stage2'].push(unGroupedEvolStage($, 2, $(tree).children('span').eq(1).children('span').eq(7)));
	return memberInfo;
}


module.exports = {
	get: getEvolutionChart
}