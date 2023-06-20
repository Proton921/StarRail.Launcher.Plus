const { contextBridge, ipcRenderer, IpcRendererEvent } = require('electron')

const electronHandler = {
    ipcRenderer: {
        setStoreValue: (key, value) => {
            ipcRenderer.send("setStore", key, value)
        },
        getStoreValue(key) {
            const resp = ipcRenderer.sendSync("getStore", key)
            return resp
        },
        openFile: () => ipcRenderer.invoke('openFile'),
        isValid: (filePath) => ipcRenderer.invoke('isValid', filePath),
    }
}

contextBridge.exposeInMainWorld('electronAPI', electronHandler)
