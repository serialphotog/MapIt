const Map = require('./lib/map');

window.addEventListener("load", function setupMap(event) {
	// Only run this listener once
	window.removeEventListener(event.type, setupMap, false);

	Map.initMap();
}, false);