define([
	'underscore',
	'app/events',
	'app/const',
    'app/util',
	'app/templates',
    'app/account',
	'backbone'

],
function (
	_,
	events,
	CONST,
    util,
	templates,
    account,
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
            if (this.model.senderId === account.getUserId()) {
                this.model.senderClass = "sender-user";
            } else {
                this.model.senderClass = "sender-other";
            }
            if (this.model.timestamp) {
                var time = new Date(this.model.timestamp);
                this.model.chatDisplayTime = util.format.shortTime(this.model.timestamp);
            } else {
                this.model.chatDisplayTime = '';
            }
			if (this.isGroupChat) {
				return templates.template.chatWithGroupItem(this.model);
			} else {
				return templates.template.chatWithUserItem(this.model);
			}

		}
	});


	return that;
});



