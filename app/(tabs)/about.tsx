import { StyleSheet, Text, View } from "react-native";
import{Link} from 'expo-router';
export default function About() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}> Sobre nós </Text>
      <Text style={styles.text}> Somos uma empresa de logística dedicada a fornecer soluções eficientes e confiáveis para nossos clientes. Com anos de experiência no setor, estamos comprometidos em oferecer serviços de alta qualidade que atendam às necessidades específicas de cada cliente. Nossa equipe é composta por profissionais altamente qualificados que trabalham incansavelmente para garantir a satisfação do cliente e o sucesso de suas operações logísticas. </Text>
      <Text style={styles.text}> Nossa missão é ser a escolha número um para serviços de logística, oferecendo soluções inovadoras e personalizadas que impulsionam o crescimento e a eficiência dos negócios de nossos clientes. </Text>
      <Text style={styles.text}> O que é Logistica </Text>
      <Text style={styles.text}> Logística é o processo de planejamento, implementação e controle eficiente do fluxo e armazenamento de bens, serviços e informações relacionadas, desde o ponto de origem até o ponto de consumo, com o objetivo de atender às necessidades dos clientes. Envolve atividades como transporte, armazenamento, gerenciamento de estoque, embalagem e distribuição. A logística é essencial para garantir que os produtos cheguem ao destino final de maneira rápida, segura e econômica. </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#f8f8f8ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color:'#000000ff',
  },
  button:{
    fontSize:20,
    textDecorationLine:'underline',
    color:'#080706ff',
  },
});
