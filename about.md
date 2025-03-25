# Comando para iniciar um projeto electron:

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
--- 

## Para fins de estudo, vamos estudar algumas tags, propriedades e atributos do HTML novos que eu aprendi e que podem ser usadas em projetos futuros.

| Nome: | Tipo: | Descrição: |
|-------|-------|------------|
| http-equiv="X-UA-Compatible" | meta tag SEO | configuração de compatibilidade com o IE |
| description | meta tag SEO| descrição do site |
| keyword | meta tag SEO | palavras chave do site |
| author | meta tag SEO | autor do site |
| Aplication-name | meta tag SEO | nome do aplicativo |
| aria-describedby | atributo de acessibilidade | descreve o elemento |
| aria-labelledby | atributo de acessibilidade | rotula o elemento |
| aria-label | atributo de acessibilidade | rotula o elemento |
| arial-live | atributo de acessibilidade | descreve o elemento |
| dialog | elemento semântico | representa uma caixa de diálogo ou uma janela interativa |

--- 
## Comandos CSS3 novos que aprendi e vamos ter de usar em projetos futuros

| Nome: | Tipo: | Descrição: |
|-------|-------|------------|
| outline-offset | propriedade CSS | define o deslocamento do contorno do elemento |
| clip-rect | propriedade CSS | define a área de recorte do elemento |