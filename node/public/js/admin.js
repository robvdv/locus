$(document).ready(function() {

	var that = window.admin = {};

	that.init = function() {
		that.bindDomElements();
	};

	that.bindDomElements = function() {
		$('[data-click]').each( function() {
			var $el = $(this);
			var functionName = $el.attr('data-click');
			var parm = $el.attr('data-parm');
			$el.on('click', function(event) {
				event.stopPropagation();
				that[functionName](parm);
				return false;
			});
		});
	};

	that.destroyLocalData = function(parm) {
		localStorage.clear();
		indexedDB.deleteDatabase("_pouch_playa");

		//_pouch_validate_websql

		$('#log').html('Destroyed local DB');
	};

	that.api = function(parm) {
		var jqxhr = $.get( parm, function() {
			console.log('Successfully called api: ' + parm);
		})
			.done(function() {
				that.log(arguments)
			})
			.fail(function() {
				console.log('Failed calling api: ' + parm);
			});
	};

	that.log = function(data) {
		$('#log').html(JSON.stringify( data, null, '\t' ));
	};


	that.init();

});