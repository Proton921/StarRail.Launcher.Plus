/* eslint-disable no-unused-vars */
async function launchGame(){
    const gamePath = await window.electronAPI.openFile()
    window.electronAPI.writeData('GamePath.txt',gamePath)
}
