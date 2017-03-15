var express = require('express'),
	_ = require('underscore'),
	app = express(),
	nano = require('nano')('http://localhost:5984'),
	bodyParser = require('body-parser'),
	io = require('socket.io')(app.listen(8081)),
	port = process.env.PORT || 4000;


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
/*

app.get('/api/db/filter/create', function (req, res, next) {
	var playa = nano.use('playa');
	playa.insert(
		{
			_id: "_design/app",
			"filters": {
				"sync_user": "function(doc, req) { " +
					"return (doc._id === '_design/app') || (doc.owner === req.query.owner) || (doc.owner === 'public'); }"
			}
		}, function(error, response) {
			res.setHeader('Content-Type', 'application/json');
			res.send(JSON.stringify(arguments));
		}
	);
});
*/

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
						"(doc.owner === req.query.owner) || (doc.recipientId === req.query.owner) || (doc.owner === 'public');" +
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


app.use(express.static(__dirname + '/public'));
app.listen(port);