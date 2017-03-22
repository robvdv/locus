define([
	'underscore',
    'moment'
],
function (
	_,
    moment
) {

	var that = {

        format: {
            shortTime: function(ms) {
                return moment(ms).format('h:mm a');
            }
        }

	};

	return that;
});