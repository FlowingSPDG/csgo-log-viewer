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
//var arraymsg = Array ();
var arraymsg = String ();
var receiver = new logReceiver.LogReceiver();
receiver.on("data", function(data) {
	if (data.isValid) {
		console.log("Received at " + data.receivedAt.format() + " a log of type " + data.packetType);
		console.log(data.message);
		msg = (data.message);
		//メッセージ送信処理
		//msg = (data.message);
		//arraymsg += (data.message);
		//arraymsg += ("<br>");
		
			if (msg.indexOf("killed") > -1){
				console.log("KILLED!!");				
				console.log(msg);
				arraymsg += ('<b class="killlog">');
				arraymsg += (data.message);
				arraymsg += ("</b>");
			}
			else if (msg.indexOf("Round_Start") > -1){
				console.log("ROUND HAS STARTED!!");
				console.log(msg);
				arraymsg += ("<h2>");
				arraymsg += ("ROUND HAS STARTED!!");
				arraymsg += ("</h2>");
			}
			else if (msg.indexOf('World triggered "Round_End"') > -1){
				console.log("ROUND HAS ENDED!");
				console.log(msg);
				arraymsg += ("<h2>");
				arraymsg += ("ROUND HAS ENDED!");
				arraymsg += ("</h2>");
			}
			else if (msg.indexOf("Game Over:") > -1){
				console.log("MATCH IS OVER!!!");
				console.log(msg);
				arraymsg += ("<h1>");
				arraymsg += ("MATCH IS OVER!!!");
				arraymsg += ("</h1>");
			}
			else {
				arraymsg += ('<p class="logs">');
				arraymsg += (data.message);
				arraymsg += ("</p>");
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
	'msg' : (arraymsg)
  });
});

//app.use('/ajax', ajax);

app.get('/ajax', (req, res) => {
  res.render('ajax', {
	'msg' : (arraymsg)
  });
});

app.listen(3001, function () {
  console.log('CSGO Log receiver listening on port 3001!');
});