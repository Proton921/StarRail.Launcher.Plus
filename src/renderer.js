/* eslint-disable no-unused-vars */
async function launchGame() {
    console.log('Click launch-game button.')
    let gamePath = window.electronAPI.ipcRenderer.getStoreValue('gamePath')
    console.log(`Game path: ${gamePath} .`)
    if (!(window.electronAPI.ipcRenderer.isValid(gamePath))) {
        console.log(`Game path is invalid,and it will be initialized.`)
        gamePath = window.electronAPI.ipcRenderer.openFile()
        console.log(`New game path: ${gamePath} .`)
        window.electronAPI.ipcRenderer.setStoreValue('gamePath',gamePath)
    }

}