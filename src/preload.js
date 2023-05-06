const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    readData: (outputName) => ipcRenderer.invoke('output:readData',outputName),
    writeData: (inputName,inputContent) => ipcRenderer.invoke('input:writeData',inputName,inputContent),
    openFile: () => ipcRenderer.invoke('dialog:openFile'),
    isValid:(filePath)=>ipcRenderer.invoke('check:isValid',filePath)
})