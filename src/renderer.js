/* eslint-disable no-unused-vars */
async function launchGame() {
    console.log('Click launch-game button.')
    if (!(window.electronAPI.hasData('gamePath'))){
        initGamePath()
    }
    let gamePath = JSON.stringify(window.electronAPI.getData('gamePath'))
    if (!(window.electronAPI.hasFile('gamePath'))){
        initGamePath()
    }

}
async function initGamePath() {
    console.log(`Game path is invalid, and it will be initialized.`)
    let gamePath = JSON.stringify(await window.electronAPI.openFile())
    console.log(`New game path:${gamePath} .`)
    window.electronAPI.setData('gamePath',gamePath)
}
