const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  openFile: () => ipcRenderer.invoke('openFile'),
  setData: (key, value) => ipcRenderer.invoke('setData', JSON.stringify(key), JSON.stringify(value)),
  getData: (key) => ipcRenderer.invoke('getData', JSON.stringify(key)),
  checkFile: (fileName) => ipcRenderer.invoke('checkFile', JSON.stringify(fileName)),
  runProcess: (processPath) => { ipcRenderer.invoke('runProcess', JSON.stringify(processPath)) }
})