import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import Logo from '../../assets/logo.png';
import bookCards from '../components/bookCards.js';
import emptyBookShelf from '../components/emptyBookShelf.js';

export default function HomeScreen({ route, navigation }) {
    return (
        <SafeAreaView style={styles.main}>
            <View style={styles.header}>
                <MaterialIcons name="menu" size={24} color="black" />
                <Image source={Logo} style={styles.logo} />
                <MaterialIcons name="person" size={24} color="black" />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <TouchableOpacity onPress={() => navigation.navigate('Create')}>
                    <Text>Adicionar Novo Livro</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Minha Biblioteca</Text>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#FDF8EE',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: '#fff',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    logo: {
        width: 100,
        height: 40,
        resizeMode: 'contain',
    },
    content: {
        padding: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
    },
});
