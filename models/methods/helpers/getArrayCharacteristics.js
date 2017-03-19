module.exports = function($, nodeContainer) {
	
	let characteristics = [];
	
	$(nodeContainer).map( (i, element) => {
		 characteristics.push($(element).text());
	})

	return characteristics;
}
