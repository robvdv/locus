define([
	'underscore',
	'app/events',
	'app/const',
	'app/api'
],
function (
	_,
	events,
	CONST,
	api
) {


	var that = {};

	var storageKey = {
		userDetails: 'userDetails'
	};

	var getFromLocalStorage = function(key) {
		var stringValue = window.localStorage.getItem(key);
		if (!_.isUndefined(stringValue)) {
			try {
				var objValue = JSON.parse(stringValue);
				return objValue;
			} catch (e) {
				console.log('Could not parse key: ' + key + ' with value: ' + stringValue);
			}
		}
		return null;
	};

	var setToLocalStorage = function(key, obj) {
		var stringValue;
		if (_.isObject(obj)) {
			stringValue = JSON.stringify(obj);
		} else if (_.isString(obj)) {
			stringValue = obj;
		} else if (!_.isUndefined(obj)) {
			stringValue = '' + obj;
		} else {
			console.log('Cannot set unknown type to local storage: ' + obj);
			return;
		}

		try {
			window.localStorage.setItem(key, stringValue);
		} catch (e) {
			console.log('Could not set local storage key: ' + key + ' with value: ' + stringValue);
		}
	};

	var deleteFromLocalStorage = function(key) {
		try {
			window.localStorage.removeItem(key);
		} catch (e) {
			console.log('Could not remove storage key: ' + key);
		}
	};

	that.userDetails = getFromLocalStorage(storageKey.userDetails);

	that.isUserLoggedIn = function() {
		return !!that.userDetails;
	};

	that.getUserId = function() {
		return that.isUserLoggedIn() ? that.userDetails.id : null;
	};

	that.getUserName = function() {
		return that.isUserLoggedIn() ? that.userDetails.display_name : null;
	};

	that.getSubscriptionKeys = function() {
		return that.isUserLoggedIn() ? that.userDetails.subkeys : null;
	};

	that.userLogIn = function(credentials) {
	};

	that.userRegister = function(user) {
		api.post('user/register', user, that.userRegisterCallback);
	};

	that.userRegisterCallback = function(data) {
		setToLocalStorage(storageKey.userDetails, data.data);
		that.userDetails = data.data;
		events.trigger('user:registered', data);
		events.trigger('user:loggedIn', data);
	};


	return that;
});



