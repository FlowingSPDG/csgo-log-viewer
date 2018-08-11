const express = require('express');
const fs = require('fs');
const swig  = require('swig');
const levelup = require('level');
var path = require('path');// view engine setup
let db = levelup('.', {valueEncoding: 'json'});


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');



var logReceiver = require("srcds-log-receiver");
var options = {
	port: 9871  // this is the default
};
var matchstart = 'Match_Start';
//document.write("Hello");
var msg = String ();
//var arraymsg = Array ();
var arraymsg = String ();
var receiver = new logReceiver.LogReceiver();
receiver.on("data", function(data) {
	if (data.isValid) {
		console.log("Received at " + data.receivedAt.format() + " a log of type " + data.packetType);
		console.log(data.message);
		msg = (data.message);
		arraymsg += (data.message);
		arraymsg += ("<br>");
		//if (data.message.indexOf (matchstart) > -1) {
		//document.write("Match started");
		//}
	}
});
receiver.on("invalid", function(invalidMessage) {
	console.log("Got some completely unparseable gargbase: " + invalidMessage);
})

/*app.get('/', function (req, res) {
  const t = swig.compileFile(__dirname+'/views/plays.html');
    res.send(msg);
});
*/

app.get('/', (req, res) => {
  res.render('index', {
	'title' : 'CS:GO Server Log viewer',  
    'name': 'jon',
    'content': 'Hello World',
	'msg' : (arraymsg)
  });
});

app.listen(3001, function () {
  console.log('CSGO Log receiver listening on port 3001!');
});