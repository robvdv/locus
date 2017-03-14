define([
	'underscore',
	'app/events',
	'app/const',
	'app/api',
	'app/db',
	'app/model/contact',
	'BackbonePouch',
	'backbone'

],
function (
	_,
	events,
	CONST,
	api,
	db,
	contact,
	BackbonePouch,
	Backbone
) {

	var test = function() {
		console.log("ping!");
		events.trigger('contact:change');
		return true;
	}

	var that = Backbone.Collection.extend({
		model: contact,
		sync: BackbonePouch.sync({
			db: db.dbLocal,
			fetch: 'query',
			listen: true,
			options: {
				query: {
					include_docs: true,
					fun: {
						map: function(doc, emit) {
							if (doc.type === CONST.data.types.contact) {
								emit(doc.position, null)
							}
						}
					},
					limit: 100
				},
				changes: {
					include_docs: true,
					continuous: true,
					filter: function(doc) {
						return (doc._deleted || doc.type !== CONST.data.types.contact);
					}
				}
			}
		}),
		parse: function(result) {
			return _.pluck(result.rows, 'doc')
		}
	});


	/*var that = Backbone.Collection.extend({
		model: contact,
		pouch: {
			db: db.dbLocal,
			options: {
				query: {
					include_docs: true,
					fun: {
						map: function(doc, emit) {
							if (doc.type === CONST.data.types.contact) {
								emit(doc.position, null)
							}
						}
					},
					limit: 100
				},
				changes: {
					include_docs: true,
					continuous: true,
					filter: function(doc) {
						return doc._deleted || doc.type !== CONST.data.types.contact;
						//return true;
					}
				}
			}
		},
		parse: function(result) {
			return _.pluck(result.rows, 'doc')
		}
	});*/

	return that;
});



