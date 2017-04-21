// column and data should be arrays
// table name is object key (assuming use of for in loops)
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
		console.log('unhandled data type: neither object nor array');
	}
	return formattedString;
}

function insertArray(table, id, arr) {
	let formattedString = "";

	for(let i = 0; i < arr.length; i ++) {
		
		let row = 'INSERT into ' + table + 'VALUES(\'' + id + '\', ' + arr[i] + ');\n';
		formattedString += row;
	}
	return formattedString;
}

function insertObjectWithArray(table, id, obj) {	
	let formattedString = "";

	for(key in obj) {		
		for(let i = 0; i < obj[key].length; i ++) {

			let row = 'INSERT into ' + table + ' VALUES(\'' +  id + '\', ' +  key + '\', ' +  obj[key] + ');\n';
			formattedString += row;
		}
	}
	return formattedString;
}

function insertObject(table, id, obj) {
	let formattedString = "";
	
	for(key in obj) {
		let row = 'INSERT into ' + table + ' VALUES(\'' +  id + '\', ' +  key + '\', ' +  obj[key] + ');\n';
		formattedString += row;
	}
	return formattedString;
}


module.exports = {
	generate: insert
}