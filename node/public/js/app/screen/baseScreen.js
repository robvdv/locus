define([
	'underscore',
	'jquery',
	'backbone',
	'app/router'],
function (
	_,
	$,
	Backbone,
	router

) {
	var that = {};

	that.screens = {};

	that.registerScreen = function(screen) {
		that.screens[screen.name] = screen;
		window.app.screens = window.app.screens ? window.app.screens : {};
		window.app.screens[screen.name] = screen;

		var show = function() {
			that.showScreen(screen, arguments);
		};

		router.route(screen.name + '*', show);
		router.route(screen.name + '/:splat', show);
	};


	that.showScreen = function(screen, args) {
		/*_.each( _.values( that.screens ), function(otherScreen) {
			otherScreen.$el.hide();
		});*/

		if (typeof screen === 'string') {
			screen = that.screens[screen];
		}

        // replace/move to router.execute

/*		$('.screen-wrapper').not(screen.$el).hide();
		$('#menu-wrapper').toggle(screen.showNavigation);
		screen.$el.show();*/
		if (screen.onShow) {
			screen.onShow.apply(this, args);
		}
	};

	that.hideAllScreens = function() {

	};

	return that;
});