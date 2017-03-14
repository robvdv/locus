var beacon = {
	'88:1f:a1:0f:83:ca': {  //uuid of beacon based on mac
		location: {
			latitude: -33.1234, // physical lat
			longitude: 16.3334, // physical long
			orientation: 0      // compass heading corresponding to 0 on stepper/antenna orientation
		},
		connected: {
			'89:1f:a5:0f:83:b2': {
				connection: {
					start: 123212432453,
					end: null
				},
				location: {
					latitudeGPS: -33.2234,   // only if transmitted by client using GPS or fixed for beacon
					longitudeGPS: 16.4334,
					latitudeCalc: -33.2244,
					longitudeCalc: 16.4337,
					orientation: 37  // orientation of beacon at moment of client acquisition
				},
				state: {
					syncUpload: true,    // has the user successfully uploaded all messages and location
					syncDownload: false  // have we transmitted all messages down to the client
				}
			}
		}
	}
};

// synchronisation POST request body
var sync = {
	'88:1f:a1:0f:83:ca': {
		firstMessageTime: 123212432453, // earliest date of any message
		lastMessageTime: 123212432453   // latest/most recent date of any message
	}
}



