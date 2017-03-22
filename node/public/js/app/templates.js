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
			'<li class="collection-item avatar">' +
				'<i class="material-icons circle">perm_identity</i>' +
				'<span class="title"><%= display_name %></span>' +
				'<p>Last seen: 13:31</p>' +
                '<a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>' +
			'</li>',


		chatWithUserItem: '' +
            '<li class="mdl-list__item chat-wrapper chat-group-wrapper <%= senderClass %>" data-contact="1">' +
                '<span class="">' +
                    '<% if (typeof senderDisplayName !== "undefined") { %>' +
                    '<div class="chat-header">' +
                        '<div class="chat-time"><%= chatDisplayTime %></div>' +
                    '</div>' +
                    '<% } %>' +
                    '<span><%= message %></span>' +
                '</span>' +
            '</li>',

		chatWithGroupItem: '' +
			'<li class="mdl-list__item chat-wrapper chat-group-wrapper <%= senderClass %>" data-contact="1">' +
				'<span class="">' +
					'<% if (typeof senderDisplayName !== "undefined") { %>' +
						'<div class="chat-header">' +
							'<div class="chat-sender"><%= senderDisplayName %></div>' +
							'<div class="chat-time"><%= chatDisplayTime %></div>' +
						'</div>' +
					'<% } %>' +
					'<span><%= message %></span>' +
				'</span>' +
			'</li>',

		newMessage: '' +
			'<div class="mdl-textfield mdl-js-textfield mdl-cell mdl-cell--12-col">' +
				'<input class="mdl-textfield__input" type="text" id="chat-input" name="chat"/>' +
			'</div>'


};

	that.template = {};

	_.each( _.keys( templatesSource ), function(key) {
		that.template[key] = _.template(templatesSource[key])
	});

	return that;
});