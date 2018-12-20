/**
 * Javascript to handle open street map for property single page.
 */
jQuery( function( $ ) {
	'use strict';

	if( typeof contactMapData !== "undefined" ) {

		if( contactMapData.lat && contactMapData.lng ) {

			var officeLocation = new google.maps.LatLng( contactMapData.lat, contactMapData.lng );

			var mapZoom = 14;
			if( contactMapData.zoom ) {
				mapZoom = parseInt( contactMapData.zoom );
			}

			var contactMapOptions = {
				center : officeLocation,
				zoom : mapZoom,
				mapTypeId : google.maps.MapTypeId.ROADMAP,
				scrollwheel : false,
				styles: [{
					"featureType": "administrative",
					"elementType": "labels.text",
					"stylers": [{
						"color": "#000000"
					}]
				}, {
					"featureType": "administrative",
					"elementType": "labels.text.fill",
					"stylers": [{
						"color": "#444444"
					}]
				}, {
					"featureType": "administrative",
					"elementType": "labels.text.stroke",
					"stylers": [{
						"visibility": "off"
					}]
				}, {
					"featureType": "administrative",
					"elementType": "labels.icon",
					"stylers": [{
						"visibility": "on"
					}, {
						"color": "#380d0d"
					}]
				}, {
					"featureType": "landscape", "elementType": "all", "stylers": [{
						"color": "#f2f2f2"
					}]
				}, {
					"featureType": "poi", "elementType": "all", "stylers": [{
						"visibility": "off"
					}]
				}, {
					"featureType": "road", "elementType": "all", "stylers": [{
						"saturation": -100
					}, {
						"lightness": 45
					}]
				}, {
					"featureType": "road", "elementType": "geometry", "stylers": [{
						"visibility": "on"
					}, {
						"color": "#dedddb"
					}]
				}, {
					"featureType": "road", "elementType": "labels.text", "stylers": [{
						"color": "#000000"
					}]
				}, {
					"featureType": "road", "elementType": "labels.text.fill", "stylers": [{
						"color": "#1f1b1b"
					}]
				}, {
					"featureType": "road", "elementType": "labels.text.stroke", "stylers": [{
						"visibility": "off"
					}]
				}, {
					"featureType": "road", "elementType": "labels.icon", "stylers": [{
						"visibility": "on"
					}, {
						"hue": "#ff0000"
					}]
				}, {
					"featureType": "road.highway", "elementType": "all", "stylers": [{
						"visibility": "simplified"
					}]
				}, {
					"featureType": "road.arterial",
					"elementType": "labels.icon",
					"stylers": [{
						"visibility": "off"
					}]
				}, {
					"featureType": "transit", "elementType": "all", "stylers": [{
						"visibility": "off"
					}]
				}, {
					"featureType": "water", "elementType": "all", "stylers": [{
						"color": "#c1c9cc"
					}, {
						"visibility": "on"
					}]
				}]
			};

			var contactMap = new google.maps.Map( document.getElementById( "map_canvas" ), contactMapOptions );

			var iconURL = "";
			if( contactMapData.iconURL ) {
				iconURL = contactMapData.iconURL;
			}

			var contactMarker = new google.maps.Marker( {
				position : officeLocation,
				map : contactMap,
				icon : iconURL
			} );

		}

	}

} );