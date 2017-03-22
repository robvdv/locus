define([
	'backbone',
	'app/events',
	'app/router',
	'app/db',
	'app/render',
	'app/account'
],
function (
	Backbone,
	events,
	router,
	db,
	render,
    account
) {

	var that = {};

	that.init = function() {
		window.app = that;
		events.on('user:loggedIn', that.loggedIn);
		if (account.isUserLoggedIn()) {
			events.trigger('user:loggedIn');
		} else {
			that.notLoggedIn();
		}

		if (navigator.vibrate) {
			navigator.vibrate(1000);
		}
	};

	that.startBackboneHistory = function() {
		if (!Backbone.History.started) {
			Backbone.history.start();
		}
	};

	that.notLoggedIn = function() {
		require([
			'app/screen/registerScreen'
		],
			function (
				registerScreen
				) {
				window.location.hash = 'register';
				that.startBackboneHistory();
			}
		);
	};

	that.loggedIn = function() {

		require([
			'app/screen/registerScreen',
			'app/screen/mainScreen',
			'app/screen/adminScreen',
			'app/screen/contactsScreen',
            'app/screen/chatScreen',
            'app/screen/chatsScreen',
            'app/screen/mapScreen'
		],
			function (
				registerScreen,
				mainScreen,
				adminScreen,
				contactsScreen,
                chatScreen,
                chatsScreen,
                mapScreen
				) {

				    that.startBackboneHistory();
			}
		);
	};


	return that;
});