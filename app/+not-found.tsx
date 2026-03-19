import { Link, Stack } from 'expo-router';
import { StyleSheet, View } from "react-native";

export default function NotFound() {
  return (
    <>
      <Stack.Screen options={{ title: 'Esta pagina nao foi encontrada' }} />
      <View style={styles.container}>
        <Link href="/" style={styles.button}>
          Volte para a tela inicial
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color:'#25292e',
  },
  button:{
    fontSize:20,
    textDecorationLine:'underline',
    color:'#fff',
  },
});
