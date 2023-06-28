const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  openFile: () => ipcRenderer.invoke('openFile'),
  setData:(key, value) => ipcRenderer.send('setData', key, value),
  getData:(key)=>ipcRenderer.invoke('getData',key)
})