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
            '*notFound': 'notFound'
		},

        notFound: function() {
            if (account.isUserLoggedIn()) {
                window.location.hash = 'contacts';
            } else {
                window.location.hash = 'register';
            }
        },

        help: function() {
            events.trigger('route:help');
        },

        execute: function(callback, args, name) {
			if (!account.isUserLoggedIn()) {
				router.navigate('register', {trigger: false});
			}

            var screen = Backbone.history.getFragment().split('?')[0];

            $('body').removeClass (function (index, className) {
                return (className.match (/(^|\s)toggle-screen-\S+/g) || []).join(' ');
            }).addClass('toggle-screen-' + screen);

			if (callback) {
				callback.apply(this, args);
			}

		}

	});

	var router = new Router();


    var Router = Backbone.Router.extend({
        execute: function(callback, args) {
            args.push(parseQueryString(args.pop()));
            if (callback) callback.apply(this, args);
        }
    });
/*
	events.on('user:registered', function() {
		router.navigate('main', {trigger: true, replace: true});
	});

	events.on('user:registered', function() {
		router.navigate('main', {trigger: true, replace: true});
	});*/

	return router;
});