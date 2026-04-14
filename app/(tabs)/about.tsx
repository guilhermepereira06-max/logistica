import { StyleSheet, Text, ScrollView, View, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Link } from "expo-router"; // Importação corrigida aqui

export default function About() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      
      <View style={styles.heroCard}>
         <MaterialCommunityIcons name="truck-cargo-container" size={48} color="#ce1313" style={{marginBottom: 10}} />
         <Text style={styles.heroTitle}>A Logística do Futuro</Text>
         <Text style={styles.heroSubtitle}>Conectando distâncias, entregando resultados.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Quem Somos</Text>
        <Text style={styles.paragraph}>
          Somos uma empresa de logística inteligente focada em fornecer soluções eficientes, ágeis e altamente seguras. Com anos de sólida experiência, estamos comprometidos em atender o mercado no mais alto padrão de qualidade.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Nossos Objetivos</Text>
        <Text style={styles.paragraph}>
          Nosso principal objetivo é revolucionar o transporte de cargas encurtando prazos e maximizando a segurança. Buscamos a liderança no mercado logístico sendo a ponte mais confiável entre o seu negócio e o cliente.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Nossos Valores e Qualidades</Text>
        <View style={styles.listItem}>
           <Text style={styles.listText}><Text style={{fontWeight: 'bold', color: '#111'}}>Rapidez: </Text>Monitoramos rotas ativamente visando entregas sempre dentro do prazo.</Text>
        </View>
        <View style={styles.listItem}>
           <Text style={styles.listText}><Text style={{fontWeight: 'bold', color: '#111'}}>Segurança Total: </Text>Sua carga é tratada com o mais extremo cuidado do embarque ao desembarque.</Text>
        </View>
        <View style={styles.listItem}>
           <Text style={styles.listText}><Text style={{fontWeight: 'bold', color: '#111'}}>Tecnologia: </Text>Rastreadores inteligentes e painéis digitais atualizados em tempo real.</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Link href="/" asChild>
          <TouchableOpacity style={styles.buttonPrimary}>
            <Text style={styles.buttonText}>Voltar ao Início</Text>
          </TouchableOpacity>
        </Link>
      </View>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1,backgroundColor: '#f4f4f4',},
  content: {padding: 20,gap: 16,paddingBottom: 40,},
  heroCard: {alignItems: 'center',paddingVertical: 20,paddingBottom: 10,},
  heroTitle: {fontSize: 26,fontWeight: '900',color: '#111111',marginTop: 8,},
  heroSubtitle: {fontSize: 16,color: '#525252',fontWeight: '600',marginTop: 4,},
  card: {backgroundColor: '#ffffff',borderRadius: 16,padding: 20,borderWidth: 1,borderColor: '#e5e7eb',shadowColor: '#000',shadowOffset: { width: 0, height: 4 },shadowOpacity: 0.05,shadowRadius: 8,elevation: 2,},
  title: {fontSize: 20,fontWeight: '800',color: '#111111',marginBottom: 12,},
  paragraph: {fontSize: 15,color: '#525252',lineHeight: 24,textAlign: 'justify',},
  listItem: {flexDirection: 'row',alignItems: 'flex-start',marginBottom: 14,gap: 12,paddingRight: 10,},
  listText: {fontSize: 15,color: '#525252',lineHeight: 22,flex: 1,},
  buttonPrimary: {backgroundColor: '#ae0e0eff', paddingVertical: 15, borderRadius: 12, width: '100%', alignItems: 'center', shadowColor: '#000', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.2, shadowRadius: 4, elevation: 5},
  buttonText: {color: '#FFFFFF', fontSize: 16, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1},
});