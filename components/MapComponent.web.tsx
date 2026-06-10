import React from 'react';
import { StyleSheet, View } from 'react-native';

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
  if (!routeState || routeState.length === 0) return null;

  const currentRoute = routeState.find((r) => r.id === selectedRouteId);
  if (!currentRoute || !currentRoute.coords || currentRoute.coords.length === 0) return null;

  const coordsJs = JSON.stringify(currentRoute.coords.map(c => [c.latitude, c.longitude]));
  const statusColor = currentRoute.statusColor || '#ce1313';

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      <style>
        body { margin: 0; padding: 0; background-color: #f4f4f4; }
        #map { height: 100vh; width: 100vw; }
        .leaflet-default-icon-path {
          background-image: url(https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png);
        }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script>
        var map = L.map('map', { zoomControl: false });
        
        // CORREÇÃO: Usando o OpenStreetMap oficial (não bloqueia acessos)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);
        
        var coords = ${coordsJs};
        
        var DefaultIcon = L.icon({
            iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
            shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });
        L.Marker.prototype.options.icon = DefaultIcon;

        L.marker(coords[0]).addTo(map).bindPopup('Origem');
        L.marker(coords[coords.length - 1]).addTo(map).bindPopup('Destino');
        
        var routeLine = L.polyline(coords, {
            color: '${statusColor}',
            weight: 5,
            opacity: 0.9
        }).addTo(map);
        
        // Adiciona um pequeno atraso para garantir que o mapa carregou o tamanho da tela
        setTimeout(() => {
          map.fitBounds(routeLine.getBounds(), { padding: [40, 40] });
        }, 100);
      </script>
    </body>
    </html>
  `;

  const IFrame = 'iframe' as any;

  return (
    <View style={styles.container}>
      <IFrame 
        srcDoc={htmlContent}
        style={{ width: '100%', height: '100%', border: 'none' }} 
        title="Map Preview"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#f4f4f4',
  }
});