define([
	'underscore',
	'app/events',
	'app/const',
	'app/api',
	'app/db',
	'app/model/contact',
	'backbone'

],
function (
	_,
	events,
	CONST,
	api,
	db,
	Contact,
	Backbone
) {

	var that = Backbone.Collection.extend({
		model: Contact,

		fetch: function() {
			var that = this;
			db.getContacts(function(data) {
				that.reset(data);
			});
		},

		parse: function(result) {
			return result;
		}
	});

	return that;
});



