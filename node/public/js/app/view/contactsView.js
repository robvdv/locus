define([
	'jquery',
	'underscore',
	'app/events',
	'app/const',
	'app/templates',
	'app/view/contactView',
	'backbone'

],
function (
	$,
	_,
	events,
	CONST,
	templates,
	ContactView,
	Backbone
) {

	var that = Backbone.View.extend({

		initialize: function() {
			this.listenTo(this.collection, "reset change", this.render);
			this.collection.bind("reset change", this.render, this);
		},

		render: function() {
			var renderedContent = '';
			this.collection.each( function(contact) {
				var contactView = new ContactView({
					model: contact.toJSON()
				});
				renderedContent += contactView.render()
			});
			$(this.el).html(renderedContent);
		}
	});

	return that;
});



