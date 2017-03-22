var http = require('http');
var httpProxy = require('http-proxy');

var PROXY_TARGET = 'http://localhost:5984';
var PORT = 3000;

var proxy = httpProxy.createProxyServer({});
var server = http.createServer(function(request, response) {
    // here you can insert some custom logic to process `request` or `response`
    proxy.web(request, response, {
        target: PROXY_TARGET
    });
});

console.log('Listening on port %s', PORT);
server.listen(PORT);