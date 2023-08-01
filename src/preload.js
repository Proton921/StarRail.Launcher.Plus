const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  openFile: () => ipcRenderer.invoke('openFile'),
  checkFile: (fileName) => ipcRenderer.invoke('checkFile', fileName),
  execCmd: (cmd) => ipcRenderer.send('execCmd', cmd),
  execFile: (file) => ipcRenderer.send('execFile', file),
  store: {
    get(key) {
      return ipcRenderer.invoke('getData', key)
    },
    set(property, val) {
      ipcRenderer.send('setData', property, val)
    },
  },
})