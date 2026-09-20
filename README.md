# 📚 RotaLeitura - Biblioteca Pessoal & Controle de Leitura

O **RotaLeitura** é uma aplicação mobile focada na organização de acervos pessoais e no acompanhamento da jornada de leitura dos usuários. O aplicativo permite cadastrar obras, categorizá-las, atualizar o status de leitura em tempo real e registrar impressões pessoais sobre cada livro.

---

## 👥 Integrantes do Projeto

* **Nathália Nascimento Reis**
* **Isabela Duetes**

---

## 🛠️ Descrição Técnica & Funcionalidades

A aplicação foi projetada com foco em experiência do usuário (UX/UI), utilizando uma paleta de cores acolhedora e navegação simples.

### 📱 Módulos e Fluxo de Telas

1. **Cadastro de Usuário (`Cadastro`)**
   * Criação de perfil com os campos: *Nome completo*, *Nome de usuário*, *Telefone* e *E-mail*.
   * Validação de formulário para acesso à plataforma.

2. **Página Inicial (`Home`)**
   * **Estado Vazio (`Página Inicial Vazia`):** Exibe uma ilustração com mensagem motivacional (*"Sua estante está vazia. Adicione seus livros e comece sua jornada de leitura"*) e botão de ação rápida para cadastrar o primeiro livro.
   * **Estado com Livros (`Página Inicial`):** Listagem de obras adicionadas com exibição de miniaturas de capa, título, autor, status atual e atalho direto para edição.

3. **Cadastro de Obras (`Criar Livro`)**
   * Inclusão de imagem de capa do livro (via galeria ou câmera).
   * Preenchimento de metadados:
     * *Título do livro*
     * *Autor*
     * *Categoria* (ex: Romance, Ficção, Biografia)
     * *Status de leitura* (ex: *Lendo*, *Quero Ler*, *Lido*)
     * *Data de início* (Opcional)
     * *Notas/Resenha* (Opcional)

4. **Detalhes e Edição (`Tela de Detalhes / Editar Livro`)**
   * Atualização de todas as informações da obra.
   * Modificação dinâmica de status de leitura e inclusão/edição de anotações.
   * Opção de exclusão permanente da obra da biblioteca.

---

## 🚀 Tecnologias

* **Front-end Mobile:** React Native (com Expo)
* **Linguagem:** JavaScript

---

## ⚙️ Instruções de Execução

Siga os passos abaixo para executar o projeto em ambiente de desenvolvimento local:

### 📋 Pré-requisitos

* **Node.js** (versão 18 ou superior)
* **npm** instalado
* **Expo Go** instalado no dispositivo móvel (Android/iOS) ou um emulador configurado (Android Studio / Xcode).

### 🔧 Passo a Passo

1. **Clonar o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/rota-leitura.git
   cd rota-leitura
   ```

2. **Instalar as dependências:**
   ```bash
   npm install
   ```

3. **Iniciar o servidor de desenvolvimento:**
   ```bash
   npx expo start ou npm start
   ```

4. **Executar na aplicação:**
   * **Dispositivo Físico:** Abra o aplicativo **Expo Go** e escaneie o código QR exibido no terminal/navegador.
   * **Emulador Android:** Pressione a tecla `a` no terminal.
   * **Simulador iOS:** Pressione a tecla `i` no terminal.

---

## 🎨 Protótipo e Design

O design da interface segue uma temática tropical e relaxante, priorizando a legibilidade das informações e a facilidade no registro de hábitos de leitura.
