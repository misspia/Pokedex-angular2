module.exports = function() {
	
	let randTime =  Math.random() * (5000 - 800) + 800;

	console.log("random time is: " + randTime + " ms");
	return randTime;
};