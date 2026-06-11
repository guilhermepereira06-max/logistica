import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

type Coord = { latitude: number; longitude: number };
type RouteItem = {
  id: string;
  rota: string;
  horario: string;
  carga: string;
  status: string;
  statusColor: string;
  coords: Coord[];
};

interface MapComponentProps {
  routeState: RouteItem[];
  selectedRouteId: string | null;
}

export default function MapComponent({ routeState, selectedRouteId }: MapComponentProps) {
  const currentRoute = routeState?.find((r) => r.id === selectedRouteId);
  const temRota = currentRoute && currentRoute.coords && currentRoute.coords.length > 0;

  let htmlContent = '';

  if (temRota) {
    const coordsJs = JSON.stringify(currentRoute.coords.map(c => [c.latitude, c.longitude]));
    const statusColor = currentRoute.statusColor || '#ae0e0eff';

    htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        <style>
          body { margin: 0; padding: 0; background-color: #e5e5e5; }
          #map { height: 100vh; width: 100vw; }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          var map = L.map('map', { zoomControl: false });
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '&copy; OpenStreetMap'
          }).addTo(map);
          
          var coords = ${coordsJs};
          
          var DefaultIcon = L.icon({
              iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
              shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
              iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]
          });
          L.Marker.prototype.options.icon = DefaultIcon;

          L.marker(coords[0]).addTo(map).bindPopup('Origem');
          L.marker(coords[coords.length - 1]).addTo(map).bindPopup('Destino');
          
          var routeLine = L.polyline(coords, { color: '${statusColor}', weight: 5 }).addTo(map);
          
          setTimeout(() => { map.fitBounds(routeLine.getBounds(), { padding: [40, 40] }); }, 200);
        </script>
      </body>
      </html>
    `;
  } else {
    // Mapa padrão mostrando o Brasil caso não tenha rota
    htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        <style>
          body { margin: 0; padding: 0; background-color: #e5e5e5; }
          #map { height: 100vh; width: 100vw; }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          var map = L.map('map', { zoomControl: false }).setView([-14.2350, -51.9253], 4);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '&copy; OpenStreetMap'
          }).addTo(map);
        </script>
      </body>
      </html>
    `;
  }

  return (
    <View style={styles.container}>
      <WebView 
        source={{ html: htmlContent }} 
        style={styles.map}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#e5e5e5',
  },
  map: {
    flex: 1,
    backgroundColor: 'transparent',
  }
});