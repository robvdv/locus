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

		setGroupChat: function(isGroup) {
			this.isGroupChat = isGroup;
		},


		render: function() {
			if (this.isGroupChat) {
				return templates.template.chatWithGroupItem(this.model);
			} else {
				return templates.template.chatWithUserItem(this.model);
			}

		}
	});


	return that;
});



