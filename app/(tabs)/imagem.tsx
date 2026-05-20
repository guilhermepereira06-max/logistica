import Button from "@/components/Button";
import ImageViewer from "@/components/ImageViewer";
import * as ImagePicker from 'expo-image-picker';
import { StyleSheet, View } from "react-native";
import {useState} from 'react';
const PlaceholderImage = require('@/assets/images/banner.png');

export default function Image() {
    const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing:true,
            quality:1,
        });
        if(!result.canceled){
            setSelectedImage(result.assets[0].uri);
            console.log(result);
        }
        else{
            alert('Nenhuma imagem selecionada');
        }
        };
    return(
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <ImageViewer imgSource={selectedImage ? { uri: selectedImage } : PlaceholderImage} />
            </View>
            <View style={styles.footerContainer}>
                <Button theme="primary" label="Escolha a foto"onPress={pickImageAsync}/>
                <Button label="Usar foto"/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: '#F4F4F9', alignItems: 'center', justifyContent: 'center'},
    imageContainer: {width: '100%',alignItems: 'center',justifyContent: 'center',marginVertical: 20,},
    image: {width: '80%',maxWidth: 800,aspectRatio: 16 / 9,borderRadius: 12,},
    footerContainer: {width: '100%', alignItems: 'center', gap: 15, paddingHorizontal: 30, marginBottom: 30},
});