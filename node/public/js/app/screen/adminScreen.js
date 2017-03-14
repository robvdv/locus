define([
	'underscore',
	'backbone',
	'app/screen/baseScreen',
	'app/router',
	'app/db',
	],
function (
	_,
	Backbone,
	baseScreen,
	router,
	db
) {

	var screen = Backbone.View.extend({
		el: '#admin-wrapper',
		events: {
			'click .db-recreate': 'dbRecreate'
		},

		dbRecreate: function(event) {
			event.stopPropagation();
			db.recreate();
			return false;
		}
	});

	var that = new screen();

	// bindEvents
	//events.on('showScreen:main', );

	that.name = 'admin';
	baseScreen.registerScreen(that);

	return that;

});