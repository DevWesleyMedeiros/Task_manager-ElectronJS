# 🚀 Todolist - ElectronJS + TypeScript  

Este é um **projeto básico criado para fins educacionais** e prática com o **ElectronJS** e **TypeScript**.  
O objetivo principal é aprimorar habilidades na configuração de um ambiente de desenvolvimento e no uso dessas tecnologias para criar aplicações desktop.

---

## 📌 Sobre o Projeto  

Este projeto é um **Gerenciador de Tarefas (To-Do List)** simples, onde o usuário pode:  
✅ **Adicionar tarefas**  
✅ **Excluir tarefas**  
✅ **Marcar tarefas como concluídas**  
✅ **Salvar os dados localmente**  

A aplicação foi construída utilizando **ElectronJS** para a interface desktop e **TypeScript** para um código mais seguro e estruturado.

---

## 🛠️ Tecnologias Utilizadas  
As principais tecnologias usadas no projeto são:  
- **[ElectronJS](https://www.electronjs.org/)** → Criar aplicações desktop usando HTML, CSS e JavaScript.  
- **[TypeScript](https://www.typescriptlang.org/)** → Fornece tipagem estática para o JavaScript.  
- **[Node.js](https://nodejs.org/)** → Ambiente de execução do JavaScript no servidor.  
- **[Electron Forge]** → Facilita a criação e distribuição do ElectronJS.  

---

# 🏗️ Configuração do Ambiente e Instalação  

### 📌 1️⃣ Instalando o Node.js  
Antes de começar, é necessário ter o **Node.js** instalado.  
Baixe e instale a versão mais recente em:  
🔗 [https://nodejs.org/](https://nodejs.org/)  

# Criar a pasta do projeto e entrar nela
```sh
mkdir gerenciador-tarefas
cd gerenciador-tarefas
```
# Inicializar o projeto Node.js
```sh
npm init -y
```
# Instalar Electron e dependências
```sh
npm install --save-dev electron typescript @types/node electron-builder electron-reload
```
**@types/node** -> Adiciona as definições de tipos do Node.js para o TypeScript.
**electron-builder** -> Ferramenta para criar pacotes de instalação

# Adicionar Electron Forge
npx electron-forge import

Para verificar se a instalação foi bem-sucedida, execute:  
```sh
node -v
npm -v
```
# Inicializar o projeto com Electron Forge
```sh
npx electron-forge init 
```
**iniciando o projeto e incluem todas as dependências necessárias.**

## Sugestão de Estrutura de Pastas
gerenciador-tarefas/
│── src/
│   ├── index.ts       # Código principal do Electron
│   ├── renderer.ts    # Código da interface
│   ├── index.html     # Página inicial
│   ├── style.css      # Estilos da interface
│── package.json       # Configuração do projeto
│── tsconfig.json      # Configuração do TypeScript
│── forge.config.js    # Configuração do Electron Forge
