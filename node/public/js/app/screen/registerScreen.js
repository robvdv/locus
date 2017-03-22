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
            window.location.hash = 'contacts';
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

	that.name = 'register';
	baseScreen.registerScreen(that);

	return that;
});