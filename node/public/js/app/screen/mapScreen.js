define([
	'underscore',
	'backbone',
	'app/screen/baseScreen',
	'app/events'
],
function (
	_,
	Backbone,
	baseScreen,
	events
) {

	var MapScreen = Backbone.View.extend({
		el: '#map-wrapper',
		events: {
		}
	});

	var that = new MapScreen();

	that.showNavigation = true;

	that.onShow = function() {
	};

	that.name = 'map';
	baseScreen.registerScreen(that);

	return that;

});