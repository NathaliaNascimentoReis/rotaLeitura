import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Adicionado

import RotaLeitura from '../../assets/rotaLeitura.png';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function EmptyBookShelf() {

    const navigation = useNavigation();

    return (
        <ScrollView>
            <View style={styles.container}>
                <Image source={RotaLeitura} style={styles.imagem} />

                <View style={styles.textos}>
                    <Text style={styles.titulo}>Sua estante está vazia</Text>
                    <Text style={styles.paragrafo}>
                        Adicione seus livros e comece sua jornada de leitura!
                    </Text>
                </View>

                <View style={styles.botaoDiv}>
                    <TouchableOpacity
                        style={styles.botao}
                        onPress={() => navigation.navigate('Create')}>
                        <Text style={styles.textoBotao}>Adicionar Livro</Text>
                        <MaterialIcons name="add" size={24} color="white" />
                    </TouchableOpacity>
                </View>
                <StatusBar style="auto" />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imagem: {
        width: 260,
        height: 260,
        resizeMode: 'contain',
    },
    textos: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 15,
    },
    titulo: {
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold',
    },
    paragrafo: {
        fontSize: 16,
        color: 'black',
        textAlign: 'center',
    },
    botaoDiv: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    botao: {
        backgroundColor: '#206C83',
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        flexDirection: 'row',
        gap: 10,
    },
    textoBotao: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
});
