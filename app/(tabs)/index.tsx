import { Link } from 'expo-router';
import { StyleSheet, Text, View } from "react-native";
import{Image} from 'expo-image';
import ImageViewer from '@/components/ImageViewer';

const PlaceholderImage = require('@/assets/images/background-image.png');
export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer imgSource={PlaceholderImage}/>
      </View>
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
  imageContainer:{
    flex:1,
  },
  image:{
    width:320,
    height:440,
    borderRadius:18,
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
