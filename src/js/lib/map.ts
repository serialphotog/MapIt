import {handleResize} from './ui';

// Stores the map instance
var map;


// Initializes the map view
export function initMap() {
	handleResize();	

	// Map layers
	var calTopoAttrib = 'Map data &copy; <a href="http://caltopo.com/">CalTopo</a> andUSGS';
	var calTopoUrl = 'http://s3-us-west-1.amazonaws.com/caltopo/topo/{z}/{x}/{y}.png?v=1';
	var calTopo = L.tileLayer(calTopoUrl, {id: 'caltopo', maxZoom: 16, attribution: calTopoAttrib});
	var mapBoxAttrib = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
	var mapboxUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic2VyaWFscGhvdG9nIiwiYSI6ImNqOW9sZDB4NzFmd20zM250cWl6cW9ldjkifQ.myAhLDT054QvyET45sIS4Q';
	var satellite = L.tileLayer(mapboxUrl, {id: 'mapbox.satellite', attribution: mapBoxAttrib});
	var openTopoAttrib = 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, ' + 
		'<a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; ' + 
		'<a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)';
	var openTopoUrl = 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
	var openTopo = L.tileLayer(openTopoUrl, {maxZoom: 17, attribution: openTopoAttrib});
	var arcGisTopoAttrib = '&copy; arcGIS <a href="http://links.esri.com/e800-summary" target="_blank"><b>(Topo Maps Terms of Use)</b></a>';
	var arcGisTopoUrl = 'http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}';
	var arcGisTopo = L.tileLayer(arcGisTopoUrl, {maxZoom: 19, attribution: arcGisTopoAttrib});
	var usTopoUrl = 'http://services.arcgisonline.com/ArcGIS/rest/services/USA_Topo_Maps/MapServer/tile/{z}/{y}/{x}';
	var usTopo = L.tileLayer(usTopoUrl, {maxZoom: 15, attribution: arcGisTopoAttrib});
	var natGeoUrl = 'http://services.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}';
	var natGeo = L.tileLayer(natGeoUrl, {maxZoom: 16, attribution: arcGisTopoAttrib});
	var streets = L.tileLayer(mapboxUrl, {id: 'mapbox.streets', maxZoom: 19, attribution: mapBoxAttrib});
	var lidarAttrib = 'Kentucky Division of Geographic Information (DGI)';
	var lidar = L.tileLayer.wms('https://kyraster.ky.gov/arcgis/services/ElevationServices/Ky_DEM_KYAPED_5FT_ShadedRelief_WGS84WM/ImageServer/WMSServer', {
		layers: '0',
		attribution: lidarAttrib
	});
	var lidarMulti = L.tileLayer.wms('https://kyraster.ky.gov/arcgis/services/ElevationServices/Ky_DEM_KYAPED_5FT_MultiDirectionalHillshade/ImageServer/WMSServer', {
		layers: '0',
		attribution: lidarAttrib
	});

	var baseLayers = {
		"CalTopo": calTopo,
		"Satellite": satellite,
		"OpenTopo": openTopo,
		"ArcGis Topo": arcGisTopo,
		"U.S. Topo": usTopo,
		"National Geo": natGeo,
		"Streets": streets,
		"Lidar": lidar,
		"Lidar (MultiDirectional)": lidarMulti
	};

	// Build the map
	map = L.map('map-view', {
		center: [37.37, -84.22],
		zoom: 10,
		layers: [arcGisTopo]
	});
	var layersControl = L.control.layers(baseLayers).addTo(map);
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