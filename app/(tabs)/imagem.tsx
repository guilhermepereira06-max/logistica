import Button from "@/components/Button";
import ImageViewer from "@/components/ImageViewer";
import * as ImagePicker from 'expo-image-picker';
import { StyleSheet, View } from "react-native";
import {useState} from 'react';
import IconButton from "@/components/IconButton";
import CircleButton from "@/components/CircleButton";
import EmojiPicker from "@/components/EmojiPicker";

const PlaceholderImage = require('@/assets/images/banner.png');

export default function Imagem() {
    const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
    const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing:true,
            quality:1,
        });
        if(!result.canceled){
            setSelectedImage(result.assets[0].uri);
            setShowAppOptions(true);
        }
        else{
            alert('Nenhuma imagem selecionada');
        }
    };
    const onReset = () => {
        setShowAppOptions(false);
    };
    const onAddSticker = () => {
        setIsModalVisible(true);
    };
    const onModalClose = () => {
        setIsModalVisible(false);
    }
    const onSaveImageAsync = () => {
        alert('Salvar imagem');
    };
    return(
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
            </View>
            {showAppOptions ? (
                <View style={styles.optionsContainer}>
                    <View style={styles.optionsRow}>
                        <IconButton icon="refresh" label="Recarregar" onPress={onReset} />
                        <CircleButton onPress={onAddSticker}/>
                        <IconButton icon="save-alt" label="Salvar" onPress={onSaveImageAsync}/>
                    </View>
                </View>
            ) : (
            <View style={styles.footerContainer}>
                <Button theme="primary" label="Escolha a foto" onPress={pickImageAsync}/>
                <Button label="Usar foto" onPress={()=>setShowAppOptions(true)}/>
            </View>
            )}
            <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>

            </EmojiPicker>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: '#25292e', alignItems: 'center',},
    imageContainer: {flex:1,},
    footerContainer: {flex:1/3, alignItems: 'center',},
    optionsContainer:{position:'absolute', bottom:80,},
    optionsRow:{alignItems:'center', flexDirection:'row',},
});