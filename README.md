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
🔗 [https://electronjs/](https://www.electronjs.org/pt/)

## Criar a pasta do projeto e entrar nela
```sh
mkdir gerenciador-tarefas
cd gerenciador-tarefas
```
```sh
npm init -y ... (inicializa o npm)
```
## Instalação de dependências typescrit electron e @types/node
```sh
npm install electron --save-dev typescript @types/node electron-builder
```
**Intala como devDependency**
[typescript] -> linguagem de programação
[@types/node] -> biblioteca de tipos para o Node.js usado no electron
[electron-builder] -> ferramenta para criar pacotes de instalação

**inicia o projeto do zero sem precisar dependência por dependência manualmente**
```sh
npx electron-forge init ... (instala dependências electron)
``` 
### O que esse comando👆 faz??
- Todas as dependências necessárias para o projeto
- Instala o eslint para um projeto electron
- compiler do electron
- Diretório padrão e demais pastas de github

### Comandos para iniciar o projeto
<p>"start": "electron-forge start"</p>

```package.json
npm start -> comando para iniciar o projeto
```
**iniciando o projeto e incluem todas as dependências necessárias.**

## Sugestão de Estrutura de Pastas
```sh
gerenciador-tarefas/
│── src/
│   ├── index.ts       # Código principal do Electron
│   ├── renderer.ts    # Código da interface
│   ├── index.html     # Página inicial
│   ├── style.css      # Estilos da interface
│── package.json       # Configuração do projeto
│── tsconfig.json      # Configuração do TypeScript
│── forge.config.js    # Configuração do Electron Forge
```
--- 
# Clone do projeto
```sh
git clone https://github.com/seu-usuario/gerenciador-tarefas.git
```

