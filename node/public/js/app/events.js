define([
	'underscore',
	'backbone'],
function (
	_,
	Backbone
) {

	var that = {};

	_.extend(that, Backbone.Events);

	return that;
});