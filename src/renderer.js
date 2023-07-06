const api = window.electronAPI
const store = api.store

async function launchGame() {                                                       //单击“启动游戏”按钮时执行
    const promise = new Promise(async (resolve, reject) => {
        let gamePath = await store.get('gamePath')                                  //从main process获取游戏本体路径
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
            api.runProcess(value)                                                   //运行程序
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
    store.set('gamePath', newGamePath)                                              //写入路径数据
}
