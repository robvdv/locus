define([
	'underscore',
	'app/events',
	'app/const',
	'app/templates',
	'app/router',
	'backbone'

],
function (
	_,
	events,
	CONST,
	templates,
	router,
	Backbone
) {

	var that = Backbone.View.extend({

		tagName: "li",

		className: "document-row",

/*		events: {
			"click .title": "gotoChat"
		},*/


		initialize: function() {
			this.listenTo(this.model, "change", this.render);
		},


/*		gotoChat: function() {
			router.navigate(this.model.get('fragment'))
		},*/

		render: function() {
			return templates.template.contactItem(this.model);
		}
	});

	return that;
});



