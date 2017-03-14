
var generateMessage = function() {
	var words = ['foo', 'bar', 'baz', 'fishpaste', 'yudda', 'ding', 'dong'];
	var msg = [];
	var length = Math.ceil( Math.random() * 5 );
	for (var i = 0; i < length; i++) {
		msg.push( words[Math.floor(words.length * Math.random())]);
	}
	return msg.join(' ');
};

$(document).ready(function() {
	var $el = {};
	$el.beaconWrapper = $('#beacon-wrapper');
	$el.controlWrapper = $('#control-wrapper');
	$el.connect = $el.controlWrapper.find('.connect');
	$el.log = $el.controlWrapper.find('.connect');
	var beacons = [];

	var numberOfBeacons = 4;
	var beaconTemplateHtml = $el.beaconWrapper.html();
	$el.beaconWrapper.html("");

	var targetBeacon;

	var syncBeacons = function(beacon) {
		if (!beacon.$el.find('input.connect').is(':checked')) {
			return;
		}
		if (!targetBeacon) {
			targetBeacon = beacon;
		} else {
			var messages = JSON.parse(sync.syncBeacons(targetBeacon.data.sync, beacon.data )); // should stringify call parms

			if (messages && messages.length > 0) {
				var newMaxMessageTime = -8640000000000000;
				var newMinMessageTime = 8640000000000000;
				_.each( messages, function(message) {
					// need to find js time sorted array structure
					if (message.timestamp > newMaxMessageTime) {
						newMaxMessageTime = message.timestamp;
					}
					if (message.timestamp > newMinMessageTime) {    // FIX
						newMinMessageTime = message.timestamp;
					}
					targetBeacon.data.messages.push(message);
				});
				dumpData(targetBeacon);
			}

			targetBeacon = undefined;
			$el.beaconWrapper.find('input.connect').prop('checked', false);
		}
	};

	var dumpData = function(beacon) {
		beacon.$el.find('.data').html(JSON.stringify(beacon.data, null, '  '));
	};

	var createBeacon = function(loop) {
		var $beacon = $(beaconTemplateHtml);

		var beacon = {
			$el: $beacon,
			data: {
				id: 'beacon_' + loop,
				messages: []
			}
		};

		beacons.push(beacon);

		$beacon.attr('data-index', i);
		$beacon.find('.title').html('Beacon: ' + i);
		$el.beaconWrapper.append($beacon);

		dumpData(beacon);

		$beacon.find('.action .message-button').on('click', function() {
			var messageText = $beacon.find('.action .message-text').val();
			if (!messageText) {
				messageText = generateMessage();
			}
			var message = {
				timestamp: new Date().getTime(),
				message: messageText
			};

			beacon.data.messages.push(message);

			dumpData(beacon);
		});
		$beacon.find('input.connect').on('change', function() {
			syncBeacons(beacon);
		});

	};

	for (var i = 0; i < numberOfBeacons; i++) {
		createBeacon(i);
	}

});

var sync = {

	MAX_MESSAGE_SIZE: 50000, // bytes

	syncBeacons: function(beaconSync, sourceBeacon) {
		var msg = "[";
		var messageFull = false;
		var index;
		if (!sourceBeacon.messages || (sourceBeacon.messages.length == 0)) {
			// no source message? return empty array
		} else {
			var sync = beaconSync ? beaconSync[sourceBeacon.id] : {};
			if (!sync || (!sync.timeMin && !sync.timeMax)) {
			// no times specified? Then just count back down from the most recent
			index = sourceBeacon.messages.length;
			while (!messageFull) {
				msg += JSON.stringify(sourceBeacon.messages[index - 1]);
				index--;
				if ((index === 0) || (msg.length <= sync.MAX_MESSAGE_SIZE)) {
					messageFull = true;
				} else {
					msg += ',';
				}
			}
		}
		}
		msg += "]";
		return msg;
	}

}

var Beacon = function(id) {
	var that = this;

	that.id = id; // id of this beacon
	that.messages = []; // array of all messages for this beacon
	that.minTimestamp = 8640000000000000; // earliest message time initialised to end of epoch
	that.maxTimestamp = -8640000000000000; // latest message time initialised to start of epoch

	that.appendMessage = function(message) {
		that.messages.push(message);
	};

	that.getMinTimestamp = function() {
		if (that.messages.length === 0) {
			return 8640000000000000; // earliest message time initialised to end of epoch
		} else {
			return that.messages[0].timestamp;
		}
	};

	that.getMaxTimestamp = function() {
		if (that.messages.length === 0) {
			return -8640000000000000; // latest message time initialised to start of epoch
		} else {
			return that.messages[ that.messages.length -1 ].timestamp;
		}
	};


	return that;

};