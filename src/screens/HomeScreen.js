import React, { useState, useCallback } from 'react';
import { View, Image, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import Logo from '../../assets/logo.png';
import BookCards from '../components/bookCards.js';
import EmptyBookShelf from '../components/emptyBookShelf.js';
import { getMissions } from '../services/storage.js';

export default function HomeScreen({ route, navigation }) {
    const [livros, setLivros] = useState([]);
    const [loading, setLoading] = useState(true);

    // Recarrega a lista toda vez que a tela Home entra em foco
    useFocusEffect(
        useCallback(() => {
            carregarLivros();
        }, [])
    );

    const carregarLivros = async () => {
        try {
            const dados = await getMissions();
            setLivros(dados);
        } catch (error) {
            console.error('Erro ao carregar livros:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.main}>
            <View style={styles.header}>
                <MaterialIcons name="menu" size={32} color="#6A3B21" />
                <Image source={Logo} style={styles.logo} />
                <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                    <MaterialIcons name="person" size={32} color="#6A3B21" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {loading ? (
                    <ActivityIndicator size="large" color="#6A3B21" style={styles.loader} />
                ) : livros.length > 0 ? (
                    <BookCards livros={livros} />
                ) : (
                    <EmptyBookShelf />
                )}
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
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    logo: {
        width: 200,
        height: 80,
        resizeMode: 'contain',
    },
    content: {
        padding: 16,
    },
    loader: {
        marginTop: 40,
    },
});
