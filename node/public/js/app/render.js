define([
	'jquery',
	'underscore',
	'app/events',
	'app/templates'
],
function (
	$,
    _,
    events,
	templates
) {

	var that = {};

	that.$el = {
		chat: {
			wrapper: $('#chat-wrapper')
		},
		contacts: {
			wrapper: $('#contacts-wrapper'),
			list: $('#contacts-wrapper .contacts-list')
		}
	};

	that.init = function() {
		that.bindEvents();
	};

	that.bindEvents = function() {
		events.on('contacts:loaded', that.renderContacts);
		events.on('showPage:searchContacts', that.show.SearchContacts);
		events.on('showPage:register', that.show.SearchContacts);
		events.on('route:help', that.show );
	};

	that.show = function(event) {
		console.log("event");
	};

	that.renderFull = function(data) {
		console.log('test')
	};

	that.clearAll = function() {
		that.$el.chat.wrapper.html("");
	};

	that.render = function(objs) {
		that.clearAll();
		objs = _.isArray(objs) ? objs : [objs];
		_.each(objs, function(obj) {
			if (obj.type === 'message') {
				that.$el.chat.wrapper.append('<div>' + obj.message + '</div>')
			}
		})
	};

	that.refreshCurrentPage = function() {

	};

	that.renderContacts = function(contacts) {
		var html = "";
		_.each(contacts, function(contact) {
			try {
				html += templates.template.contactItem(contact);
			} catch(e) {
				console.log('Could not render contact: ' + JSON.stringify(contact))
			}
		});
		that.$el.contacts.list.html(html);
	};

	that.init();

	return that;
});