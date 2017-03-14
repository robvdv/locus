define([
	'underscore',
	'app/events',
	'app/const',
	'app/db',
	'BackbonePouch'

],
function (
	_,
	events,
	CONST,
	db,
	BackbonePouch
	) {

		var that = Backbone.Model.extend({
		defaults: {
			type: 'replication'
		}
	});

	return that;
});
