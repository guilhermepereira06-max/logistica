import { StyleSheet, Text, View } from "react-native";
import{Link} from 'expo-router';
export default function About() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}> Sobre nós </Text>
      <Link href="/" style={styles.button}>
        Voltar Para Home
      </Link>
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
