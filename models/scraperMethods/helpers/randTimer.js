module.exports = function() {
	
	let randTime = Math.floor( Math.random() * (5000 - 600) + 600);

	console.log("random time is: " + randTime + "ms");
	return randTime;
};