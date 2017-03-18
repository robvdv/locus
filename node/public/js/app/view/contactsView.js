define([
	'jquery',
	'underscore',
	'app/events',
	'app/const',
	'app/templates',
	'app/screen/baseScreen',
	'app/view/contactView',
	'backbone'

],
function (
	$,
	_,
	events,
	CONST,
	templates,
	baseScreen,
	ContactView,
	Backbone
) {

	var view = Backbone.View.extend({



		initialize: function() {
			this.listenTo(this.collection, "reset change", this.render);
			this.collection.bind("reset change", this.render, this);
		},

		render: function() {
			var that = this;
			var renderedContent = '';
			var contactViews = [];

			this.collection.each( function(contact) {
				var contactView = new ContactView({
					model: contact.toJSON()
				});
				contactViews.push(contactView);
			});

			$(this.el).empty();


			// Render each sub-view and append it to the parent view's element.
			_(contactViews).each(function(contactView) {
				$(that.el).append(contactView.render());
				// crap
				$(that.el).find( ":last-child").on('click', function() {
					if (contactView.model.subkey) {
						window.location.hash = '#chat?group=' + contactView.model.subkey;
					} else {
						window.location.hash = '#chat?user=' + contactView.model._id;
					}
				});
			});
		}
	});


	return view;
});



