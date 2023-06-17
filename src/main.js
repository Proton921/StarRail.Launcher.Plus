const { app, BrowserWindow, Tray, Menu, dialog, ipcMain } = require('electron')
const path = require('path')
const { access, constants } = require('fs')
const Store = require('electron-store')
const store = new Store()

function createWindow() {
    const mainWindow = new BrowserWindow({
        show: false,
        resizable: false,
        width: 800,
        height: 600,
        backgroundColor: '#161619',
        icon: path.join(__dirname, '/resources/images/icons/icon-64.ico'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeItergration: true
        }
    })
    mainWindow.loadFile(path.join(__dirname, 'index.html'))
    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    })
}
function createTray() {  //托盘
    const tray = new Tray(path.join(__dirname, '/resources/images/icons/icon-64.ico'))
    tray.setToolTip('StarRail.Launcher.Plus')
    tray.setTitle('StarRail.Launcher.Plus')

    tray.on('right-click', () => {
        const template = [
            {
                label: '退出',
                click: () => {
                    app.quit()
                }
            },
        ]
        const menuConfig = Menu.buildFromTemplate(template)
        tray.popUpContextMenu(menuConfig)
    })
}
app.on("ready", () => {
    createWindow()
    createTray()

    ipcMain.handle('dialog:openFile', handleFileOpen)
    // eslint-disable-next-line no-unused-vars
    ipcMain.handle('output:getData', async (_event, dataName) => {
        return result = getData(dataName)
    })
    // eslint-disable-next-line no-unused-vars
    ipcMain.handle('input:setData', async (_event, dataName, dataContent) => {
        setData(dataName, dataContent)
    })
    // eslint-disable-next-line no-unused-vars
    ipcMain.handle('check:hasFile', async (_event, filePath) => {
        return hasFile(filePath)
    })
    // eslint-disable-next-line no-unused-vars
    ipcMain.handle('check:hasData', async (_event, dataName) => {
        return hasData(dataName)
    })
})
app.on('window-all-closed', () => {
    app.quit()
})

function getData(key) { //写入数据
    key = JSON.stringify(key)
    const value = store.get(key)
    console.log(`Get data: ${key}:${value} .`)
    return value
}

function setData(key, value) { //读取数据
    key = JSON.stringify(key)
    value = JSON.stringify(value)
    store.set(key, value)
    console.log(`Set data: ${key}:${value}`)
}

function hasData(key) { //检测数据是否存在
    key = JSON.stringify(key)
    return store.has(key)
}

function hasFile(filePath) { //判断文件是否存在
    if (filePath == '') {
        return false
    }
    let result = false
    filePath = JSON.stringify(filePath)
    access(filePath, constants.F_OK, (err) => {
        err ? result = false : result = true
    })
    return result
}

async function handleFileOpen() {  //选取文件
    const { canceled, filePaths } = await dialog.showOpenDialog()
    console.log(`Select file: ${filePaths[0]}`)
    if (canceled) {
        return
    } else {
        return filePaths[0]
    }
}
