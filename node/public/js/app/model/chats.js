define([
	'underscore',
	'app/events',
	'app/const',
	'app/api',
	'app/db',
	'app/model/chat',
	'BackbonePouch',
	'backbone'

],
function (
	_,
	events,
	CONST,
	api,
	db,
	Chat,
	BackbonePouch,
	Backbone
) {

	var that = Backbone.Collection.extend({
		model: Chat,

		initialize: function() {
			var that = this;
			events.on('chat:change', function(data) {
				that.add(data.add);
				if (navigator.vibrate) {
					navigator.vibrate(1000);
				}
			});
		},

		fetch: function() {
			var that = this;
			if (this.userId) {
				db.getChatsUser(this.userId, function(data) {
					that.reset(data);
				});
			} else if (this.groupId) {
				db.getChatsGroup(this.groupId, function(data) {
					that.reset(data);
				});
			}
		},

		parse: function(result) {
			return result;
		},
		setUserId: function(id) {
			this.userId = id;
		},
		getUserId: function() {
			return this.userId;
		},
		setGroupId: function(id) {
			this.groupId = id;
		},
		getGroupId: function() {
			return this.groupId;
		},
		comparator: function(chat) {
			return chat.get('timestamp') ? chat.get('timestamp') : 0;
		}
	});

	return that;

});



