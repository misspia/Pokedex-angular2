var request = require('request');

module.exports = function(url) {

	return new Promise( (resolve, reject) => {

		request(url, (error, response, body) => {

			if(!error && response.statusCode == 200){

				resolve(body);

			} else {
				reject(error);
			}
		})
	})
}