import React from 'react';
import {View,Text,TextInput,Button,FlatList,TouchableOpacity,StyleSheet} from 'react-native';
import { useTarefas } from '../../hooks/useTarefas';

export default function App(){
    const { tarefas, novaTarefa, setNovaTarefa, adicionarTarefa, removerTarefa} = useTarefas();

    return(
        <View style={styles.container}>
            <Text style={styles.titulo}>Lista de Tarefas</Text>
            <View style={styles.input}>
                <TextInput style={styles.input}
                placeholder="Digite uma tarefa..."
                value={novaTarefa}
                onChangeText={setNovaTarefa}/>
                <Button title="Adicionar" onPress={adicionarTarefa}/>

            </View>
        </View>
    );
}
