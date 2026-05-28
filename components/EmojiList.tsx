import {useState} from 'react';
import{ImageSourcePropType,StyleSheet,FlatList,Platform,Pressable} from 'react-native';
import {Image} from 'expo-image';

type Props = {
    onSelect:(image:ImageSourcePropType)=>void;
    onCloseModal:() => void;
};

/*export default function EmojiList({onSelect,onCloseModal}:Props){
    const [emojis] = useState([
        require('../assets/emojis/emoji1.png'),
        require('../assets/emojis/emoji2.png'),
        require('../assets/emojis/emoji3.png'),
        require('../assets/emojis/emoji4.png'),
        require('../assets/emojis/emoji5.png'),
        require('../assets/emojis/emoji6.png'),
    ]);
    return(
        <FlatList
*/