import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  Modal,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { getMissions, saveMissions } from '../services/storage.js';

export default function CreateScreen({ navigation }) {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [categoria, setCategoria] = useState('');
  const [status, setStatus] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [notas, setNotas] = useState('');
  const [capa, setCapa] = useState(null);

  const [modalStatus, setModalStatus] = useState(false);

  const escolherCapa = async () => {
    const permissao =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissao.granted) {
      Alert.alert(
        'Permissão necessária',
        'Precisamos de acesso à galeria para selecionar a capa.'
      );
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [2, 3],
      quality: 1,
    });

    if (!resultado.canceled) {
      setCapa(resultado.assets[0].uri);
    }
  };

  const salvarLivro = async () => {
    if (!titulo.trim()) {
      Alert.alert(
        'Atenção',
        'Digite o título do livro.'
      );
      return;
    }

    if (!autor.trim()) {
      Alert.alert(
        'Atenção',
        'Digite o autor do livro.'
      );
      return;
    }

    try {
      // Busca os livros que já estão salvos
      const livrosExistentes = await getMissions();

      // Cria o novo livro
      const novoLivro = {
        id: Date.now().toString(),
        titulo: titulo.trim(),
        autor: autor.trim(),
        categoria: categoria.trim(),
        status: status || 'Quero ler',
        dataInicio: dataInicio.trim(),
        notas: notas.trim(),
        capa: capa,
      };

      // Adiciona o novo livro aos livros existentes
      const livrosAtualizados = [
        ...livrosExistentes,
        novoLivro,
      ];

      // Salva tudo novamente
      await saveMissions(livrosAtualizados);

      console.log(
        'Livro salvo com sucesso:',
        novoLivro
      );

      Alert.alert(
        'Livro salvo! 📚',
        'O livro foi adicionado à sua biblioteca.',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );

    } catch (error) {
      console.error(
        'Erro ao salvar livro:',
        error
      );

      Alert.alert(
        'Erro',
        'Não foi possível salvar o livro.'
      );
    }
  };

return (
  <View style={styles.container}>
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scroll}
    >

      {/* CABEÇALHO */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="arrow-back"
            size={25}
            color="#222"
          />
        </TouchableOpacity>

        <View style={styles.headerText}>
          <Text style={styles.title}>
            Adicionar Livro
          </Text>

          <Text style={styles.subtitle}>
            Preencha os dados do livro
          </Text>
        </View>

        <View style={styles.headerSpace} />
      </View>

      {/* CAPA */}
      <TouchableOpacity
        style={styles.coverBox}
        onPress={escolherCapa}
        activeOpacity={0.8}
      >
        {capa ? (
          <>
            <Image
              source={{ uri: capa }}
              style={styles.coverImage}
            />

            <View style={styles.changeCover}>
              <Ionicons
                name="camera-outline"
                size={17}
                color="#fff"
              />

              <Text style={styles.changeCoverText}>
                Alterar capa
              </Text>
            </View>
          </>
        ) : (
          <>
            <View style={styles.cameraCircle}>
              <Ionicons
                name="camera-outline"
                size={28}
                color="#207D91"
              />
            </View>

            <Text style={styles.coverTitle}>
              Adicionar capa
            </Text>

            <Text style={styles.coverSubtitle}>
              Toque para escolher uma imagem
            </Text>
          </>
        )}
      </TouchableOpacity>

      {/* TÍTULO DA SEÇÃO */}
      <View style={styles.sectionHeader}>
        <View style={styles.sectionIcon}>
          <Ionicons
            name="book-outline"
            size={18}
            color="#207D91"
          />
        </View>

        <View>
          <Text style={styles.sectionTitle}>
            Informações do livro
          </Text>

          <Text style={styles.sectionSubtitle}>
            Conte um pouco sobre sua leitura
          </Text>
        </View>
      </View>

      {/* TÍTULO */}
      <View style={styles.fieldContainer}>
        <View style={styles.labelContainer}>
          <Ionicons
            name="book-outline"
            size={16}
            color="#207D91"
          />

          <Text style={styles.label}>
            Título do livro
          </Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Digite o título"
          placeholderTextColor="#aaa"
          value={titulo}
          onChangeText={setTitulo}
        />
      </View>

      {/* AUTOR */}
      <View style={styles.fieldContainer}>
        <View style={styles.labelContainer}>
          <Ionicons
            name="person-outline"
            size={16}
            color="#207D91"
          />

          <Text style={styles.label}>
            Autor
          </Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Digite o nome do autor"
          placeholderTextColor="#aaa"
          value={autor}
          onChangeText={setAutor}
        />
      </View>

      {/* CATEGORIA */}
      <View style={styles.fieldContainer}>
        <View style={styles.labelContainer}>
          <Ionicons
            name="pricetag-outline"
            size={16}
            color="#207D91"
          />

          <Text style={styles.label}>
            Categoria
          </Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Ex: Romance, Ficção..."
          placeholderTextColor="#aaa"
          value={categoria}
          onChangeText={setCategoria}
        />
      </View>

      {/* STATUS */}
      <View style={styles.fieldContainer}>
        <View style={styles.labelContainer}>
          <Ionicons
            name="time-outline"
            size={16}
            color="#207D91"
          />

          <Text style={styles.label}>
            Status de leitura
          </Text>
        </View>

        <TouchableOpacity
          style={styles.selectInput}
          onPress={() => setModalStatus(true)}
        >
          <View style={styles.selectLeft}>
            <Ionicons
              name={
                status === 'Concluído'
                  ? 'checkmark-circle-outline'
                  : status === 'Lendo'
                    ? 'book-outline'
                    : 'bookmark-outline'
              }
              size={19}
              color={status ? '#207D91' : '#aaa'}
            />

            <Text
              style={[
                styles.selectText,
                !status && styles.placeholder,
              ]}
            >
              {status || 'Selecione o status'}
            </Text>
          </View>

          <Ionicons
            name="chevron-down"
            size={18}
            color="#999"
          />
        </TouchableOpacity>
      </View>

      {/* DATA */}
      <View style={styles.fieldContainer}>
        <View style={styles.labelContainer}>
          <Ionicons
            name="calendar-outline"
            size={16}
            color="#207D91"
          />

          <Text style={styles.label}>
            Data de início
          </Text>

          <Text style={styles.optional}>
            opcional
          </Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="DD/MM/AAAA"
          placeholderTextColor="#aaa"
          value={dataInicio}
          onChangeText={setDataInicio}
        />
      </View>

      {/* NOTAS */}
      <View style={styles.fieldContainer}>
        <View style={styles.labelContainer}>
          <Ionicons
            name="create-outline"
            size={16}
            color="#207D91"
          />

          <Text style={styles.label}>
            Notas
          </Text>

          <Text style={styles.optional}>
            opcional
          </Text>
        </View>

        <TextInput
          style={[styles.input, styles.notesInput]}
          placeholder="Escreva suas impressões sobre o livro..."
          placeholderTextColor="#aaa"
          value={notas}
          onChangeText={setNotas}
          multiline
          textAlignVertical="top"
        />
      </View>

      {/* BOTÃO */}
      <TouchableOpacity
        style={styles.saveButton}
        onPress={salvarLivro}
        activeOpacity={0.8}
      >
        <Ionicons
          name="checkmark-circle-outline"
          size={20}
          color="#fff"
        />

        <Text style={styles.saveButtonText}>
          Salvar livro
        </Text>
      </TouchableOpacity>

    </ScrollView>

    {/* MODAL STATUS */}
    <Modal
      transparent
      visible={modalStatus}
      animationType="fade"
      onRequestClose={() => setModalStatus(false)}
    >
      <TouchableOpacity
        style={styles.modalBackground}
        activeOpacity={1}
        onPress={() => setModalStatus(false)}
      >
        <View style={styles.modalContainer}>

          <View style={styles.modalHeader}>
            <View style={styles.modalIcon}>
              <Ionicons
                name="book-outline"
                size={22}
                color="#207D91"
              />
            </View>

            <View>
              <Text style={styles.modalTitle}>
                Status de leitura
              </Text>

              <Text style={styles.modalSubtitle}>
                Como está sua leitura?
              </Text>
            </View>
          </View>

          {/* QUERO LER */}
          <TouchableOpacity
            style={styles.statusOption}
            onPress={() => {
              setStatus('Quero ler');
              setModalStatus(false);
            }}
          >
            <View style={styles.optionIcon}>
              <Ionicons
                name="bookmark-outline"
                size={21}
                color="#207D91"
              />
            </View>

            <View style={styles.optionTextContainer}>
              <Text style={styles.statusOptionText}>
                Quero ler
              </Text>

              <Text style={styles.optionDescription}>
                Adicionado à sua lista
              </Text>
            </View>
          </TouchableOpacity>

          {/* LENDO */}
          <TouchableOpacity
            style={styles.statusOption}
            onPress={() => {
              setStatus('Lendo');
              setModalStatus(false);
            }}
          >
            <View style={styles.optionIcon}>
              <Ionicons
                name="book-outline"
                size={21}
                color="#207D91"
              />
            </View>

            <View style={styles.optionTextContainer}>
              <Text style={styles.statusOptionText}>
                Lendo
              </Text>

              <Text style={styles.optionDescription}>
                Estou lendo agora
              </Text>
            </View>
          </TouchableOpacity>

          {/* CONCLUÍDO */}
          <TouchableOpacity
            style={styles.statusOption}
            onPress={() => {
              setStatus('Concluído');
              setModalStatus(false);
            }}
          >
            <View style={styles.optionIcon}>
              <Ionicons
                name="checkmark-circle-outline"
                size={21}
                color="#207D91"
              />
            </View>

            <View style={styles.optionTextContainer}>
              <Text style={styles.statusOptionText}>
                Concluído
              </Text>

              <Text style={styles.optionDescription}>
                Já terminei este livro
              </Text>
            </View>
          </TouchableOpacity>

        </View>
      </TouchableOpacity>
    </Modal>
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBF7EF',
  },

  scroll: {
    paddingHorizontal: 26,
    paddingTop: 48,
    paddingBottom: 40,
  },

  /* HEADER */

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#F3EBDD',
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerText: {
    flex: 1,
    alignItems: 'center',
  },

  headerSpace: {
    width: 42,
  },

  title: {
    fontSize: 19,
    fontWeight: '700',
    color: '#222',
  },

  subtitle: {
    fontSize: 11,
    color: '#888',
    marginTop: 3,
  },

  /* CAPA */

  coverBox: {
    height: 140,
    borderRadius: 20,
    backgroundColor: '#F3DFCB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 28,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#EED4BA',
  },

  coverImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  cameraCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#FAF1E7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },

  coverTitle: {
    color: '#207D91',
    fontSize: 13,
    fontWeight: '700',
  },

  coverSubtitle: {
    color: '#9B8877',
    fontSize: 10,
    marginTop: 3,
  },

  changeCover: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.55)',
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  changeCoverText: {
    color: '#fff',
    fontSize: 10,
  },

  /* SEÇÃO */

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  sectionIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#E6F1F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
  },

  sectionSubtitle: {
    fontSize: 10,
    color: '#999',
    marginTop: 2,
  },

  /* CAMPOS */

  fieldContainer: {
    marginBottom: 17,
  },

  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 7,
    gap: 6,
  },

  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#555',
  },

  optional: {
    fontSize: 9,
    color: '#aaa',
    marginLeft: 2,
  },

  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#DED7CE',
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 13,
    color: '#333',
    backgroundColor: '#FFFDF9',
  },

  notesInput: {
    height: 105,
    paddingTop: 14,
  },

  /* SELECT */

  selectInput: {
    height: 48,
    borderWidth: 1,
    borderColor: '#DED7CE',
    borderRadius: 12,
    paddingHorizontal: 14,
    backgroundColor: '#FFFDF9',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  selectLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },

  selectText: {
    fontSize: 13,
    color: '#333',
  },

  placeholder: {
    color: '#aaa',
  },

  /* BOTÃO */

  saveButton: {
    height: 50,
    borderRadius: 14,
    backgroundColor: '#207D91',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
    elevation: 2,
  },

  saveButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },

  /* MODAL */

  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(20, 25, 28, 0.45)',
    justifyContent: 'center',
    paddingHorizontal: 28,
  },

  modalContainer: {
    backgroundColor: '#FFFDF9',
    borderRadius: 20,
    padding: 20,
  },

  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },

  modalIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: '#E6F1F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 11,
  },

  modalTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },

  modalSubtitle: {
    fontSize: 10,
    color: '#999',
    marginTop: 2,
  },

  statusOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    borderTopWidth: 1,
    borderTopColor: '#F0EBE4',
  },

  optionIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#EAF2F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 11,
  },

  optionTextContainer: {
    flex: 1,
  },

  statusOptionText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },

  optionDescription: {
    fontSize: 10,
    color: '#999',
    marginTop: 2,
  },
});
