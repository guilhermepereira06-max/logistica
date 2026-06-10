import React, { useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';

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
  const mapRef = useRef<MapView>(null);

  if (!routeState || routeState.length === 0) return null;

  const currentRoute = routeState.find((r) => r.id === selectedRouteId);
  if (!currentRoute || !currentRoute.coords || currentRoute.coords.length === 0) return null;

  // CORREÇÃO: Força o enquadramento da câmera para garantir que a tela atualize
  useEffect(() => {
    if (mapRef.current && currentRoute.coords.length > 0) {
      setTimeout(() => {
        mapRef.current?.fitToCoordinates(currentRoute.coords, {
          edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
          animated: true,
        });
      }, 500); // Pequeno atraso para o mapa renderizar primeiro
    }
  }, [currentRoute.coords]);

  return (
    <MapView
      ref={mapRef}
      // CORREÇÃO: provider removido para usar o mapa gratuito e estável do sistema
      style={{ ...StyleSheet.absoluteFillObject }}
      initialRegion={{
        latitude: currentRoute.coords[0].latitude,
        longitude: currentRoute.coords[0].longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }}
    >
      <Polyline 
        coordinates={currentRoute.coords} 
        strokeWidth={5} 
        strokeColor={currentRoute.statusColor || '#ae0e0eff'} 
      />
      <Marker coordinate={currentRoute.coords[0]} title="Origem" pinColor="green" />
      <Marker coordinate={currentRoute.coords[currentRoute.coords.length - 1]} title="Destino" pinColor="red" />
    </MapView>
  );
}