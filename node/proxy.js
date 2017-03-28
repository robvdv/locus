var express = require('express'),
	_ = require('underscore'),
	app = express(),
	request = require('request'),
	nano = require('nano')('http://localhost:5984'),
	bodyParser = require('body-parser'),
	fs = require('fs');

var http = require('http');
var httpProxy = require('http-proxy');

httpProxy.createProxyServer({target:'http://localhost:5984'}).listen(80);