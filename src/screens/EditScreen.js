import React, { useState } from "react";
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
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import { updateBook, deleteBook } from "../services/storage";

export default function EditBookScreen({ navigation, route }) {
  const livro = route?.params?.book || {};

  const [titulo, setTitulo] = useState(livro.titulo || "Leitura de verão");

  const [autor, setAutor] = useState(livro.autor || "Emily Henry");

  const [categoria, setCategoria] = useState(livro.categoria || "Romance");

  const [status, setStatus] = useState(livro.status || "Lendo");

  const [dataInicio, setDataInicio] = useState(
    livro.dataInicio || "04/09/2026",
  );

  const [notas, setNotas] = useState(
    livro.notas || "Muito bom o livro, estou gostando!",
  );

  const [capa, setCapa] = useState(livro.capa || null);

  const [modalStatus, setModalStatus] = useState(false);

  const escolherCapa = async () => {
    const permissao = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissao.granted) {
      Alert.alert(
        "Permissão necessária",
        "Precisamos de acesso à galeria para alterar a capa.",
      );
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [2, 3],
      quality: 1,
    });

    if (!resultado.canceled) {
      setCapa(resultado.assets[0].uri);
    }
  };
  const salvarAlteracoes = async () => {
    if (!titulo.trim() || !autor.trim()) {
      Alert.alert("Atenção", "Preencha o título e o autor.");

      return;
    }

    try {
      const livroAtualizado = {
        ...livro,

        titulo: titulo.trim(),
        autor: autor.trim(),
        categoria: categoria.trim(),
        status,
        dataInicio: dataInicio.trim(),
        notas: notas.trim(),
        capa,
      };

      await updateBook(livroAtualizado);

      Alert.alert("Pronto!", "Alterações salvas com sucesso.", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      console.error("Erro ao atualizar livro:", error);

      Alert.alert("Erro", "Não foi possível salvar as alterações.");
    }
  };

  const excluirLivro = () => {
    Alert.alert(
      "Excluir livro",
      `Tem certeza que deseja excluir "${livro.titulo}"?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },

        {
          text: "Excluir",
          style: "destructive",

          onPress: async () => {
            try {
              await deleteBook(livro.id);

              Alert.alert(
                "Livro excluído",
                "O livro foi removido da sua estante.",
                [
                  {
                    text: "OK",
                    onPress: () => navigation.goBack(),
                  },
                ],
              );
            } catch (error) {
              console.error("Erro ao excluir livro:", error);

              Alert.alert("Erro", "Não foi possível excluir o livro.");
            }
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* Cabeçalho */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={28} color="#222" />
          </TouchableOpacity>

          <View style={styles.headerText}>
            <Text style={styles.title}>Editar livro</Text>

            <Text style={styles.subtitle}>Atualize as informações</Text>
          </View>

          <View style={styles.headerSpace} />
        </View>

        {/* Área da capa */}
        <View style={styles.coverArea}>
          <TouchableOpacity
            onPress={escolherCapa}
            style={styles.coverContainer}
          >
            {capa ? (
              <Image source={{ uri: capa }} style={styles.cover} />
            ) : (
              <View style={styles.fakeCover}>
                <Text style={styles.fakeCoverSmall}>LEITURA DE</Text>

                <Text style={styles.fakeCoverTitle}>VERÃO</Text>

                <Text style={styles.fakeCoverAuthor}>EMILY HENRY</Text>
              </View>
            )}

            <View style={styles.cameraButton}>
              <Ionicons name="camera-outline" size={17} color="#16778D" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Título */}
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Título do livro</Text>

          <TextInput
            style={styles.input}
            value={titulo}
            onChangeText={setTitulo}
          />
        </View>

        {/* Autor */}
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Autor</Text>

          <TextInput
            style={styles.input}
            value={autor}
            onChangeText={setAutor}
          />
        </View>

        {/* Categoria */}
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Categoria</Text>

          <TextInput
            style={styles.input}
            value={categoria}
            onChangeText={setCategoria}
          />
        </View>

        {/* Status */}
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Status de leitura</Text>

          <TouchableOpacity
            style={styles.statusInput}
            onPress={() => setModalStatus(true)}
          >
            <Text style={styles.statusText}>{status}</Text>

            <Ionicons name="chevron-down" size={16} color="#888" />
          </TouchableOpacity>
        </View>

        {/* Data */}
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Data de início (opcional)</Text>

          <TextInput
            style={styles.input}
            value={dataInicio}
            onChangeText={setDataInicio}
          />
        </View>

        {/* Notas */}
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Notas (opcional)</Text>

          <TextInput
            style={[styles.input, styles.notesInput]}
            value={notas}
            onChangeText={setNotas}
            multiline
            textAlignVertical="top"
          />
        </View>

        {/* Botões */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.deleteButton} onPress={excluirLivro}>
            <Ionicons name="trash-outline" size={17} color="#A76531" />

            <Text style={styles.deleteButtonText}>Excluir livro</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={salvarAlteracoes}
          >
            <Text style={styles.saveButtonText}>Salvar alterações</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modal */}
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
            <Text style={styles.modalTitle}>Status de leitura</Text>

            {["Quero ler", "Lendo", "Concluído"].map((item) => (
              <TouchableOpacity
                key={item}
                style={styles.statusOption}
                onPress={() => {
                  setStatus(item);
                  setModalStatus(false);
                }}
              >
                <Text style={styles.statusOptionText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBF7EF",
  },

  scroll: {
    paddingHorizontal: 28,
    paddingTop: 55,
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  backButton: {
    width: 40,
    alignItems: "flex-start",
  },

  headerText: {
    flex: 1,
    alignItems: "center",
  },

  headerSpace: {
    width: 40,
  },

  title: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111",
  },

  subtitle: {
    fontSize: 12,
    color: "#777",
    marginTop: 2,
  },

  coverArea: {
    alignItems: "flex-start",
    marginBottom: 20,
  },

  coverContainer: {
    width: 90,
    height: 125,
    position: "relative",
  },

  cover: {
    width: 78,
    height: 115,
    borderRadius: 4,
    resizeMode: "cover",
  },

  fakeCover: {
    width: 78,
    height: 115,
    borderRadius: 4,
    backgroundColor: "#F3A500",
    padding: 7,
    justifyContent: "center",
  },

  fakeCoverSmall: {
    fontSize: 9,
    fontWeight: "700",
    color: "#fff",
  },

  fakeCoverTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: "#fff",
  },

  fakeCoverAuthor: {
    fontSize: 7,
    color: "#fff",
    marginTop: 15,
  },

  cameraButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },

  fieldContainer: {
    marginBottom: 8,
  },

  fieldLabel: {
    fontSize: 10,
    color: "#aaa",
    marginLeft: 14,
    marginBottom: -7,
    zIndex: 2,
    backgroundColor: "#FBF7EF",
    alignSelf: "flex-start",
    paddingHorizontal: 3,
  },

  input: {
    height: 44,
    borderWidth: 1,
    borderColor: "#DDD6CC",
    borderRadius: 9,
    paddingHorizontal: 14,
    fontSize: 13,
    color: "#444",
  },

  statusInput: {
    height: 44,
    borderWidth: 1,
    borderColor: "#DDD6CC",
    borderRadius: 9,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
  },

  statusText: {
    flex: 1,
    fontSize: 13,
    color: "#444",
  },

  notesInput: {
    height: 105,
    paddingTop: 14,
  },

  buttonsContainer: {
    flexDirection: "row",
    marginTop: 22,
    gap: 8,
  },

  deleteButton: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderColor: "#A76531",
    borderRadius: 13,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  deleteButtonText: {
    color: "#A76531",
    fontSize: 12,
    fontWeight: "600",
  },

  saveButton: {
    flex: 1.25,
    height: 44,
    borderRadius: 13,
    backgroundColor: "#207D91",
    justifyContent: "center",
    alignItems: "center",
  },

  saveButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },

  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    paddingHorizontal: 40,
  },

  modalContainer: {
    backgroundColor: "#FBF7EF",
    borderRadius: 16,
    padding: 20,
  },

  modalTitle: {
    fontSize: 17,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 15,
  },

  statusOption: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  statusOptionText: {
    fontSize: 14,
    textAlign: "center",
    color: "#333",
  },
});
