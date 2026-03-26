import { Link } from 'expo-router';
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}> Pagina Inicial </Text>
      <Link href="/about" style={styles.button}>
        Sobre Nós
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
    color:'#000000ff',
  },
});
