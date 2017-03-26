var express = require('express'),
	_ = require('underscore'),
	app = express(),
	request = require('request'),
	nano = require('nano')('http://localhost:5984'),
	bodyParser = require('body-parser'),
	fs = require('fs');

var https = require('https');
var http = require('http');

var privateKey  = fs.readFileSync('ssl/privkey.pem', 'utf8');
var certificate = fs.readFileSync('ssl/cert.pem', 'utf8');
var credentials = {key: privateKey, cert: certificate};

var state = {};

state.messages = [];

state.stepper = {
	angle: 0
};

var startData = [
	{
		_id: 'group_public',
		subkey: 'group_public',
		type: 'contact',
		owner: 'public',
		display_name: 'Public Chat'
	},
		{
			_id: 'group_public_welcome_chat',
			subkey: 'group_public',
			senderId: 'system',
			type: 'chat',
			owner: 'public',
			message: 'Hi there and welcome to the public chat group. Post things here that are of general public interest.'
		},
	{
		_id: 'group_techhelp',
		subkey: 'group_techhelp',
		type: 'contact',
		owner: 'public',
		display_name: 'Technical Help Chat'
	},
	{
		_id: 'group_emergency',
		subkey: 'group_emergency',
		type: 'contact',
		owner: 'public',
		display_name: 'Emergency Only'
	},
	{
		_id: 'group_volunteer',
		subkey: 'group_volunteer',
		type: 'contact',
		owner: 'public',
		display_name: 'Volunteer'
	}
];

var db = nano.db.use('playa');

// wherever your db lives
var DATABASE_URL = 'http://localhost:5984/playa';

// middleware itself, preceding any parsers
app.use(function(req, res, next){
	var proxy_path = req.path.match(/^\/playa(.*)$/);
	console.log('req.path :'  + req.path);
	console.log(proxy_path);
	if(proxy_path){
		var db_url = DATABASE_URL + proxy_path[1];
		req.pipe(request({
			uri: db_url,
			method: req.method
		})).pipe(res);
	} else {
		next();
	}
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/msg', function (req, res, next) {
	res.send(JSON.stringify({
		messages: state.messages
	}));
});

app.post('/api/msg', function (req, res, next) {
	req.body.angle = state.stepper.angle;
	state.messages.push(req.body);
	res.send("success");
});

app.post('/api/user/register', function (req, res, next) {
	//req.body.angle = state.stepper.angle;
	var userDetails = req.body;
	userDetails.type = 'contact';
	userDetails.owner = 'public';
	userDetails.subkeys = ['group_public'];

	db.insert(userDetails, function(err, body, header) {
		if (err) {
			console.log('[db.insert] ', err.message);
			return;
		}
		console.log('Inserted a new user.');
		var response = {
			status: 'ok',
			data: _.extend( userDetails, body )
		};
		res.send(response);
	});

});

app.get('/api/db/create', function (req, res, next) {

	nano.db.create('playa', function() {
		res.setHeader('Content-Type', 'application/json');
		res.send(JSON.stringify(arguments));
	});

});


app.get('/api/db/destroy', function (req, res, next) {

	nano.db.destroy('playa', function() {
		res.setHeader('Content-Type', 'application/json');
		res.send(JSON.stringify(arguments));
	});

});

app.get('/api/db/filter/create', function (req, res, next) {
	var playa = nano.use('playa');
	playa.insert(
		{
			_id: "_design/app",
			"filters": {
				"sync_user": "function(doc, req) { " +

/*					"return (doc._id === '_design/app') || (doc.chatId === req.query.owner) || (doc.owner === req.query.owner) || (doc.owner === 'public');" +
					"}"*/
						"return (doc._id === '_design/app') || " +
						//"((typeof doc.chatId === 'string') && (doc.chatId === req.query.owner) || (doc.chatId.indexOf(req.query.owner) !== -1)) || " +
						"((doc.subkey) && (req.query.subkeys.indexOf(doc.subkey) !== -1)) || " +
						"(doc.owner === 'public') || (doc.senderId === req.query.owner) || (doc.recipientId === req.query.owner);" +
					"}"


/*					"return (doc._id === '_design/app') || (doc.owner === req.query.owner) || (doc.owner === 'public') ||" +
					"(" +
						"(doc.chatId) && " +
							"(" +
								"(typeof doc.chatId === 'string') && (doc.chatId === req.query.owner)" +
							") || " +
							"(doc.chatId.indexOf(req.query.owner) > -1)" +
						")" +
					"); }"*/
			}
		}, function(error, response) {
			res.setHeader('Content-Type', 'application/json');
			res.send(JSON.stringify(arguments));
		}
	);
});

app.get('/api/db/startdata/create', function (req, res, next) {
	var playa = nano.use('playa');

	playa.bulk(
		{
			docs: startData
		},
		function(err, body) {
			res.setHeader('Content-Type', 'application/json');
			res.send(JSON.stringify(arguments));
		}
	);

});


var SerialPort = require('serialport');
var serialOpen;

function serialConnect() {

	// list serial ports:
	SerialPort.list(function (err, ports) {
		ports.forEach(function(port) {
			console.log('Found port: ' + port.comName);
			if (port.comName.toLowerCase().indexOf('usb') > 0) {
				console.log('Found USB: ' + port.comName);

				serialOpen = new SerialPort(port.comName);

				serialOpen.on('open', function(){
					console.log('Serial Port Opened');
					serialOpen.on('data', function(data){
						state.stepper.angle = String.fromCharCode.apply(null, data);
						console.log( 'Stepper angle: ' + state.stepper.angle );
					});
				});


			}

		});
	});
}

serialConnect();

var httpServer = http.createServer(function (req, res) {
	//res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
	res.writeHead(301, { "Location": "https://localhost:443" });
	res.end();
}).listen(80);

var httpsServer = https.createServer(credentials, app);

httpsServer.listen(443);

app.use(express.static(__dirname + '/public'));
//app.listen(port);