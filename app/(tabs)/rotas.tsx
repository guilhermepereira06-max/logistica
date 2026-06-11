import React, { useState } from "react";
import {StyleSheet,Text,TextInput,TouchableOpacity,View,ActivityIndicator,Keyboard,} from "react-native";
import { Link } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import axios from "axios";

import MapComponent from "../../components/MapComponent";

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

export default function RotasPage() {
  const [origemInput, setOrigemInput] = useState("");
  const [destinoInput, setDestinoInput] = useState("");
  const [carregando, setCarregando] = useState(false);
  
  const [routeState, setRouteState] = useState<RouteItem[]>([]);
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null);
  
  const buscarDadosDoLocal = async (entrada: string) => {
    const termoDeBusca = entrada.trim();

    const osmUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      termoDeBusca
    )}&limit=10&addressdetails=1`;
    
    const osmRes = await axios.get(osmUrl, {
      headers: {
        'User-Agent': 'AppLogistica/1.0 (contato@seusite.com)',
        'Accept': 'application/json'
      }
    });

    if (osmRes.data.length === 0) {
      throw new Error(`Não encontramos nenhum resultado para "${entrada}".`);
    }

    const classesPermitidas = ['place', 'boundary'];
    const tiposPermitidos = [
      'city', 'town', 'village', 'municipality',
      'state', 'province', 'region',            
      'country', 'administrative'               
    ];

    const localValido = osmRes.data.find((item: any) => {
      const classe = item.class;
      const tipo = item.type;
      
      return classesPermitidas.includes(classe) && tiposPermitidos.includes(tipo);
    });

    if (!localValido) {
      throw new Error(`O termo "${entrada}" encontrou ruas ou endereços específicos. Digite apenas o nome da Cidade, Estado ou País.`);
    }

    return {
      latitude: parseFloat(localValido.lat),
      longitude: parseFloat(localValido.lon),
      endereco: localValido.display_name,
    };
  };
  const calcularCaminho = async () => {
    if (!origemInput || !destinoInput) {
      alert("Preencha a origem e o destino!");
      return;
    }

    Keyboard.dismiss();
    setCarregando(true);

    try {
      const dadosOrigem = await buscarDadosDoLocal(origemInput);
      const dadosDestino = await buscarDadosDoLocal(destinoInput);

      const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${dadosOrigem.longitude},${dadosOrigem.latitude};${dadosDestino.longitude},${dadosDestino.latitude}?overview=full&geometries=geojson`;
      
      // CORREÇÃO: Enviando o crachá para o OSRM também por segurança
      const osrmRes = await axios.get(osrmUrl, {
        headers: {
          'User-Agent': 'AppLogistica/1.0 (contato@seusite.com)',
          'Accept': 'application/json'
        }
      });

      const coordenadasDaRota = osrmRes.data.routes[0].geometry.coordinates.map((coord: any) => ({
        latitude: coord[1],
        longitude: coord[0],
      }));

      const novaRota: RouteItem = {
        id: "rota-calculada-1",
        rota: `${origemInput} -> ${destinoInput}`,
        horario: new Date().toLocaleTimeString(),
        carga: "Padrão",
        status: "Ativa",
        statusColor: "#ae0e0eff", 
        coords: coordenadasDaRota
      };

      setRouteState([novaRota]);
      setSelectedRouteId(novaRota.id);

    } catch (error: any) {
      if (error.response && error.response.data) {
        const mensagemGPS = error.response.data.message || error.response.data.code || error.message;
        
        if (mensagemGPS === "NoRoute") {
          alert("Não existe rota terrestre (estradas) entre esses dois locais.");
        } else if (mensagemGPS?.includes("segment")) {
          alert("O local digitado é muito amplo e caiu numa área sem ruas (ex: meio do país/estado). Tente digitar o nome de uma cidade.");
        } else {
          alert(`Erro do Servidor: ${mensagemGPS}`);
        }
      } else {
        alert(error.message || "Erro ao traçar rota. Verifique os dados digitados.");
      }
      console.log("Erro completo:", error);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapComponent 
          routeState={routeState} 
          selectedRouteId={selectedRouteId} 
        />
      </View>

      <View style={styles.bottomPanel}>
        <View style={styles.heroCard}>
          <MaterialCommunityIcons name="map-marker-path" size={32} color="#ce1313" />
          <Text style={styles.heroTitle}>Traçar Rota</Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Origem (Cidade ou País)"
          value={origemInput}
          onChangeText={setOrigemInput}
        />

        <TextInput
          style={styles.input}
          placeholder="Destino (Cidade ou País)"
          value={destinoInput}
          onChangeText={setDestinoInput}
        />

        <TouchableOpacity 
          style={styles.buttonPrimary} 
          onPress={calcularCaminho}
          disabled={carregando}
        >
          {carregando ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>CALCULAR CAMINHO</Text>
          )}
        </TouchableOpacity>

        <Link href="/" asChild>
          <TouchableOpacity style={styles.buttonSecondary}>
            <Text style={styles.buttonTextSecondary}>Voltar ao Início</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f4f4" },
  mapContainer: { flex: 1, backgroundColor: "#0f172a" },
  bottomPanel: {backgroundColor: "#ffffff",borderTopLeftRadius: 24,borderTopRightRadius: 24,padding: 20,shadowColor: "#000",shadowOffset: { width: 0, height: -4 },shadowOpacity: 0.1,shadowRadius: 8,elevation: 10,gap: 12,},
  heroCard: { alignItems: "center", marginBottom: 4 },
  heroTitle: { fontSize: 20, fontWeight: "900", color: "#111111", marginTop: 4 },
  input: {backgroundColor: "#f8fafc",borderWidth: 1,borderColor: "#e5e7eb",borderRadius: 12,padding: 14,fontSize: 15,color: "#333",},
  buttonPrimary: {backgroundColor: "#ae0e0eff",paddingVertical: 14,borderRadius: 12,alignItems: "center",marginTop: 8,},
  buttonText: { color: "#FFFFFF", fontSize: 15, fontWeight: "800", textTransform: "uppercase", letterSpacing: 1 },
  buttonSecondary: { paddingVertical: 12, alignItems: "center" },
  buttonTextSecondary: { color: "#525252", fontSize: 14, fontWeight: "700" },
});