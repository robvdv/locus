var dbLocal = new PouchDB('kittens');
var dbRemote = new PouchDB('http://localhost:5984/kittens');

/*dbLocal.info().then(function (info) {
	console.log(info);
})*/
/*
console.log("dbRemote");
dbRemote.info().then(function (info) {
	console.log(info);
})

*/
/*var doc = {
	"_id": "rob0123",
	"recip": "burning-mail",
	"body": "Anybody want ice?"
};
dbLocal.put(doc);*/
/*

dbRemote.get('mittens').then(function (doc) {
	console.log(doc);
});*/


setInterval( function() {
	dbLocal.sync(dbRemote).on('complete', function () {
		console.log('yay!');
	}).on('error', function (err) {
		console.log('boo!');
	});
}, 2000);

var changes = dbLocal.changes({
	since: 'now',
	live: true,
	include_docs: true
}).on('change', function(change) {
		console.log('change: ' + JSON.stringify(change));
	}).on('complete', function(info) {
		console.log('info: ' + JSON.stringify(info));
	}).on('error', function (err) {
		console.log(err);
	});