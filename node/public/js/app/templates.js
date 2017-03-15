define([
	'jquery',
	'underscore'],
function (
	$,
	_
){

	var that = {};

	var templatesSource = {
		contactItem: '' +
			'<li class="mdl-list__item mdl-list__item--two-line" data-contact="1">' +
				'<span class="mdl-list__item-primary-content">' +
					'<i class="material-icons mdl-list__item-avatar">person</i>' +
					'<span><%= display_name %></span>' +
					'<span class="mdl-list__item-sub-title">3 chats</span>' +
				'</span>' +
				'<span class="mdl-list__item-secondary-content find-on-map">' +
					'<span class="mdl-list__item-secondary-info">Chat</span>' +
					'<a class="mdl-list__item-secondary-action" href="#chat?<%= fragment %>"><i class="material-icons">chat</i></a>' +
				'</span>' +
			'</li>',

		chatItem: '' +
			'<li class="mdl-list__item mdl-list__item--two-line" data-contact="1">' +
				'<span class="mdl-list__item-primary-content">' +
					'<span><%= message %></span>' +
					'<span><% if (typeof time !== "undefined") { %><%= time %><% } %></span>' +
					'<div><% if (typeof senderDisplayName !== "undefined") { %><%= senderDisplayName %><% } %></div>' +
				'</span>' +
			'</li>',

		chatGroupItem: '' +
			'<li class="mdl-list__item mdl-list__item--two-line" data-contact="1">' +
				'<span class="mdl-list__item-primary-content">' +
					'<i class="material-icons mdl-list__item-avatar">person</i>' +
					'<span><%= display_name %></span>' +
					'<span class="mdl-list__item-sub-title">3 chats</span>' +
				'</span>' +
				'<span class="mdl-list__item-secondary-content find-on-map">' +
					'<span class="mdl-list__item-secondary-info">Find</span>' +
					'<a class="mdl-list__item-secondary-action" href="#"><i class="material-icons">add</i></a>' +
				'</span>' +
			'</li>',

		newMessage: '' +
			'<div class="mdl-textfield mdl-js-textfield mdl-cell mdl-cell--12-col">' +
				'<input class="mdl-textfield__input" type="text" id="textfield_new_chat" name="chat"/>' +
			'</div>'


};

	that.template = {};

	_.each( _.keys( templatesSource ), function(key) {
		that.template[key] = _.template(templatesSource[key])
	});

	return that;
});