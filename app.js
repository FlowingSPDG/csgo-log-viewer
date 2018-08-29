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
//var matchstart = 'Match_Start';
//document.write("Hello");
var msg = String ();
//var msgstring = Array ();
var msgstring = String ();
var mapname = String ();
var ctname = String ();
var tname = String ();
var ctnamepug = String ();
var tnamepug = String ();
var killlog = String ();
var triggerednum = Number ();
var name = String ();
var chatmsg = String ();
var chatmsg2 = String ();
var chatmsgpos = Number ();
var devprefix = String ();
var roundcount = Number ();
var ctscore = Number ();
var trscore = Number ();
devprefix = ('[DEBUG] : ');
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
				//msgstring += ('<b class="killlog">' + data.message + "</b><br>");
				var namekari = msg.substr(23,triggerednum); //日時を削除
				var triggerednamepos = namekari.indexOf("<"); //<の文字列が見つかった場所を返す
				triggerednamepos--; //二重引用符削除
				var killer = namekari.substr(1,triggerednamepos);
				var victimnamepos = namekari.indexOf('killed "'); //killedが見つかった場所を返す
				victimnamepos = victimnamepos + 6; //二重引用符削除
				var victimkari = namekari.substr(victimnamepos);
				var victimnamepos2 = victimkari.indexOf('<'); // <が見つかった場所を返す
				victimnamepos2--;
				victimnamepos2--;
				var victim = victimkari.substr(2,victimnamepos2); //二重引用符対策に1文字目から
				var weaponnamepos = namekari.indexOf("with "); // withの文字列が見つかった場所を返す,weapon
				weaponnamepos--;
				var weaponnamekari = namekari.substr(weaponnamepos);
				var weaponnamepos2 = weaponnamekari.indexOf('"'); // "が見つかった場所を返す,weapon
				var weaponname = weaponnamekari.substr(weaponnamepos2);
				
				console.log( devprefix + 'KILLER = ' + killer + ',' + 'VICTIM IS' + victim + 'WEAPON IS ' + weaponname);
				//killlog += ('<b class="killlog">'　+ killer + ' killed ' + victim + ' with ' + weaponname + '</b>' + '<br>');
				msgstring += ('<b class="killlog">'　+ killer + ' killed ' + victim + ' with ' + weaponname + '</b>' + '<br>');
			}
			else if (msg.indexOf('World triggered "Match_Start"') > -1){
				console.log("MATCH HAS STARTED!!");
				console.log(msg);
				msgstring = "";
				msgstring += ("<h2>");
				msgstring += ("MATCH HAS STARTED!!");
				msgstring += ("</h2>");
				roundcount = 0;
			}
			else if (msg.indexOf('World triggered "Round_Start"') > -1){
				console.log("ROUND HAS STARTED!");
				console.log(msg);
				msgstring += ("<h2>");
				msgstring += ("ROUND HAS STARTED!");
				msgstring += ("</h2>");
				roundcount ++;
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
				//var result = msg.substr(23);
				//var result2 = result.substr(-25,20);
				
				var triggerednum = msg.indexOf('triggered',23); //文字列"triggered"が見つかった場所を返す
				console.log(triggerednum);
				var result = msg.substr(triggerednum); //triggered以降の文字列を返す
				var namekari = msg.substr(23,triggerednum); //日時の文字列を削除
				var triggerednamepos = namekari.indexOf("<"); //<の文字列が見つかった場所を返す
				triggerednamepos--; //二重引用符削除
				var name = namekari.substr(1,triggerednamepos);
				
				
				console.log(result);
				msgstring += ("<h3>");
				msgstring += ('<font color="red">');
				msgstring += (name);
				msgstring += ('</font>');
				msgstring += (" PLANTED THE BOMB!");
				msgstring += ("</h3>");
			}
			else if (msg.indexOf('triggered "Dropped_The_Bomb"') > -1){
				console.log("BOMB DROPPED!");
				console.log(msg);
				//var result = msg.substr(23);
				//var result2 = result.substr(-25,20);
				
				var triggerednum = msg.indexOf('triggered',23); //文字列"triggered"が見つかった場所を返す
				console.log(triggerednum);
				var result = msg.substr(triggerednum); //triggered以降の文字列を返す
				var namekari = msg.substr(23,triggerednum); //日時の文字列を削除
				var triggerednamepos = namekari.indexOf("<"); //<の文字列が見つかった場所を返す
				triggerednamepos--; //二重引用符削除
				var name = namekari.substr(1,triggerednamepos);
				
				/*
				console.log(result);
				msgstring += ("<h3>");
				msgstring += ('<font color="red">');
				msgstring += (name);
				msgstring += ('</font>');
				msgstring += (" DROPPED BOMB!");
				msgstring += ("</h3>");
				*/
			}
			else if (msg.indexOf('triggered "Got_The_Bomb"') > -1){
				console.log("BOMB HAS BEEN TAKEN!");
				console.log(msg);
				var triggerednum = msg.indexOf('triggered',23); //文字列"triggered"が見つかった場所を返す
				console.log(triggerednum);
				var result = msg.substr(triggerednum); //triggered以降の文字列を返す
				var namekari = msg.substr(23,triggerednum); //日時の文字列を削除
				var triggerednamepos = namekari.indexOf("<"); //<の文字列が見つかった場所を返す
				triggerednamepos--; //二重引用符削除
				var name = namekari.substr(1,triggerednamepos);
				/*
				msgstring += ("<h3>");
				msgstring += ('<font color="red">');
				msgstring += (name);
				msgstring += ('</font>');
				msgstring += (' GOT THE BOMB!');
				msgstring += ("</h3>");
				*/
			}
			else if (msg.indexOf('Begin_Bomb_Defuse') > -1){
				console.log("BOMB DEFUSE STARTED!");
				console.log(msg);
				//var result = msg.substr(23);
				//var result2 = result.substr(-25,20);
				
				var triggerednum = msg.indexOf('triggered',23); //文字列"triggered"が見つかった場所を返す
				console.log(triggerednum);
				var result = msg.substr(triggerednum); //triggered以降の文字列を返す
				var namekari = msg.substr(23,triggerednum); //日時の文字列を削除
				var triggerednamepos = namekari.indexOf("<"); //<の文字列が見つかった場所を返す
				triggerednamepos--; //二重引用符削除
				var name = namekari.substr(1,triggerednamepos);
				
				
				console.log(result);
				msgstring += ("<h3>");
				msgstring += ('<font color="cyan">');
				msgstring += (name);
				msgstring += ('</font>');
				msgstring += (" IS TRYING TO DEFUSE THE BOMB!");
				msgstring += ("</h3>");
			}
			else if (msg.indexOf('"Defused_The_Bomb"') > -1){
				console.log("BOMB HAS BEEN DEFUSED!");
				console.log(msg);
				//var result = msg.substr(23);
				//var result2 = result.substr(-25,20);
				
				var triggerednum = msg.indexOf('triggered',23); //文字列"triggered"が見つかった場所を返す
				console.log(triggerednum);
				var result = msg.substr(triggerednum); //triggered以降の文字列を返す
				var namekari = msg.substr(23,triggerednum); //日時の文字列を削除
				var triggerednamepos = namekari.indexOf("<"); //<の文字列が見つかった場所を返す
				triggerednamepos--; //二重引用符削除
				var name = namekari.substr(1,triggerednamepos);
				
				
				console.log(result);
				msgstring += ("<h3>");
				msgstring += ('<font color="cyan">');
				msgstring += (name);
				msgstring += ('</font>');
				msgstring += (" DEFUSED THE BOMB!");
				msgstring += ("</h3>");
			}
			else if (msg.indexOf('SFUI_Notice_Terrorists_Win') > -1){
				if (msg.indexOf('(T "16")') > -1){
					console.log("MATCH IS OVER!!");
					console.log(msg);
					msgstring += ("<h1>");
					msgstring += ("MATCH IS OVER!!!");
					msgstring += ("<br>");
					msgstring += ("TERRORISTS WINS!");
					msgstring += ("</h1>");
					/*channel = client.channels.get('409362106450837515'); //report
					channel.send(data.message);
					channel.send('CT WINS!');*/
					msgstring += ('<h1>');
					msgstring += ('MATCH HISTORY WILL BE CLEAR IN 10sec...');
					msgstring += ('</h1>');
					//sleep(10000);
					msgstring = String ();
				}
				else {
					console.log("ROUND IS OVER!!");
					console.log(msg);
					msgstring += ('<h3 class="trwin">');
					msgstring += ("Terrorists wins the round!");
					msgstring += ("</h3>");
					//trscore++;
					//msgstring += ("<h3>" + "T SCORE : " + trscore);
				}
			}
			else if (msg.indexOf('SFUI_Notice_Target_Bombed') > -1){
				if (msg.indexOf('(T "16")') > -1){
					console.log("MATCH IS OVER!!");
					console.log(msg);
					msgstring += ("<h1>");
					msgstring += ("MATCH IS OVER!!!");
					msgstring += ("<br>");
					msgstring += ("TERRORISTS WINS!");
					msgstring += ("</h1>");
					/*channel = client.channels.get('409362106450837515'); //report
					channel.send(data.message);
					channel.send('CT WINS!');*/
					msgstring += ('<h1>');
					msgstring += ('MATCH HISTORY WILL BE CLEAR IN 10sec...');
					msgstring += ('</h1>');
					//sleep(10000);
					msgstring = String ();
				}
				else {
					console.log("ROUND IS OVER!!");
					console.log(msg);
					msgstring += ('<h3 class="trwin">');
					msgstring += ("Terrorists wins the round!");
					msgstring += ("</h3>");
					//trscore++;
					//msgstring += ("<h3>" + "T SCORE : " + trscore);
				}
			}
			else if (msg.indexOf('SFUI_Notice_CTs_Win') > -1){
				if (msg.indexOf('(CT "16")') > -1){
					console.log("MATCH IS OVER!!");
					console.log(msg);
					msgstring += ("<h1>");
					msgstring += ("MATCH IS OVER!!!");
					msgstring += ("<br>");
					msgstring += ("COUNTER TERRORISTS WINS!");
					msgstring += ("</h1>");
					msgstring += ('<h1>');
					msgstring += ('MATCH HISTORY WILL BE CLEAR IN 10sec...');
					msgstring += ('</h1>');
					//sleep(10000);
					msgstring = String ();
				}
				else {
					console.log("ROUND IS OVER!!");
					console.log(msg);
					msgstring += ('<h3 class="ctwin">');
					msgstring += ("Counter-errorists wins the round!");
					msgstring += ("</h3>");
					//ctscore++;
					//msgstring += ("<h3>" + "CT SCORE : " + ctscore + "</h3>");
				}
			}
			else if (msg.indexOf('SFUI_Notice_Bomb_Defused') > -1){
				if (msg.indexOf('(CT "16")') > -1){
					console.log("MATCH IS OVER!!");
					console.log(msg);
					msgstring += ("<h1>");
					msgstring += ("MATCH IS OVER!!!");
					msgstring += ("<br>");
					msgstring += ("COUNTER TERRORISTS WINS!");
					msgstring += ("</h1>");
					msgstring += ('<h1>');
					msgstring += ('MATCH HISTORY WILL BE CLEAR IN 10sec...');
					msgstring += ('</h1>');
					//sleep(10000);
					msgstring = String ();
				}
				else {
					console.log("ROUND IS OVER!!");
					console.log(msg);
					msgstring += ('<h3 class="ctwin">');
					msgstring += ("Counter-errorists wins the round!");
					msgstring += ("</h3>");
					//ctscore++;
					//msgstring += ("<h3>" + "CT SCORE : " + ctscore + "</h3>");
				}
			}
			else if (msg.indexOf("Game Over:") > -1){
				console.log("MATCH IS OVER!!!");
				console.log(msg);
				msgstring += ("<h1>");
				msgstring += ("MATCH IS OVER!!!");
				msgstring += ("</h1>");
				msgstring += ('<h1>');
				msgstring += ('MATCH HISTORY WILL BE CLEAR IN 10sec...');
				msgstring += ('</h1>');
				//sleep(10000);
				msgstring = String ();
			}
			else if (msg.indexOf('say "') > -1){
				console.log("Say command detected");
				console.log(msg);
				
				var namekari = msg.substr(23); // 日時の文字列を削除
				var namepos = namekari.indexOf('<'); // <が見つかった場所を返す
				console.log(chatmsgpos);
				namepos--; //二重引用符削除
				var name = namekari.substr(1,namepos);
				
				var chatpos = namekari.indexOf('say "'); // sayが見つかった場所を返す
				chatpos = chatpos+=5; //二重引用符削除
				var chatmsgkari = namekari.substr(chatpos);
				var chatmsg = chatmsgkari.substring( 0, chatmsgkari.length-1 );
				
				msgstring += ('<p class="chat">');
				msgstring += (name + ' ' + ':' + ' ' + chatmsg);
				msgstring += ('</p>');
			}
			else if (msg.indexOf('switched from team') > -1){
				console.log("Team switch");
				console.log(msg);
				
				var namekari = msg.substr(23); // 日時を削除
				var namepos = namekari.indexOf('<'); // <が見つかった場所を返す
				console.log(chatmsgpos);
				namepos--; //二重引用符削除
				var name = namekari.substr(1,namepos);
				
				var switchpos = namekari.indexOf('switched from team <'); // switchが見つかった場所を返す
				switchpos = switchpos+=2; //二重引用符削除
				var switchkari = namekari.substr(switchpos);
				var switchpos2 = switchkari.indexOf('<'); // <が見つかった場所を返す
				var switchlog = switchkari.substr(switchpos2);
				
				var frompos1 = switchlog.indexOf('<'); // 最初の<が見つかった場所を返す
				var frompos2 = switchlog.indexOf('>'); // 最初の<が見つかった場所を返す
				frompos1++;
				frompos2--;
				var teamfrom = switchlog.substr(frompos1,frompos2);
				
				var topos1 = switchlog.indexOf('to <'); // toが見つかった場所を返す
				topos1 = topos1 +4;
				var teamtokari = switchlog.substr(topos1,topos2);
				var topos2 = teamtokari.indexOf('>'); // 最後の<が見つかった場所を返す
				var teamto = teamtokari.substr(0,topos2);
				
				if ( teamto == 'TERRORIST') {
					teamto = '<font color=orange>' + teamto + '</font>';
				}
				if ( teamto == 'CT') {
					teamto = '<font color=cyan>' + teamto + '</font>';
				}
				if ( teamto == 'Spectator') {
					teamto = '<font color=grey>' + teamto + '</font>';
				}
				if ( teamfrom == 'TERRORIST') {
					teamfrom = '<font color=orange>' + teamfrom +'</font>';
				}
				if ( teamfrom == 'CT') {
					teamfrom = '<font color=cyan>' + teamfrom + '</font>';
				}
				if ( teamfrom == 'Spectator') {
					teamfrom = '<font color=grey>' + teamfrom + '</font>';
				}
				
				
				console.log ( devprefix + 'switchlog is' + ' : ' + switchlog);
				console.log ( devprefix + 'teamfrom is' + ' : ' + teamfrom);
				console.log ( devprefix + 'teamto is' + ' : ' + teamto);
				msgstring += ('<p class="switch">');
				msgstring += (name + ' has switched team ' + teamfrom + ' to ' + teamto);
				msgstring += ('</p>');
			}
			else if (msg.indexOf('Started map "') > -1){
				console.log("Map start detected!");
				console.log(msg);
				var mapnamekari = msg.substr(23); // 日時を削除
				var mapnamepos1 = mapnamekari.indexOf('" (CRC'); // 最初の<が見つかった場所を返す
				var mapname = msg.substr(35,mapnamepos1);
				console.log(devprefix + 'MAPNAME IS ' + mapname);
			}
			
			else if (msg.indexOf('" scored ') > -1){
				console.log("score detected!");
				console.log(msg);
				var scorekari = msg.substr(29); // 日時を削除
				var teamname1pos = scorekari.indexOf('"'); // 最初のダブルクオーテーションが見つかった場所を返す
				
				var teamname = scorekari.substr(0,teamname1pos);
				scorekari = scorekari.substr(11);
				var team1scorepos1 = scorekari.indexOf('"'); // 最初のダブルクオーテーションが見つかった場所を返す
				team1scorepos1 ++;
				var team1score = scorekari.substr(team1scorepos1);
				var team1scorepos2 = scorekari.indexOf('" w'); // withの場所を返す
				var team1score = team1score.substr(0,team1scorepos2);
				var score1 = scorekari.slice(0,-17);
				var score1 = score1.replace( "scored" , "" ) ;

				var scoreboardprefix = '[SCOREBOARD]';
				console.log(devprefix + teamname); 
				//console.log(devprefix + team1score); 
				console.log(devprefix + scorekari); 
				console.log(devprefix + score1); 
				console.log(devprefix + teamname + " scored " + score1);
				msgstring += ('<h2>' + scoreboardprefix + " " + teamname + " SCORED " + score1 + "</h2><br>");
				
				//msgstring += (teamname + ' SCORED : ' + " ");
				
				//console.log(devprefix + score); 
				//08/29/2018 - 08:52:35: Team "CT" scored "1" with "2" players
			}
			
			
			else if (msg.indexOf('Team playing "CT":') > -1){
				console.log("CT TeamName Detected!");
				console.log(msg);
				var ctnamepos1 = msg.indexOf('"CT": '); // 最初の<が見つかった場所を返す
				ctnamepos1 = ctnamepos1 + 6;
				var ctname = msg.substr(ctnamepos1);
				console.log(devprefix + 'CT TEAM NAME IS ' + ctname);
				msgstring += ('CT TEAM NAME IS ' + ctname + '<br>');
				ctnamepug += (ctname);
				////Team playing "CT": <pŠ>
			}
			else if (msg.indexOf('Team playing "TERRORIST":') > -1){
				console.log("T TeamName Detected!");
				console.log(msg);
				var tnamepos1 = msg.indexOf('"TERRORIST'); // 最初の<が見つかった場所を返す
				tnamepos1 = tnamepos1 + 13;
				var tname = msg.substr(tnamepos1);
				console.log(devprefix + 'T TEAM NAME IS ' + tname);
				msgstring += ('T TEAM NAME IS ' + tname + '<br>');
				tnamepug += (tname);
				////Team playing "TERRORIST": tes
			}
			else if (msg.indexOf("attacked") > -1){
				console.log("Attack log detected");
				//console.log(msg);
			}
			else if (msg.indexOf("purchased") > -1){
				console.log("Purchased log detected");
				//console.log(msg);
			}
			else if (msg.indexOf("server_cvar") > -1){
				console.log("server_cvar log detected");
				//console.log(msg);
			}
			
			/*
			else if (msg.indexOf("server cvars start") > -1){
				console.log("server cvar start detected");
				//console.log(msg);
				var pushtomsg = false;
			}
			else if (msg.indexOf("server cvars end") > -1){
				console.log("server cvar end detected");
				//console.log(msg);
				var pushtomsg = true;
			}
			*/
			
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
				//console.log(msg);
			}
			else if (msg.indexOf("Molotov projectile spawned") > -1){
				console.log("Molotov log detected");
				console.log(msg);
			}
			else if (msg.indexOf("assisted killing") > -1){
				console.log("Assisted log detected");
				console.log(msg);
			}
			else if (msg.indexOf("Starting Freeze period") > -1){
				console.log("Freezetime log detected");
				console.log(msg);
			}
			else {
				//msgstring += ('<p class="logs">');
				//msgstring += (data.message);
				//msgstring += ("</p>");
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
	'map' : (mapname),
	'msg' : (msgstring),
	'ct' : (ctname),
	't' : (tname),
	pretty: true
	//'killlog' : (killlog)
  });
});

//app.use('/ajax', ajax);

app.get('/ajax', (req, res) => {
  res.render('ajax', {
	'msg' : (msgstring),
	'map' : (mapname),
	'ct' : (ctnamepug),
	't' : (tnamepug),
	pretty: true
	//'killlog' : (killlog)
  });
});

app.listen(3001, function () {
  console.log('CSGO Log receiver listening on port 3001!');
});