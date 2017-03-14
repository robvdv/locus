define([
	'underscore',
	'backbone',
	'app/screen/baseScreen',
	'app/events',
	'app/model/contacts',
	'app/view/contactView',
	'app/view/contactsView'
],
function (
	_,
	Backbone,
	baseScreen,
	events,
	Contacts,
	ContactView,
	ContactsView
) {

	var ContactsScreen = Backbone.View.extend({
		el: '#contacts-wrapper',
		events: {
		}
	});

	var that = new ContactsScreen();

	that.contacts = new Contacts();
	that.contactsView = new ContactsView({
		el: '.contacts-list',
		collection: that.contacts
	});

	//events.on('contacts:loaded', that.renderContacts);

	that.fetchContacts = function() {
		that.contacts.fetch({
			reset: true
		});
	};

	that.onShow = function() {
		console.log("onShow reg");
		that.fetchContacts();
		events.on('contact:change', that.fetchContacts);
	};

	that.displayContacts = function(contacts) {

	};

	that.name = 'contacts';
	baseScreen.registerScreen(that);

	return that;


});