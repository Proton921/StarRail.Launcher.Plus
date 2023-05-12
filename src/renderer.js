/* eslint-disable no-unused-vars */
async function launchGame() {
    console.log('Click launch-game button.')
    var readGamePath = await window.electronAPI.readData('GamePath.cfg')
    var gamePath = new String(readGamePath)
    console.log(`Game path:${gamePath} .`)
    if ((gamePath == '')||(!(window.electronAPI.isValid(gamePath)))) {
        console.log(`Game path is invalid,and it will be initialized.`)
        readGamePath = await window.electronAPI.openFile()
        gamePath = new String(readGamePath)
        console.log(`New game path:${gamePath} .`)
        window.electronAPI.writeData('GamePath.cfg',gamePath)
    }
    //To be continued.
}
