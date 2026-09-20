import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@rotaleitura:books";

// ==========================
// READ - buscar todos
// ==========================
export const getBooks = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);

    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error("Erro ao ler os dados do AsyncStorage:", error);

    return [];
  }
};

// ==========================
// READ - buscar por ID
// ==========================
export const getBookById = async (id) => {
  try {
    const books = await getBooks();

    return books.find((item) => String(item.id) === String(id)) || null;
  } catch (error) {
    console.error("Erro ao buscar livro por ID:", error);

    return null;
  }
};

// ==========================
// CREATE - criar livro
// ==========================
export const saveBook = async (newBook) => {
  try {
    const currentBooks = await getBooks();

    const itemToSave = {
      ...newBook,

      id: newBook.id || Date.now().toString(),

      createdAt: newBook.createdAt || new Date().toISOString(),
    };

    const updatedList = [...currentBooks, itemToSave];

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));

    return itemToSave;
  } catch (error) {
    console.error("Erro ao salvar no AsyncStorage:", error);

    throw error;
  }
};

// ==========================
// UPDATE - atualizar livro
// ==========================
export const updateBook = async (updatedBook) => {
  try {
    const currentBooks = await getBooks();

    const bookExists = currentBooks.some(
      (item) => String(item.id) === String(updatedBook.id),
    );

    if (!bookExists) {
      throw new Error("Livro não encontrado.");
    }

    const updatedList = currentBooks.map((item) =>
      String(item.id) === String(updatedBook.id)
        ? {
            ...item,
            ...updatedBook,
          }
        : item,
    );

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));

    const savedBook = updatedList.find(
      (item) => String(item.id) === String(updatedBook.id),
    );

    return savedBook;
  } catch (error) {
    console.error("Erro ao atualizar no AsyncStorage:", error);

    throw error;
  }
};

// ==========================
// DELETE - excluir livro
// ==========================
export const deleteBook = async (id) => {
  try {
    const currentBooks = await getBooks();

    console.log("ID recebido para excluir:", id);
    console.log("Livros antes da exclusão:", currentBooks);

    const livroExiste = currentBooks.some(
      (item) => String(item.id) === String(id),
    );

    if (!livroExiste) {
      throw new Error(`Livro com ID ${id} não encontrado.`);
    }

    const updatedList = currentBooks.filter(
      (item) => String(item.id) !== String(id),
    );

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));

    console.log("Livros depois da exclusão:", updatedList);

    return true;
  } catch (error) {
    console.error("Erro ao remover do AsyncStorage:", error);

    throw error;
  }
};

// ==========================
// DELETE - apagar tudo
// ==========================
export const clearStorage = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Erro ao limpar storage:", error);
  }
};

// Compatibilidade com código antigo
export const getMissions = getBooks;

export const saveMissions = async (list) => {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list));
};

export const clearAllMissions = clearStorage;
