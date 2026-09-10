import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@rotaleitura: books';

export async function getMissions() {
    try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);

        if (jsonValue !== null) {
            return JSON.parse(jsonValue);
        }

        return [];
    } catch (error) {
        console.error('Erro ao ler informações do AsyncStorage:', error);

        throw new Error('Não foi possível carregar as informações salvas.');
    }
}

export async function saveMissions(missions) {
    try {
        const jsonValue = JSON.stringify(missions);

        await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    } catch (error) {
        console.error('Erro ao salvar informações no AsyncStorage:', error);

        throw new Error('Não foi possível salvar as alterações no armazenamento.');
    }
}

export async function clearAllMissions() {
    try {
        await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        console.error('Erro ao limpar informações no AsyncStorage:', error);

        throw new Error('Não foi possível limpar o armazenamento.');
    }
}
