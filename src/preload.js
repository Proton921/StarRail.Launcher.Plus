const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    getData: (outputName) => ipcRenderer.invoke('output:getData', outputName),
    setData: (inputName, inputContent) => ipcRenderer.invoke('input:setData', inputName, inputContent),
    openFile: () => ipcRenderer.invoke('dialog:openFile'),
    hasFile: (filePath) => ipcRenderer.invoke('check:hasFile', filePath),
    hasData: (key) => ipcRenderer.invoke('check:hasFile', key)
})