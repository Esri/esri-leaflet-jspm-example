/*
 * Copyright 2015 Esri
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.​
 */

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
