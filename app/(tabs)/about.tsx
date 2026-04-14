import { StyleSheet, Text, ScrollView, View } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

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
          Somos uma empresa de logística inteligente focada em fornecer soluções eficientes, ágeis e altamente seguras. Com anos de sólida experiência, estamos comprometidos em atender o mercado no mais alto padrão de qualidade para as necessidades específicas de cada cliente, garantindo que tudo chegue ao destino exato de forma impecável.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Nossos Objetivos</Text>
        <Text style={styles.paragraph}>
          Nosso principal objetivo é revolucionar o transporte de cargas encurtando prazos e maximizando a segurança. Buscamos a liderança no mercado logístico sendo a ponte mais confiável entre o seu negócio e o seu cliente final, focando sempre em inovar nos processos operacionais e baratear os custos de frete.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Nossos Valores e Qualidades</Text>
        <View style={styles.listItem}>
           <Text style={styles.listText}><Text style={{fontWeight: 'bold', color: '#111'}}>Rapidez e Pontualidade: </Text>Monitoramos rotas ativamente visando entregas sempre dentro ou antes do prazo acordado.</Text>
        </View>
        <View style={styles.listItem}>
           <Text style={styles.listText}><Text style={{fontWeight: 'bold', color: '#111'}}>Segurança Total: </Text>Sua carga é constantemente protegida, vistoriada e tratada com o mais extremo cuidado do embarque ao desembarque.</Text>
        </View>
        <View style={styles.listItem}>
           <Text style={styles.listText}><Text style={{fontWeight: 'bold', color: '#111'}}>Tecnologia de Ponta: </Text>Rastreadores inteligentes, painéis digitais atualizados em tempo real e rotas otimizadas por dados e inteligência.</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>O que é Logística?</Text>
        <Text style={styles.paragraph}>
          A logística é o processo estratégico de planejamento, armazenamento e o controle eficiente do fluxo de bens, desde o primeiro ponto de origem da fábrica até o consumidor final. Ela opera essencialmente para garantir que todos tenham acesso rápido a produtos mundo afora, girando a engrenagem da economia e encurtando distâncias.
        </Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  content: {
    padding: 20,
    gap: 16,
    paddingBottom: 40,
  },
  heroCard: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingBottom: 10,
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: '#111111',
    marginTop: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#525252',
    fontWeight: '600',
    marginTop: 4,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111111',
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 15,
    color: '#525252',
    lineHeight: 24,
    textAlign: 'justify',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 14,
    gap: 12,
    paddingRight: 10,
  },
  listText: {
    fontSize: 15,
    color: '#525252',
    lineHeight: 22,
    flex: 1,
  }
});
