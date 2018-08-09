var logReceiver = require("srcds-log-receiver");
var options = {
	port: 9871  // this is the default
};

var receiver = new logReceiver.LogReceiver();
receiver.on("data", function(data) {
	if (data.isValid) {
		console.log("Received at " + data.receivedAt.format() + " a log of type " + data.packetType);
		console.log(data.message);
	}
});
receiver.on("invalid", function(invalidMessage) {
	console.log("Got some completely unparseable gargbase: " + invalidMessage);
})