let fs = require('fs');
var request = require('request');

function writeFile(filepath, data) {
	console.log(data);
	fs.writeFile(filepath, JSON.stringify(data, null, 0), function(error){

		if (error) return console.log(error);

	 		console.log('writing complete: ' + filepath);
	});
}

function writeImage(imgUrl, filepath, attempts) {
	console.log("REQUESTING IMAGE: " + imgUrl);
	
	request(imgUrl)
		.on('error', function(err) {
		    
		    if(attempts <= 3) {
				console.log("Failed to request " + attempts + " times: " + imgUrl);
		    	writeImage(imgUrl, filepath, attempts ++);
		    } else {
		    	console.log("Failed to request 3 times, not trying again: " + imgUrl );
		    }	    
		  
		})
		.pipe(fs.createWriteStream(filepath));
}

module.exports = {
	json: writeFile,
	image: writeImage
}