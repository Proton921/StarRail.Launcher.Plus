const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  openFile: () => ipcRenderer.invoke('openFile'),
  checkFile: (fileName) => ipcRenderer.invoke('checkFile', encodeURIComponent(JSON.stringify(fileName))),
  runProcess: (processPath) => ipcRenderer.send('runProcess', encodeURIComponent(JSON.stringify(processPath))),
  store: {
    get(key) {
      return ipcRenderer.invoke('getData', key)
    },
    set(property, val) {
      ipcRenderer.send('setData', property, val)
    },
  },
})