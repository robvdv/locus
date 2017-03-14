define([
	'jquery',
	'underscore',
	'app/events',
	'app/const',
	'app/templates',
	'app/view/chatView',
	'backbone'

],
function (
	$,
	_,
	events,
	CONST,
	templates,
	ChatView,
	Backbone
) {

	var that = Backbone.View.extend({

		initialize: function() {
			this.listenTo(this.collection, "reset change", this.render);
			this.collection.bind("reset change", this.render, this);
		},

		render: function() {
			var renderedContent = '';
			this.collection.each( function(chat) {
				var chatView = new ChatView({
					model: chat.toJSON()
				});
				renderedContent += chatView.render()
			});
			$(this.el).html(renderedContent);
		}
	});

	return that;
});



