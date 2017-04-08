// column and data should be arrays
// table name is object key (assuming use of for in loops)
function insert(table, obj){

	var query =	'insert into pokemon.' + table + '(' + commaSeparateFields(obj, true) + ') ' +
				'values (' + commaSeparateFields(obj) + ');'

	return query;
}


function commaSeparateFields(obj, columnHead = false) {
	let fields = "";

	if(columnHead) { // list the keys

		for(var key in obj) {

			fields += key + ",";
		}

	} else { // list the values

		for(var key in obj) {
			fields += obj[key] + ",";
		}
	}

	return fields.slice(0, -1);
}

var test = {
	p: 1,
	i: 2,
	a: 3
};

var testHead = commaSeparateFields(test, true);
var testBody = commaSeparateFields(test);
console.log(testHead);
console.log(testBody);

module.exports = {
	insert: insert
}