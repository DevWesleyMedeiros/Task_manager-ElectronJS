export const packagerConfig = {
  icon: './assets/icon',
};
export const rebuildConfig = {};
export const makers = [{
  name: '@electron-forge/maker-squirrel',
  config: {
    name: 'gerenciador_tarefas',
  },
  }, {
  name: '@electron-forge/maker-zip',
  platforms: ['darwin'],
  }, {
  name: '@electron-forge/maker-deb',
  config: {},
  }, {
  name: '@electron-forge/maker-rpm',
  config: {},
}];

// Este arquivo é responsável por configurar o Electron Forge.
// Electron Forge é uma ferramenta que facilita a criação de aplicativos desktop usando Electron.