window.onresie = handleResize;

// Sets the map crosshair 
function setCrossHair(mapDiv : string, xhairDiv: string) {
	var mapElement = document.getElementById(mapDiv);
	var crossHairElement = document.getElementById(xhairDiv);
	var x = mapElement.offsetLeft + Math.round(mapElement.offsetWidth / 2) - 8;
	var y = mapElement.offsetTop + Math.round(mapElement.offsetHeight / 2) - 8;
	crossHairElement.style.left = x + "px";
	crossHairElement.style.top = y + "px";
}

// Handles the resize of the UI
export function handleResize() {
	var toolbarHeight = document.getElementById('toolbar').clientHeight;
	var statusHeight = document.getElementById('map-status').clientHeight;
	var viewportHeight = window.innerHeight;
	document.getElementById('map-view').style.height = viewportHeight - statusHeight - toolbarHeight + "px";

	// Set the cross hair position
	setCrossHair("map-view", "crosshair");
}