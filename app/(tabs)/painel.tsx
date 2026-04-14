import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { ImageBackground, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import MapComponent from '@/components/MapComponent';



const indicadores = [
  {
    id: '1',
    label: 'Entregas hoje',
    value: '128',
    icon: 'truck-fast-outline' as const,
  },
  {
    id: '2',
    label: 'Frota ativa',
    value: '24',
    icon: 'truck-check-outline' as const,
  },
  {
    id: '3',
    label: 'No prazo',
    value: '96%',
    icon: 'clock-check-outline' as const,
  },
  {
    id: '4',
    label: 'Ocorrencias',
    value: '03',
    icon: 'map-marker-alert-outline' as const,
  },
];

const rotas = [
  {
    id: '1',
    rota: 'SP -> Campinas',
    horario: '08:30',
    carga: 'Medicamentos',
    status: 'Coleta',
    statusColor: '#2563eb',
    coords: [
      { latitude: -23.55052, longitude: -46.633308 }, // São Paulo
      { latitude: -23.007763, longitude: -47.434598 }, // Campinas
    ],
  },
  {
    id: '2',
    rota: 'SP -> Santos',
    horario: '10:15',
    carga: 'Eletrodomesticos',
    status: 'Coleta',
    statusColor: '#2563eb',
    coords: [
      { latitude: -23.55052, longitude: -46.633308 }, // São Paulo
      { latitude: -23.9608, longitude: -46.3336 }, // Santos (approx)
    ],
  },
  {
    id: '3',
    rota: 'SP -> Sorocaba',
    horario: '13:40',
    carga: 'Autopecas',
    status: 'Coleta',
    statusColor: '#2563eb',
    coords: [
      { latitude: -23.55052, longitude: -46.633308 }, // São Paulo
      { latitude: -23.5015, longitude: -47.4526 }, // Sorocaba (approx)
    ],
  },
];

const STATUS_OPTIONS = [
  { key: 'Em rota', color: '#f97316' },
  { key: 'Coleta', color: '#2563eb' },
  { key: 'Entregue', color: '#16a34a' },
];



export default function Painel() {
  const [routeState, setRouteState] = useState(rotas);
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(rotas[0].id);

  function updateStatus(id: string, newStatus: string) {
    setRouteState((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status: newStatus,
              statusColor: STATUS_OPTIONS.find((s) => s.key === newStatus)?.color || '#6b7280',
            }
          : r
      )
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.mapCard}>
        <Text style={styles.sectionTitle}>Mapa rápido</Text>
        <Text style={styles.sectionDescription}>Selecione uma rota para ver o trajeto .</Text>

        <View style={styles.mapControls}>
          {routeState.map((r) => (
            <TouchableOpacity
              key={r.id}
              style={[styles.mapRouteButton, selectedRouteId === r.id && styles.mapRouteButtonActive]}
              onPress={() => setSelectedRouteId(r.id)}
            >
              <Text style={[styles.mapRouteButtonText, selectedRouteId === r.id && { color: '#fff' }]}>{r.rota}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.mapPreview}>
          <MapComponent routeState={routeState} selectedRouteId={selectedRouteId} />
        </View>
      </View>


      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Resumo rapido</Text>
        <Text style={styles.sectionDescription}>Indicadores principais da operacao de hoje.</Text>
      </View>

      <View style={styles.cardsGrid}>
        {indicadores.map((item) => {
          const deliveredCount = routeState.filter((r) => r.status === 'Entregue').length;
          const inRouteCount = routeState.filter((r) => r.status === 'Em rota').length;
          
          let value = item.value;
          if (item.id === '1') {
             value = String(Number(item.value) + deliveredCount);
          } else if (item.id === '2') {
             value = String(Number(item.value) + inRouteCount);
          } else if (item.id === '4') {
             const baseOcorrencias = Number(item.value);
             const computed = Math.max(0, baseOcorrencias - deliveredCount);
             value = String(computed).padStart(2, '0');
          }

          return (
            <View key={item.id} style={styles.metricCard}>
              <View style={styles.metricIcon}>
                <MaterialCommunityIcons name={item.icon} size={22} color="#ce1313" />
              </View>
              <Text style={styles.metricValue}>{value}</Text>
              <Text style={styles.metricLabel}>{item.label}</Text>
            </View>
          );
        })}
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Rotas prioritarias</Text>
        <Text style={styles.sectionDescription}>Planejamento das proximas saidas e coletas.</Text>
      </View>

      <View style={styles.panel}>
        {routeState.map((item) => (
          <View key={item.id} style={styles.routeCard}>
            <View style={styles.routeTopRow}>
              <View>
                <Text style={styles.routeName}>{item.rota}</Text>
                <Text style={styles.routeCargo}>{item.carga}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: item.statusColor }]}>
                <Text style={styles.statusText}>{item.status}</Text>
              </View>
            </View>



            <View style={styles.statusControls}>
              {STATUS_OPTIONS.map((opt) => {
                const active = opt.key === item.status;
                return (
                  <TouchableOpacity
                    key={opt.key}
                    style={[styles.statusOption, active && { backgroundColor: opt.color }]}
                    onPress={() => updateStatus(item.id, opt.key)}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.statusOptionText, active && { color: '#fff', fontWeight: '800' }]}>
                      {opt.key}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}
      </View>


    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f4f4' },
  content: { padding: 18, paddingBottom: 30, gap: 18 },
  sectionHeader: { gap: 4 },
  sectionTitle: { color: '#111111', fontSize: 21, fontWeight: '800' },
  sectionDescription: { color: '#525252', fontSize: 14, lineHeight: 20 },
  cardsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  metricCard: { width: '48%', minWidth: 150, backgroundColor: '#ffffff', borderRadius: 20, padding: 16, gap: 10, borderWidth: 1, borderColor: '#e5e7eb', shadowColor: '#000000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.08, shadowRadius: 10, elevation: 3 },
  metricIcon: { width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff1f1' },
  metricValue: { color: '#111111', fontSize: 24, fontWeight: '800' },
  metricLabel: { color: '#525252', fontSize: 14, lineHeight: 20 },
  panel: { backgroundColor: '#ffffff', borderRadius: 22, padding: 16, gap: 14, borderWidth: 1, borderColor: '#e5e7eb', shadowColor: '#000000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.08, shadowRadius: 10, elevation: 3 },
  routeCard: { backgroundColor: '#fafafa', borderRadius: 18, padding: 14, gap: 12 },
  routeTopRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 10 },
  routeName: { color: '#111111', fontSize: 17, fontWeight: '800' },
  routeCargo: { color: '#525252', fontSize: 14, marginTop: 4 },
  statusBadge: { alignSelf: 'flex-start', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 6 },
  statusText: { color: '#ffffff', fontSize: 12, fontWeight: '700' },
  routeBottomRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  routeInfo: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  routeInfoText: { color: '#3f3f46', fontSize: 13, fontWeight: '600' },
  statusControls: { flexDirection: 'row', gap: 8, marginTop: 8, flexWrap: 'wrap' },
  statusOption: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999, backgroundColor: '#f3f4f6', borderWidth: 1, borderColor: '#e5e7eb', marginRight: 8, marginTop: 6 },
  statusOptionText: { color: '#374151', fontSize: 13, fontWeight: '700' },
  mapCard: { backgroundColor: '#ffffff', borderRadius: 18, padding: 12, gap: 10, borderWidth: 1, borderColor: '#e5e7eb' },
  mapControls: { flexDirection: 'row', gap: 8, marginTop: 8, flexWrap: 'wrap' },
  mapRouteButton: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999, backgroundColor: '#f3f4f6', borderWidth: 1, borderColor: '#e5e7eb' },
  mapRouteButtonActive: { backgroundColor: '#111827' },
  mapRouteButtonText: { color: '#374151', fontWeight: '700' },
  mapPreview: { marginTop: 12, height: 200, borderRadius: 12, overflow: 'hidden', backgroundColor: '#0f172a', padding: 0, justifyContent: 'center' },
  mapFull: { ...StyleSheet.absoluteFillObject },
});
