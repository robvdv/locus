requirejs.config({
	baseUrl: 'js/lib',
	paths: {
		app: '../app',
		jquery: 'jquery-3.1.1',
        underscore: 'underscore',
        moment: 'moment',
		Backbone: 'backbone',
		pouchdb: 'pouchdb-6.1.2',
		'pouchdb.find': 'pouchdb.find',
		'BackbonePouch': 'backbone-pouch'
	},
	shim: {
		'BackbonePouch': {
			deps: ['underscore'],
			exports: 'BackbonePouch'
		}
	}
});

requirejs([
	'jquery',
	'app/app',
	'app/render'],
function(
	$,
	app,
	render
){
	$(document).ready(function() {
		app.init();
	});

});
