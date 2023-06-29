const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  openFile: () => ipcRenderer.invoke('openFile'),
  setData: (key, value) => ipcRenderer.sendSync('setData', JSON.stringify(key), JSON.stringify(value)),
  getData: (key) => ipcRenderer.invoke('getData', key),
  checkFile: (fileName) => ipcRenderer.invoke('checkFile', JSON.stringify(fileName))
})