api = window.electronAPI

async function launchGame() {
    let gamePath = api.getData('gamePath')
    if (gamePath == undefined) {
        alert('游戏路径尚未设置！')
        gamePath = initGamePath()
    }
    if (!(api.checkFile(gamePath))){
        alert('游戏路径无效！')
        gamePath = initGamePath()
    }

}

async function initGamePath(){
    let newGamePath = await api.openFile()
    api.setData('gamePath') = newGamePath
    return newGamePath
}