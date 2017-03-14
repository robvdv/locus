define([
	'underscore',
	'backbone'],
function (
	_,
	Backbone
) {

	var that = {};

	var makeUrl = function(urlOffset) {
		return window.location.protocol + '//' + window.location.host + '/api/' + urlOffset;
	};

	that.post = function(urlOffset, data, successCallback) {
		var request = $.ajax({
			url: makeUrl(urlOffset),
			method: 'POST',
			data: data,
			dataType: 'json'
		});
		request.done(function(data, textStatus, jqXHR) {
			successCallback(data);
		});
		request.fail(function(jqXHR, textStatus, errorThrown) {
			console.log('Error calling: ' + urlOffset + ' : ' + textStatus + ' : ' + errorThrown);
		});
	};

	that.get = function(urlOffset, data, successCallback) {
		var request = $.ajax({
			url: makeUrl(urlOffset),
			method: 'GET',
			data: data,
			dataType: 'json'
		});
		request.done(function(data, textStatus, jqXHR) {
			successCallback(data);
		});
		request.fail(function(jqXHR, textStatus, errorThrown) {
			console.log('Error calling: ' + urlOffset + ' : ' + textStatus + ' : ' + errorThrown);
		});
	};

	return that;
});