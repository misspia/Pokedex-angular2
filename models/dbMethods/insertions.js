// column and data should be arrays

function insert(table, column, data){

	query.client(
		'insert into ' + table + '(' + column + ') ' +
		'values (' + data + ');'
 	);
}

module.exports = {
	insert: insert
}