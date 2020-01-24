// Map layers
export var calTopoAttrib = 'Map data &copy; <a href="http://caltopo.com/">CalTopo</a> andUSGS';
export var calTopoUrl = 'http://s3-us-west-1.amazonaws.com/caltopo/topo/{z}/{x}/{y}.png?v=1';
export var calTopo = L.tileLayer(calTopoUrl, {id: 'caltopo', maxZoom: 16, attribution: calTopoAttrib});
export var mapBoxAttrib = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
		'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
		'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
export var mapboxUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic2VyaWFscGhvdG9nIiwiYSI6ImNqOW9sZDB4NzFmd20zM250cWl6cW9ldjkifQ.myAhLDT054QvyET45sIS4Q';
export var satellite = L.tileLayer(mapboxUrl, {id: 'mapbox.satellite', attribution: mapBoxAttrib});
export var openTopoAttrib = 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, ' + 
	'<a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; ' + 
	'<a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)';
export var openTopoUrl = 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
export var openTopo = L.tileLayer(openTopoUrl, {maxZoom: 17, attribution: openTopoAttrib});
export var arcGisTopoAttrib = '&copy; arcGIS <a href="http://links.esri.com/e800-summary" target="_blank"><b>(Topo Maps Terms of Use)</b></a>';
export var arcGisTopoUrl = 'http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}';
export var arcGisTopo = L.tileLayer(arcGisTopoUrl, {maxZoom: 19, attribution: arcGisTopoAttrib});
export var usTopoUrl = 'http://services.arcgisonline.com/ArcGIS/rest/services/USA_Topo_Maps/MapServer/tile/{z}/{y}/{x}';
export var usTopo = L.tileLayer(usTopoUrl, {maxZoom: 15, attribution: arcGisTopoAttrib});
export var natGeoUrl = 'http://services.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}';
export var natGeo = L.tileLayer(natGeoUrl, {maxZoom: 16, attribution: arcGisTopoAttrib});
export var streets = L.tileLayer(mapboxUrl, {id: 'mapbox.streets', maxZoom: 19, attribution: mapBoxAttrib});
export var lidarAttrib = 'Kentucky Division of Geographic Information (DGI)';
export var lidar = L.tileLayer.wms('https://kyraster.ky.gov/arcgis/services/ElevationServices/Ky_DEM_KYAPED_5FT_ShadedRelief_WGS84WM/ImageServer/WMSServer', {
	layers: '0',
	attribution: lidarAttrib
});
export var lidarMulti = L.tileLayer.wms('https://kyraster.ky.gov/arcgis/services/ElevationServices/Ky_DEM_KYAPED_5FT_MultiDirectionalHillshade/ImageServer/WMSServer', {
	layers: '0',
	attribution: lidarAttrib
});

export var baseLayers = {
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