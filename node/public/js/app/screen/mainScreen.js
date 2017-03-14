define([
	'underscore',
	'backbone',
	'app/screen/baseScreen',
	'app/router'],
function (
	_,
	Backbone,
	baseScreen,
	router
) {

	var mainScreen = Backbone.View.extend({
		el: '#main-wrapper',
		events: {
			'click .search-contact': 'searchContacts'
		},

		searchContacts: function(event) {
			event.stopPropagation();
			router.navigate('contacts', {trigger: true, replace: true});
			return false;
		}
	});

	var that = new mainScreen();

	// bindEvents
	//events.on('showScreen:main', );

	that.name = 'main';
	baseScreen.registerScreen(that);

	return that;

});