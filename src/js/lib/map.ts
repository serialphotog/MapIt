import {handleResize} from './ui';
import * as Layers from './layers';

// Stores the map instance
var map;


// Initializes the map view
export function initMap() {
	handleResize();	

	// Build the map
	map = L.map('map-view', {
		center: [37.37, -84.22],
		zoom: 10,
		layers: [Layers.arcGisTopo]
	});
	var layersControl = L.control.layers(Layers.baseLayers).addTo(map);
	L.control.scale().addTo(map);
	document.getElementById('map-view').style.cursor = 'crosshair';

	// Map Actions
	map.on("moveend", updateStatus);
	map.on("mousemove", (e) => { handleMouseMove(e); });

	// Initialize the map status
	updateStatus();
}

// Updates the map center status
function updateStatus() {
	var mapCenter = map.getCenter();
	var lat = mapCenter.lat.toFixed(6);
	var lng = mapCenter.lng.toFixed(6);
	document.getElementById("center-lat").innerHTML = lat;
	document.getElementById("center-lon").innerHTML = lng;
}

// Handles the mouse move event
function handleMouseMove(event) {
	document.getElementById("cursor-lat").innerHTML = event.latlng.lat.toFixed(6);
	document.getElementById("cursor-lon").innerHTML = event.latlng.lng.toFixed(6);
}