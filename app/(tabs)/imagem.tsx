import { View, StyleSheet } from "react-native";
import { Image } from 'expo-image';
const PlaceholderImage = require('@/assets/images/banner.png');

export default function Index() {
    return(
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={PlaceholderImage} style={styles.image}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: '#F4F4F9', alignItems: 'center', justifyContent: 'center'},
    imageContainer: {width: '100%',alignItems: 'center',justifyContent: 'center',marginVertical: 20,},
    image: {width: '80%',maxWidth: 800,aspectRatio: 16 / 9,borderRadius: 12,},
});