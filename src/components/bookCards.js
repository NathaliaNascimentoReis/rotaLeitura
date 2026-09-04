import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function BookCards() {
    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Meus Livros</Text>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titulo: {
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold',
    },
});
