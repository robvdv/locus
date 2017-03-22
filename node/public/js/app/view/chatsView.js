define([
	'jquery',
	'underscore',
    'app/util',
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
    util,
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

        scrollToEndOfMessages: function() {
            $('main').scrollTop(this.$el.height());
        },

		render: function() {
			var renderedContent = '';
			var isGroupChat = this.isGroupChat;
			this.collection.each( function(chat) {
				var model = chat.toJSON();




				var chatView = new ChatView({
					model: model
				});
				chatView.setGroupChat(isGroupChat);
				renderedContent += chatView.render()
			});
			$(this.el).html(renderedContent);
            this.scrollToEndOfMessages();
		}
	});


	return that;
});



