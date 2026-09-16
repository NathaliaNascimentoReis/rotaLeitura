import React, { useState, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { getMissions } from '../services/storage.js';

export default function BookCards() {
  const [livros, setLivros] = useState([]);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      buscarLivros();
    }, [])
  );

  const buscarLivros = async () => {
    try {
      const dados = await getMissions();
      setLivros(dados);
    } catch (error) {
      console.error('Erro ao buscar livros:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text style={styles.titulo}>Meus Livros</Text>

        {livros.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="book-outline" size={42} color="#aaa" />
            <Text style={styles.emptyText}>Nenhum livro cadastrado ainda.</Text>
          </View>
        ) : (
          <View style={styles.listContainer}>
            {livros.map((livro) => (
              <View key={livro.id} style={styles.itemContainer}>
                {/* CAPA DO LIVRO */}
                {livro.capa ? (
                  <Image source={{ uri: livro.capa }} style={styles.capaImage} />
                ) : (
                  <View style={styles.capaPlaceholder}>
                    <Ionicons name="book-outline" size={32} color="#207D91" />
                  </View>
                )}

                <View style={styles.cardInfo}>
                  <View style={styles.infoTextContainer}>
                    <Text style={styles.cardTitulo} numberOfLines={2}>
                      {livro.titulo}
                    </Text>

                    <Text style={styles.cardAutor} numberOfLines={1}>
                      {livro.autor}
                    </Text>

                    <View style={styles.statusBadge}>
                      <Text style={styles.statusText}>{livro.status}</Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => navigation.navigate('Edit', { livroId: livro.id })}
                  >
                    <Ionicons name="pencil-outline" size={20} color="#222" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('Create')}
          activeOpacity={0.8}
        >
          <Text style={styles.addButtonText}>Adicionar livro</Text>
          <Ionicons name="add" size={22} color="#FFF" style={{ marginLeft: 4 }} />
        </TouchableOpacity>

        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
  },
  titulo: {
    fontSize: 20,
    color: '#000000',
    fontWeight: '700',
    marginBottom: 16,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    gap: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#888',
  },
  listContainer: {
    width: '100%',
  },
  itemContainer: {
    flexDirection: 'row',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E6DCCF',
    alignItems: 'flex-start',
  },
  capaImage: {
    width: 95,
    height: 140,
    borderRadius: 12,
  },
  capaPlaceholder: {
    width: 95,
    height: 140,
    borderRadius: 12,
    backgroundColor: '#F3DFCB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardInfo: {
    flex: 1,
    marginLeft: 16,
    height: 140,
    justifyContent: 'space-between',
  },
  infoTextContainer: {
    flex: 1,
  },
  cardTitulo: {
    fontSize: 17,
    fontWeight: '700',
    color: '#5C3119',
    marginBottom: 4,
  },
  cardAutor: {
    fontSize: 13,
    color: '#9B7453',
    fontWeight: '500',
    marginBottom: 12,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#207D91',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  editButton: {
    alignSelf: 'flex-end',
    padding: 4,
  },
  addButton: {
    backgroundColor: '#207D91',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 30,
    marginTop: 28,
    marginBottom: 20,
    alignSelf: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
