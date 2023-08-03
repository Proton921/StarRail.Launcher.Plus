const api = window.electronAPI

const launchGameBtn = document.getElementById('launch-game-btn')
launchGameBtn.addEventListener('click', launchGame)
async function launchGame() {                                                       //单击“启动游戏”按钮时执行
    const promise = new Promise(async (resolve, reject) => {
        let gamePath = await api.store.get('gamePath')                                  //从main process获取游戏本体路径
        if (gamePath == undefined) {
            reject('游戏路径未设置！')
        }
        if (!(api.checkFile(gamePath))) {
            reject('游戏路径无效!')
        }
        resolve(gamePath)
    })
    promise
        .then((value) => {                                                          //路径有效
            api.execFile(value)                                                      //运行程序
        })
        .catch((err) => {                                                           //路径无效
            alert(err)                                                              //弹出报错窗口
            initGamePath()
        })

}
async function initGamePath() {                                                     //初始化游戏路径
    let newGamePath = await api.openFile()                                          //弹出打开文件窗口
    if (newGamePath == '') {                                                        //如果选择“Cancel”，直接退出函数体
        return false
    }
    api.store.set('gamePath', newGamePath)                                              //写入路径数据
}

const sideBar = {
    mys: document.getElementById('mys-icon'),
    wiki: document.getElementById('wiki-icon'),
    github: document.getElementById('github-icon'),
    settings: document.getElementById('settings-icon')
}
sideBar.mys.addEventListener('click', function () { api.execCmd('start https://www.miyoushe.com/sr') })
sideBar.wiki.addEventListener('click', function () { api.execCmd('start https://bbs.mihoyo.com/sr/wiki/') })
sideBar.github.addEventListener('click', function () { api.execCmd('start https://github.com/Proton921/StarRail.Launcher.Plus') })
sideBar.settings.addEventListener('click', function () { api.openSettings() })