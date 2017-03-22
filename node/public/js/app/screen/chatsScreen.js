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
		el: '#chats-wrapper',
		events: {
		}
	});

	var that = new MapScreen();

    // can remove?
	that.showNavigation = true;

	that.onShow = function() {
	};

	that.name = 'chats';
	baseScreen.registerScreen(that);

	return that;

});