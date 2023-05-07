/* eslint-disable no-unused-vars */
async function launchGame() {
    let gamePath
    gamePath = window.electronAPI.readData('GamePath.cfg')
    if (!(window.electronAPI.isValid(gamePath))) {
        initGamePath()
        return
    }
    //To be continued.
}
async function initGamePath() {
    initUserDataDir()
    const gamePath = await window.electronAPI.openFile()
    window.electronAPI.writeData('GamePath.cfg', gamePath)
}
async function initUserDataDir() {
    if (!(window.electronAPI.isValid(window.electronAPI.userDataPath()))) {
        window.electronAPI.createUserDataDir()
    }
}