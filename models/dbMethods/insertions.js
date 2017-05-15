function insert(table, id, data, arr = false) {
	let formattedString;

	if(data instanceof Array) {
		formattedString = insertArray(table, id, data);

	} else if(typeof data === "object") {
		if(arr) {
			formattedString = insertObjectWithArray(table, id, data)
			
		} else {
			formattedString = insertObject(table, id, data);
			
		}		
	} else {
		console.log('unhandled data type');
	}
	return formattedString;
}

function removeSpecialCharacters(str) {
	str = str.replace(/'s/g, "’s");
	str = str.replace(/'t/g, "’t");
	str = str.replace(/'o/g, "’o");
	str = str.replace(/'d/g, "’d");
	str = str.replace(/'D/g, "’D");
	str = str.replace(/'u/g, "’u");
	str = str.replace(/'e/g, "’e");
	str = str.replace(/s'/g, "s’");
	return str
}

function insertArray(table, id, arr) {
	let formattedString = "";
	for(let i = 0; i < arr.length; i ++) {
		
		let row = 'INSERT into ' + table + ' VALUES(\'' + id + '\', \'' + removeSpecialCharacters(arr[i]) + '\');\n';
		formattedString += row;
	}
	return formattedString;
}

function insertObjectWithArray(table, id, obj) {	
	let formattedString = "";

	for(key in obj) {		
		let newArr = obj[key][0].split(", ");

		for(let i = 0; i < newArr.length; i ++) {
			let row = 'INSERT into ' + table + ' VALUES(\'' +  id + '\', \'' +  key + '\', \'' +  removeSpecialCharacters(newArr[i]) + '\');\n';
			formattedString += row;
		}
	}
	return formattedString;
}

function insertObject(table, id, obj, category = "") {
	let formattedString = "";
	
	for(key in obj) {
		let row = 'INSERT into ' + table + ' VALUES(\'' +  id + '\', \'' + key + '\', \'' +  removeSpecialCharacters(obj[key]) + '\');\n';
		formattedString += row;
	}
	return formattedString;
}

function insertPokemonMoves(table, id, obj) {
	let formattedString = "";

	for(let category in obj) {
		for(let i = 0; i < obj[category].length; i ++) {

			let moveObj = obj[category][i];
			formattedString += 'INSERT into ' + table + ' (unique_id, method, ' +  combineObjectKeysValues(moveObj) + ')' +
			' VALUES(\'' +  id + '\', \'' + category + '\', ' +  combineObjectKeysValues(moveObj, false) + ');\n';
		}
	}	
	return formattedString;
}

function insertObjectWithCategory(table, id, obj, category) {
	let formattedString = "";

	for(key in obj) {
		let row = 'INSERT into ' + table + ' (unique_id, method, ' +  combineObjectKeysValues(obj) + ')' +
		' VALUES(\'' +  id + '\', \'' + category + '\', ' +  combineObjectKeysValues(obj, false) + ');\n';
		formattedString += row;
	}
	return formattedString;
}

function combineObjectKeysValues(obj, combineKey = true) {

	let arr = [];

	for(key in obj) {
		if(combineKey) {
			arr.push(key.toLowerCase());
		} else {
			if(obj[key] == '∞') {
				arr.push('\'infinity\'');
			} else {
				arr.push('\'' + obj[key] + '\'');
			}		
		}	
	}
	return arr.join(", ");
}

module.exports = {
	generate: insert,
	moves:insertPokemonMoves,
	normalizeString: removeSpecialCharacters
}



