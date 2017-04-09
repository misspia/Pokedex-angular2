let fs = require('fs');

function writeFile(filepath, data) {

	fs.writeFile(filepath, JSON.stringify(data, null, 4), function(error){

		if (error) return console.log(error);

	 		console.log('writing complete: ' + filepath);
	});
}

function writeImage(imgUrl, pokemonName) {
	
	request(imgUrl)
		.on('error', function(err) {
		    console.log("couldn't download " + pokemonName);
		  
		})
		.pipe(fs.createWriteStream('./src/assets/images/'+ pokemonName.toLowerCase() + ".jpg"));
}

module.exports = {
	json: writeFile,
	image: writeImage
}