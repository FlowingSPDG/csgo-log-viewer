const express = require('express');
const fs = require('fs');
const swig  = require('swig');
const levelup = require('level');
var path = require('path');// view engine setup
//var ajax = require('./routes/ajax');
let db = levelup('.', {valueEncoding: 'json'});


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
router = express.Router();
app.use(express.static('public'));



var logReceiver = require("srcds-log-receiver");
var options = {
	port: 9871  // this is the default
};
var matchstart = 'Match_Start';
//document.write("Hello");
var msg = String ();
//var msgstring = Array ();
var msgstring = String ();
var receiver = new logReceiver.LogReceiver();
receiver.on("data", function(data) {
	if (data.isValid) {
		//console.log("Received at " + data.receivedAt.format() + " a log of type " + data.packetType);
		console.log(data.message);
		msg = (data.message);
		//メッセージ送信処理
		//msg = (data.message);
		//msgstring += (data.message);
		//msgstring += ("<br>");
		
			if (msg.indexOf("killed") > -1){
				console.log("KILLED!!");				
				console.log(msg);
				msgstring += ('<b class="killlog">');
				msgstring += (data.message);
				msgstring += ("</b><br>");
			}
			else if (msg.indexOf('World triggered "Match_Start"') > -1){
				console.log("ROUND HAS STARTED!!");
				console.log(msg);
				msgstring += ("<h2>");
				msgstring += ("ROUND HAS STARTED!!");
				msgstring += ("</h2>");
			}
			else if (msg.indexOf('World triggered "Round_Start"') > -1){
				console.log("ROUND HAS STARTED!");
				console.log(msg);
				msgstring += ("<h2>");
				msgstring += ("ROUND HAS STARTED!");
				msgstring += ("</h2>");
			}
			else if (msg.indexOf('World triggered "Round_End"') > -1){
				console.log("ROUND HAS ENDED!");
				console.log(msg);
				msgstring += ("<h2>");
				msgstring += ("ROUND HAS ENDED!");
				msgstring += ("</h2>");
			}
			else if (msg.indexOf('triggered "Planted_The_Bomb"') > -1){
				console.log("BOMB HAS BEEN PLANTED!");
				console.log(msg);
				msgstring += ("<h2>");
				msgstring += ("BOMB HAS BEEN PLANTED!");
				msgstring += ("</h2>");
			}
			else if (msg.indexOf("Game Over:") > -1){
				console.log("MATCH IS OVER!!!");
				console.log(msg);
				msgstring += ("<h1>");
				msgstring += ("MATCH IS OVER!!!");
				msgstring += ("</h1>");
			}
			else if (msg.indexOf('say "') > -1){
				console.log("Say command detected");
				console.log(msg);
				msgstring += ('<p class="say">');
				msgstring += (msg);
				msgstring += ('</p>');
			}
			else if (msg.indexOf("attacked") > -1){
				console.log("Attack log detected");
				console.log(msg);
			}
			else if (msg.indexOf("purchased") > -1){
				console.log("Purchased log detected");
				console.log(msg);
			}
			else if (msg.indexOf("server_cvar") > -1){
				console.log("server_cvar log detected");
				console.log(msg);
			}
			else if (msg.indexOf("blinded") > -1){
				console.log("blinded log detected");
				console.log(msg);
			}
			else if (msg.indexOf("threw") > -1){
				console.log("threw log detected");
				console.log(msg);
			}
			else if (msg.indexOf("left buyzone") > -1){
				console.log("left buyzone log detected");
				console.log(msg);
			}
			else {
				msgstring += ('<p class="logs">');
				msgstring += (data.message);
				msgstring += ("</p>");
			}
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
    'content': 'Hello World',
	'msg' : (msgstring)
  });
});

//app.use('/ajax', ajax);

app.get('/ajax', (req, res) => {
  res.render('ajax', {
	'msg' : (msgstring)
  });
});

app.listen(3001, function () {
  console.log('CSGO Log receiver listening on port 3001!');
});