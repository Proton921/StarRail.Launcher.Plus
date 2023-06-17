const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    readData: (outputName) => ipcRenderer.invoke('output:readData', outputName),
    writeData: (inputName, inputContent) => ipcRenderer.invoke('input:writeData', inputName, inputContent),
    openFile: () => ipcRenderer.invoke('dialog:openFile'),
    hasFile: (filePath) => ipcRenderer.invoke('check:hasFile', filePath),
    hasData: (key) => ipcRenderer.invoke('check:hasFile', key)
})