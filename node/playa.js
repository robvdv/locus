var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('ssl/privkey.pem', 'utf8');
var certificate = fs.readFileSync('ssl/cert.pem', 'utf8');

var credentials = {key: privateKey, cert: certificate};
var express = require('express');
var app = express();

http.createServer(function (req, res) {
	//res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
	res.writeHead(301, { "Location": "https://localhost:443" });
	res.end();
}).listen(9080);

//var httpsServer = https.createServer(credentials, app);

var httpsServer = https.createServer(credentials, function (req, res) {
	res.end('secure!');
}).listen(9443);




