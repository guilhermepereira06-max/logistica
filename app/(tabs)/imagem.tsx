import Button from "@/components/Button";
import CircleButton from "@/components/CircleButton";
import EmojiList from "@/components/EmojiList";
import EmojiPicker from "@/components/EmojiPicker";
import EmojiSticker from "@/components/EmojiStricker";
import IconButton from "@/components/IconButton";
import ImageViewer from "@/components/ImageViewer";
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { useRef, useState } from 'react';
import { ImageSourcePropType, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { captureRef } from 'react-native-view-shot';

const PlaceholderImage = require('@/assets/images/banner.png');

export default function Imagem() {
    const imageRef = useRef<any>(null);
    const [status, requestPermission] = MediaLibrary.usePermissions();
    const onSaveImageAsync = async () => {
        try {
            const localUri = await captureRef(imageRef, {
                height: 440,
                quality: 1,
            });

            await MediaLibrary.saveToLibraryAsync(localUri);
            if(localUri) {
                alert('Imagem salva com sucesso!');
            }
            } catch(e){
                alert('Erro ao salvar imagem! veja o console para mais detalhes');
                console.log(e);
            }
        };
    const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
    const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [pickedEmoji, setPickedEmoji] = useState<ImageSourcePropType | undefined>(undefined);
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
     if(status === null){
        requestPermission();
     }
    return(
        <GestureHandlerRootView style={styles.container}>
            <View style={styles.imageContainer}>
                <View ref={imageRef} collapsable={false}>
                    <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
                    {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />}
                </View>
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
                <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose}/>
            </EmojiPicker>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: '#25292e', alignItems: 'center',},
    imageContainer: {flex:1,},
    footerContainer: {flex:1/3, alignItems: 'center',},
    optionsContainer:{position:'absolute', bottom:80,},
    optionsRow:{alignItems:'center', flexDirection:'row',},
});