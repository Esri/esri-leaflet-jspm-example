import L from 'leaflet';
import { featureLayer, basemapLayer } from 'esri-leaflet';
import { geosearch, arcgisOnlineProvider, featureLayerProvider } from 'esri-leaflet-geocoder';

L.Icon.Default.imagePath = '/jspm_packages/npm/leaflet@1.0.0-beta.1/dist/images';

// create map
var map = L.map('map').setView([45.526, -122.667], 15);

// add basemap
basemapLayer('Topographic').addTo(map);

// add layer
featureLayer({
  url: '//services.arcgis.com/uCXeTVveQzP4IIcx/arcgis/rest/services/gisday/FeatureServer/0/'
}).addTo(map);

// add search control
geosearch({
  providers: [
    arcgisOnlineProvider(),
    featureLayerProvider({
      url: '//services.arcgis.com/uCXeTVveQzP4IIcx/arcgis/rest/services/gisday/FeatureServer/0/',
      searchFields: ['Name', 'Organization'],
      label: 'GIS Day Events',
      bufferRadius: 20000,
      formatSuggestion: function (feature) {
        return feature.properties.Name + ' - ' + feature.properties.Organization;
      }
    })
  ]
}).addTo(map);
