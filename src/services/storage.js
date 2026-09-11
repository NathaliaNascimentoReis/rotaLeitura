import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@rotaleitura:books';

// READ
export const getBooks = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (error) {
        console.error('Erro ao ler os dados do AsyncStorage:', error);
        return [];
    }
};

// READ por ID
export const getBookById = async (id) => {
    try {
        const books = await getBooks();
        return books.find((item) => item.id === id) || null;
    } catch (error) {
        console.error('Erro ao buscar livro por ID:', error);
        return null;
    }
};

// CREATE
export const saveBook = async (newBook) => {
    try {
        const currentBooks = await getBooks();

        const itemToSave = {
            id: newBook.id || Date.now().toString(),
            createdAt: new Date().toISOString(),
            ...newBook,
        };

        const updatedList = [...currentBooks, itemToSave];
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));

        return itemToSave;
    } catch (error) {
        console.error('Erro ao salvar no AsyncStorage:', error);
        throw error;
    }
};

// UPDATE

export const updateBook = async (updatedBook) => {
    try {
        const currentBooks = await getBooks();

        const updatedList = currentBooks.map((item) =>
            item.id === updatedBook.id ? { ...item, ...updatedBook } : item,
        );

        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
        return updatedBook;
    } catch (error) {
        console.error('Erro ao atualizar no AsyncStorage:', error);
        throw error;
    }
};

// DELETE
export const deleteBook = async (id) => {
    try {
        const currentBooks = await getBooks();
        const updatedList = currentBooks.filter((item) => item.id !== id);

        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
        return true;
    } catch (error) {
        console.error('Erro ao remover do AsyncStorage:', error);
        throw error;
    }
};

// Apagar tudo
export const clearStorage = async () => {
    try {
        await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        console.error('Erro ao limpar storage:', error);
    }
};

// Evita que o app quebre se alguma tela antiga ainda importar "getMissions" ou "saveMissions"
export const getMissions = getBooks;
export const saveMissions = async (list) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list));
};
export const clearAllMissions = clearStorage;
