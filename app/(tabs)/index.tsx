import Button from '@/components/Button';
import ImageViewer from '@/components/ImageViewer';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { StyleSheet, View } from "react-native";
const PlaceholderImage = require('@/assets/images/background-image.png');


export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);

  const pickImageAsync = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes:['images'],
        allowsEditing: true,
        quality: 1,
      });
      if(!result.canceled){
        setSelectedImage(result.assets[0].uri);
      }else{
        alert('Você não selecionou nenhuma imagem.');
      }
  };

  return (
    
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
      </View>
      <View style={styles.footerContainer}>
        <Button theme="primary" label="Acessar imagens" onPress={pickImageAsync}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#F4F4F9',
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
    color:'#fffbfbff',
  },
  footerContainer:{
    flex:1 / 3,
    alignItems:'center',
  },
});
