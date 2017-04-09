module.exports = function() {
	
	let randTime = Math.floor( Math.random() * (2000 - 100) + 100);

	console.log("random time is: " + randTime + "ms");
	return randTime;
};