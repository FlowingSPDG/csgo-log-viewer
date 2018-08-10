const express = require('express');
const app = express();
const fs = require('fs');
const swig  = require('swig');

const levelup = require('level');

let db = levelup('.', {valueEncoding: 'json'});

var logReceiver = require("srcds-log-receiver");
var options = {
	port: 9871  // this is the default
};
var matchstart = 'Match_Start';
//document.write("Hello");

var receiver = new logReceiver.LogReceiver();
receiver.on("data", function(data) {
	if (data.isValid) {
		console.log("Received at " + data.receivedAt.format() + " a log of type " + data.packetType);
		console.log(data.message);
		msg = (data.message);
		//if (data.message.indexOf (matchstart) > -1) {
		//document.write("Match started");
		//}
	}
});
receiver.on("invalid", function(invalidMessage) {
	console.log("Got some completely unparseable gargbase: " + invalidMessage);
})

app.get('/', function (req, res) {
  const t = swig.compileFile(__dirname+'/views/plays.html');
    res.send(msg);
});

app.listen(3001, function () {
  console.log('CSGO Log receiver listening on port 3001!');
});