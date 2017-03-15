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
		idAttribute: '_id',
		sync: BackbonePouch.sync({
			db: db.dbLocal
		})
/*

		var test = function() {
			return (doc._id === '_design/app') || (doc.owner === req.query.owner) || (doc.owner === 'public') ||
				((doc.chatId) &&
				((typeof doc.chatId === 'string') && (doc.chatId === req.query.owner) ||
				(doc.chatId.indexOf(req.query.owner) > -1)));
			}
*/

	});
	
	
	

	return that;
});



