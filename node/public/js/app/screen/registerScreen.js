define([
	'underscore',
	'backbone',
	'app/screen/baseScreen',
	'app/account'],
function (
	_,
	Backbone,
	baseScreen,
	account
) {

	var registerScreen = Backbone.View.extend({
		el: '#register-wrapper',
		events: {
			'click button.register': 'register'
		},

		register: function(event) {
			event.stopPropagation();
			account.userRegister(this.serialize());
			return false;
		},

		serialize : function() {
			return {
				mac_address: this.$("#textfield_new_mac_address").val(),
				display_name: this.$("#textfield_new_name").val()
			};
		}

	});

	var that = new registerScreen();

	that.onShow = function() {
		if (account.isUserLoggedIn()) {
			window.location.hash = 'contacts';
		} else {
			window.location.hash = 'register';
		}
	};

	that.name = 'register';
	baseScreen.registerScreen(that);

	return that;
});