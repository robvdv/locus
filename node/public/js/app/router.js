define([
	'backbone',
	'app/events',
	'app/account'],
function (
	Backbone,
	events,
	account
) {

	var Router = Backbone.Router.extend({

		routes: {
			"help": "help",
			"dbRecreate": "dbRecreate"
		},

		help: function() {
			events.trigger('route:help');
		},

		// careful!
		dbRecreate: function() {
			setTimeout(function() {
				events.trigger('db:recreate');
			}, 200);
		},

		execute: function(callback, args, name) {
			if (!account.isUserLoggedIn()) {
				router.navigate('register', {trigger: false});
			}
			if (callback) {
				callback.apply(this, args);
			}
		}

	});

	var router = new Router();

	events.on('user:registered', function() {
		router.navigate('main', {trigger: true, replace: true});
	});

	events.on('user:registered', function() {
		router.navigate('main', {trigger: true, replace: true});
	});

	return router;
});