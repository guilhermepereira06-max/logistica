import React from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';

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

  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={{ ...StyleSheet.absoluteFillObject }}
      initialRegion={{
        latitude: routeState[0].coords[0].latitude,
        longitude: routeState[0].coords[0].longitude,
        latitudeDelta: 0.8,
        longitudeDelta: 0.8,
      }}
    >
      {routeState
        .filter((r) => r.coords && r.id === selectedRouteId)
        .map((r) => (
          <React.Fragment key={r.id}>
            <Polyline coordinates={r.coords} strokeWidth={4} strokeColor={r.statusColor} />
            <Marker coordinate={r.coords[0]} title="Origem" />
            <Marker coordinate={r.coords[r.coords.length - 1]} title="Destino" />
          </React.Fragment>
        ))}
    </MapView>
  );
}
