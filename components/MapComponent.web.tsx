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

  // Extrair as coordenadas e passar para o formato JavaScript.
  const coordsJs = JSON.stringify(currentRoute.coords.map(c => [c.latitude, c.longitude]));
  const statusColor = currentRoute.statusColor || '#ce1313';

  // Usando um HTML dinâmico com a biblioteca LeafletJS para desenhar a linha.
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      <style>
        body { margin: 0; padding: 0; background-color: #0f172a; }
        #map { height: 100vh; width: 100vw; }
        
        /* Ajuste simples para os pinos nativos do leaflet renderizarem direitinho */
        .leaflet-default-icon-path {
          background-image: url(https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png);
        }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script>
        // Inicializa o mapa
        var map = L.map('map', { zoomControl: false });
        
        // Tile mais bonito (Carto Voyager) invés do padrão para combinar com o design
        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
        }).addTo(map);
        
        var coords = ${coordsJs};
        
        // Criação dos icones garantindo imagem da CDN
        var DefaultIcon = L.icon({
            iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
            shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });
        L.Marker.prototype.options.icon = DefaultIcon;

        // Adiciona Marcadores na Origem e Destino
        L.marker(coords[0]).addTo(map).bindPopup('Origem');
        L.marker(coords[coords.length - 1]).addTo(map).bindPopup('Destino');
        
        // Desenha a Rota
        var routeLine = L.polyline(coords, {
            color: '${statusColor}',
            weight: 5,
            opacity: 0.9
        }).addTo(map);
        
        // Ajusta o zoom da camera automaticamente para mostrar toda a linha
        map.fitBounds(routeLine.getBounds(), { padding: [40, 40] });
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
    backgroundColor: '#0f172a',
  }
});
