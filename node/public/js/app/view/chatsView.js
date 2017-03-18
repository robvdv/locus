define([
	'jquery',
	'underscore',
	'app/events',
	'app/const',
	'app/templates',
	'app/account',
	'app/view/chatView',
	'backbone'

],
function (
	$,
	_,
	events,
	CONST,
	templates,
	account,
	ChatView,
	Backbone
) {

	var that = Backbone.View.extend({

		initialize: function() {
			this.listenTo(this.collection, "reset change", this.render);
			this.collection.bind("reset change", this.render, this);
		},

		setGroupChat: function(isGroup) {
			this.isGroupChat = isGroup;
		},

		render: function() {
			var renderedContent = '';
			var isGroupChat = this.isGroupChat;
			this.collection.each( function(chat) {
				var model = chat.toJSON();
				if (model.timestamp) {
					var time = new Date(model.timestamp);
					model.chatDisplayTime = time.getHours() + ':' + time.getMinutes();
				} else {
					model.chatDisplayTime = '';
				}

				if (chat.get("senderId") === account.getUserId()) {
					model.senderClass = "sender-user";
				} else {
					model.senderClass = "sender-other";
				}


				var chatView = new ChatView({
					model: model
				});
				chatView.setGroupChat(isGroupChat);
				renderedContent += chatView.render()
			});
			$(this.el).html(renderedContent);
		}
	});


	return that;
});



