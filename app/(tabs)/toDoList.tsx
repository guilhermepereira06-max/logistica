import React from 'react';
import {View,Text,TextInput,Button,FlatList,TouchableOpacity,StyleSheet,ScrollView} from 'react-native';
import { useTarefas } from '@/hooks/useTarefas';

export default function App(){
    const { tarefas, novaTarefa, setNovaTarefa, adicionarTarefa, removerTarefa} = useTarefas();

    return(
        <View style={styles.container}>
            <Text style={styles.titulo}>Lista de Entregas</Text>
            <View style={styles.inputContainer}>
                <TextInput 
                    style={styles.input}
                    placeholder="Digite o Endereço de Entrega"
                    value={novaTarefa}
                    onChangeText={setNovaTarefa}
                />
                <Button title="Adicionar Entrega" color="#ce1313" onPress={adicionarTarefa} />
            </View>
            <FlatList
                data={tarefas}
                keyExtractor={(item) => item.id}
                renderItem={({item}) =>(
                    <View style={styles.tarefaContainer}>
                        <Text style={styles.tarefaTexto}>{item.texto}</Text>
                        <TouchableOpacity onPress={() => removerTarefa(item.id)}>
                            <Text style={styles.remover}>X</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    button:{fontSize:20,textDecorationLine:'underline',color:'#fff',backgroundColor:'#000000ff',padding:10,borderRadius:5},
    container:{flex:1,padding:20,backgroundColor:'#f4f4f4'},
    titulo:{fontSize:24,fontWeight:'bold',textAlign:'center',marginBottom:20},
    inputContainer:{flexDirection:'row', marginBottom:20, alignItems:'center'},
    input:{flex:1,borderWidth:1,borderColor:'#ccc',padding:10,borderRadius:8,marginRight:10, backgroundColor:'#fff'},
    tarefaContainer:{flexDirection:'row',justifyContent:'space-between',backgroundColor:'#fff',padding:15,
        marginBottom:5,borderRadius:5,shadowColor:'#000',shadowOpacity:0.1,shadowRadius:3,elevation:2},
    tarefaTexto:{fontSize:16},
    remover:{fontSize:18,color:'red'},
})
