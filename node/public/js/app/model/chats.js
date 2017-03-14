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
		sync: BackbonePouch.sync({
			db: db.dbLocal,
			fetch: 'query',
			listen: true,
			options: {
				query: {
					include_docs: true,
					fun: {
						map: function(doc, emit) {
							if (doc.type === CONST.data.types.chat) {
								emit(doc.timestamp, null)
							}
						}
					},
					limit: 100
				},
				changes: {
					include_docs: true,
					continuous: true,
					filter: function(doc) {
						return (doc._deleted || doc.type !== CONST.data.types.chat);
					}
				}
			}
		}),
		parse: function(result) {
			return _.pluck(result.rows, 'doc')
		},
		setRecipientId: function(id) {
			this.recipientId = id;
		},
		getRecipientId: function() {
			return this.recipientId;
		},
		comparator: function(chat) {
			return chat.get('timestamp') ? chat.get('timestamp') : 0;
		}

	});

	return that;
});



