$(document).ready(function() {

	/*    var mymap = L.map('mapid').setView([-34.099, 18.374], 13);
	 L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	 attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
	 maxZoom: 18,
	 id: 'robvdv.2o4mkpk4',
	 accessToken: 'pk.eyJ1Ijoicm9idmR2IiwiYSI6ImNpeWNqeDZ3NTAwODYyd29lODBodGt6OG0ifQ.ZcFu8w2bbrXRhJWMb57rPQ'
	 }).addTo(mymap);*/

	var $map = $('#mapid');

	/*     var boundaryNorth = -32.324486;
	 var boundarySouth = -32.333983;
	 var boundaryWest = 19.739591;
	 var boundaryEast = 19.754450;
	 var centerLatitude = ((boundaryWest - boundaryEast) / 2) + boundaryEast;
	 var centerLongitude = ((boundaryNorth - boundarySouth) / 2) + boundarySouth;*/

	var boundaryNorth = 866;
	var boundarySouth = 0;
	var boundaryWest = 0;
	var boundaryEast = 780;
	var centerLatitude =  (boundaryNorth + boundarySouth) / 2;
	var centerLongitude = (boundaryWest + boundaryEast) / 2;
	var center = L.latLng(centerLatitude, centerLongitude);
	var southWest = L.latLng(boundarySouth, boundaryWest);
	var northEast = L.latLng(boundaryNorth, boundaryEast);
	var mapBounds = L.latLngBounds(southWest, northEast);

	var map = window.map = L.map('mapid', {
		maxZoom: 10,
		minZoom: -1,
		//center: [centerLatitude, centerLongitude],
		//zoom: 1,
		crs: L.CRS.Simple
	});

	// top right: -32.324486, 19.754450           -32.333853, 19.739826
	// bottom left: -32.333983, 19.739591         -32.333853, 19.739826

	var imageUrl = 'images/afrikaburn-map.png'
	//var imageBounds = [[boundaryNorth * 2, boundaryWest * 2], [boundarySouth * 2, boundaryEast * 2]];
	var imageBounds = [[boundarySouth, boundaryWest], [boundaryNorth, boundaryEast]];

	L.imageOverlay(imageUrl, imageBounds).addTo(map);

	//map.fitWorld({padding: [50, 50]});
	map.fitWorld();
	map.setView(center);
	//map.setZoom(1);

	var yx = L.latLng;

	var xy = function(x, y) {
		if (L.Util.isArray(x)) {    // When doing xy([x, y]);
			return yx(x[1], x[0]);
		}
		return yx(y, x);  // When doing xy(x, y);
	};



	/*
	 var centerPoint = map.getSize().divideBy(2),
	 targetPoint = centerPoint.subtract([$map.width(), 0]),
	 targetLatLng = map.containerPointToLatLng(centerPoint);

	 map.panTo(targetLatLng);
	 */

	//var marker = L.marker([-32.33, 19.745]).addTo(map);

	window.markers = [];

	$('.find-on-map').click( function(event) {

		for(i=0;i<window.markers.length;i++) {
			map.removeLayer(window.markers[i]);
		}

		var $contactWrapper = $(event.currentTarget).closest('[data-contact]');
		var contactId = parseInt( $contactWrapper.attr("data-contact") );

		window.markers.push(
			L.marker([100,200])
				.bindLabel('A sweet static label!')
				.addTo(map)
		);
		window.markers.push(
			L.marker([150 * contactId,250 * contactId])
				.bindLabel('A sweet static label!')
				.addTo(map)
		);

		$('#map-tab-link').click();

		var group = new L.featureGroup(window.markers);
		map.fitBounds(group.getBounds());


	})
});