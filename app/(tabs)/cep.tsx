import{ useState } from 'react';
import{Button,StyleSheet,Text,TextInput,Dimensions,View} from 'react-native';
import { Image } from 'expo-image';

interface Endereco{
    logradouro:string;
    bairro:string;
    localidade:string;
    uf:string;
}

export default function BuscaCEP(){
    const [cep,setCep] = useState<string>('');
    const [endereco , setEndereco] = useState<Endereco>({
        logradouro:'',
        bairro:'',
        localidade:'',
        uf:'',
    });
    async function buscarCEP() {
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const dados: Endereco = await response.json();
        setEndereco(dados);
    } catch (error) {
        console.error('Erro ao buscar CEP:', error);
    }

}
const PlaceholderImage1 = require('@/assets/images/bannerCep.png');

return(
    <View style={styles.container}>
        <View style={styles.imageContainer}>
             <Image source={PlaceholderImage1} style={styles.image}/>
        </View>
        <Text>Consulte seu CEP</Text>

        <TextInput
            style={styles.textinput}
            placeholder="Digite o CEP"
            onChangeText={setCep}
            value={cep}
            keyboardType="numeric"
        />
        <Text>{cep}</Text>
        <Button title="Buscar" onPress={buscarCEP} />

        {endereco.logradouro !== '' && (
            <View style={styles.result}>
                <Text>Logradouro: {endereco.logradouro}</Text>
                <Text>Bairro: {endereco.bairro}</Text>
                <Text>Localidade: {endereco.localidade}</Text>
                <Text>UF: {endereco.uf}</Text>
            </View>
        )}
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        alignItems:'center',
        justifyContent:'center',
        padding:16,
    },
    textinput:{
        width:'80%',
        borderWidth:1,
        borderColor:'gray',
        padding:8,
        marginVertical:10,
    },
    result:{
        marginTop:20,
        padding:16,
        borderWidth:1,
        borderColor:'gray',
        borderRadius:8,
    },
    imageContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    maxHeight: 400,            
    },
    image: {
        width: '90%',
        maxWidth: 700,             
        aspectRatio: 16 / 9,       
        borderRadius: 12,
        backgroundColor: '#fff', 
        }, 
});