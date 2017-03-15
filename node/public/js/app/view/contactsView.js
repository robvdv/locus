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
				var contactData = {
					model: contact.toJSON()
				}
				// is this a group
				if (contact.get('subkey')) {
					contactData.model.fragment = 'group=' + contact.get('subkey');
				} else {
					contactData.model.fragment = 'user=' + contact.id;
				}
				var contactView = new ContactView(contactData);
				renderedContent += contactView.render()
			});
			$(this.el).html(renderedContent);
		}
	});

	return that;
});



