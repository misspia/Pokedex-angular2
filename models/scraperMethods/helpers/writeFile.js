let fs = require('fs');

function writeFile(filepath, data) {

	fs.writeFile(filepath, JSON.stringify(data, null, 4), function(error){

		if (error) return console.log(error);

	 		console.log('writing complete: ' + filepath);
	});
}

module.exports = {
	json: writeFile
}