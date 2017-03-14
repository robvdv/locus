define([
	'underscore',
	'app/events',
	'app/const',
	'app/templates',
	'backbone'

],
function (
	_,
	events,
	CONST,
	templates,
	Backbone
) {

	var that = Backbone.View.extend({

		tagName: "li",

		className: "document-row",

/*		events: {
			"click .icon":          "open",
			"click .button.edit":   "openEditDialog",
			"click .button.delete": "destroy"
		},*/

		initialize: function() {
			this.listenTo(this.model, "change", this.render);
		},

		render: function() {
			return templates.template.contactItem(this.model);
		}
	});

	return that;
});



