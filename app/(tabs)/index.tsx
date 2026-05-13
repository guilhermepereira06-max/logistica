import { Image } from 'expo-image';
import { Link } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const PlaceholderImage = require('@/assets/images/banner.png');

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.imageContainer}> 
          <Image source={PlaceholderImage} style={styles.image}/>
        </View>        
        <View style={styles.textWrapper}>
          <Text style={styles.mainTitle}>Logística Express</Text>
          <Text style={styles.description}>Sua carga, nossa tecnologia. Gerencie entregas, registre ocorrências e otimize seu tempo.</Text>
        </View>
        <View style={styles.instructionWrapper}>
          <Text style={styles.instructionTitle}>Central de Operações</Text>
          <Text style={styles.instructionText}>
            Selecione uma das opções abaixo para gerenciar seus fluxos, consultar o histórico de transportes ou obter informações detalhadas sobre a nossa plataforma de logística.
          </Text>
        </View>

        <View style={styles.navBar}>
          <Link href="/toDoList" asChild>
            <TouchableOpacity style={styles.navButton}><Text style={styles.navText}>Lista de entregas</Text></TouchableOpacity>
          </Link>
          <Link href="/about" asChild>
            <TouchableOpacity style={styles.navButton}><Text style={styles.navText}>Sobre a Empresa</Text></TouchableOpacity>
          </Link>
          <Link href="/painel" asChild>
            <TouchableOpacity style={styles.navButton}><Text style={styles.navText}>Painel de Controle</Text></TouchableOpacity>
          </Link>
          <Link href="/cep" asChild>
            <TouchableOpacity style={styles.navButton}><Text style={styles.navText}>Consulta de CEP</Text></TouchableOpacity>
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F4F4F9'},
  scrollContent: {flexGrow: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 40},
  textWrapper: {alignItems: 'center', paddingHorizontal: 25, marginBottom: 30},
  mainTitle: {fontSize: 32, fontWeight: '900', color: '#111111', letterSpacing: 0.5, textAlign: 'center'},
  description: {fontSize: 16, color: '#111111', textAlign: 'center', lineHeight: 24, marginTop: 10},
  instructionWrapper: {width: '100%', paddingHorizontal: 35, marginBottom: 25},
  imageContainer: {width: '100%',alignItems: 'center',justifyContent: 'center',marginVertical: 20,},
  image: {width: '80%',maxWidth: 800,aspectRatio: 16 / 9,borderRadius: 12,},
  instructionTitle: {fontSize: 18, fontWeight: '700', color: '#111111', marginBottom: 6, textAlign: 'center'},
  instructionText: {fontSize: 14, color: '#111111', textAlign: 'center', lineHeight: 20},
  navBar: {width: '100%', alignItems: 'center', gap: 15, paddingHorizontal: 30},
  navButton: {backgroundColor: '#ae0e0eff', paddingVertical: 18, paddingHorizontal: 30, borderRadius: 15, elevation: 4, width: '100%', maxWidth: 320},
  navText: {color: '#FFF', fontWeight: 'bold', fontSize: 16, textAlign: 'center', textTransform: 'uppercase'},
});