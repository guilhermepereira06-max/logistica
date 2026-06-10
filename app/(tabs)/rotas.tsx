import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Link } from "expo-router";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const services = [
  {
    title: "BrasilAPI",
    icon: "map-marker-radius",
    accent: "#ce1313",
    description:
      "Resolve o endereço completo a partir do CEP informado pelo usuário.",
    example: "01001-000 → Praça da Sé, Sé, São Paulo - SP",
    use: "Consulta de CEP e localização textual.",
  },
  {
    title: "Nominatim",
    icon: "map-search-outline",
    accent: "#0f766e",
    description:
      "Converte texto de endereço em coordenadas geográficas (latitude e longitude).",
    example: "Praça da Sé, São Paulo → -23.5505, -46.6333",
    use: "Geocodificação para localizar o ponto no mapa.",
  },
  {
    title: "OSRM",
    icon: "routes",
    accent: "#7c3aed",
    description:
      "Calcula a rota real pelas ruas, avenidas e rodovias para desenhar a linha azul.",
    example: "Origem + Destino → polyline com o trajeto otimizado.",
    use: "Roteamento e navegação visual na interface.",
  },
];

export default function RotasPage() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.heroCard}>
        <MaterialCommunityIcons
          name="map-marker-path"
          size={44}
          color="#ce1313"
        />
        <Text style={styles.heroTitle}>BrasilAPI + Nominatim + OSRM</Text>
        <Text style={styles.heroSubtitle}>
          Uma stack simples e gratuita para descobrir endereços, geocodificar
          pontos e montar rotas reais no mapa.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionLabel}>Fluxo recomendado</Text>
        <Text style={styles.paragraph}>
          1. A BrasilAPI devolve o endereço completo a partir do CEP.{"\n"}
          2. O Nominatim transforma esse endereço em latitude e longitude.{"\n"}
          3. O OSRM entrega o trajeto real entre origem e destino, que o Leaflet
          Routing Machine desenha na tela.
        </Text>
      </View>

      {services.map((item) => (
        <View key={item.title} style={styles.card}>
          <View style={styles.serviceHeader}>
            <View style={styles.serviceBadge}>
              <MaterialCommunityIcons
                name={item.icon as never}
                size={22}
                color={item.accent}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.serviceTitle}>{item.title}</Text>
              <Text style={styles.serviceText}>{item.description}</Text>
            </View>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Exemplo</Text>
            <Text style={styles.infoText}>{item.example}</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Uso no app</Text>
            <Text style={styles.infoText}>{item.use}</Text>
          </View>
        </View>
      ))}

      <View style={styles.card}>
        <Text style={styles.sectionLabel}>Resumo técnico</Text>
        <Text style={styles.paragraph}>
          No backend você pode usar fetch/axios para consultar a BrasilAPI e o
          Nominatim. No frontend, o React Leaflet com Leaflet Routing Machine já
          conversa com o OSRM para desenhar a rota azul do mapa, mantendo a
          experiência visual e a lógica de navegação separadas.
        </Text>
      </View>

      <View style={styles.card}>
        <Link href="/" asChild>
          <TouchableOpacity style={styles.buttonPrimary}>
            <Text style={styles.buttonText}>Voltar ao início</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f4f4" },
  content: { padding: 18, gap: 16, paddingBottom: 36 },
  heroCard: { alignItems: "center", paddingVertical: 12, paddingBottom: 4 },
  heroTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: "#111111",
    textAlign: "center",
    marginTop: 8,
  },
  heroSubtitle: {
    fontSize: 15,
    color: "#525252",
    textAlign: "center",
    lineHeight: 22,
    marginTop: 6,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: "800",
    color: "#ae0e0eff",
    textTransform: "uppercase",
    letterSpacing: 1.2,
    marginBottom: 6,
  },
  paragraph: {
    fontSize: 15,
    color: "#525252",
    lineHeight: 22,
    textAlign: "justify",
  },
  serviceHeader: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
  serviceBadge: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#fff1f2",
    alignItems: "center",
    justifyContent: "center",
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111111",
    marginBottom: 4,
  },
  serviceText: { fontSize: 14, color: "#525252", lineHeight: 20 },
  infoBox: {
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    padding: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1.1,
    color: "#111111",
    marginBottom: 2,
  },
  infoText: { fontSize: 14, color: "#374151", lineHeight: 20 },
  buttonPrimary: {
    backgroundColor: "#ae0e0eff",
    paddingVertical: 14,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});
