const { app, BrowserWindow, Tray, Menu, dialog, ipcMain } = require('electron')
const path = require('path')
const { access, constants } = require('fs')
const Store = require('electron-store')
const store = new Store()
const { spawn } = require('child_process')

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
})

app.on('window-all-closed', () => {
    app.quit()
})

ipcMain.handle('openFile', async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog()
    if (!canceled) {
        return filePaths[0]
    }
})

ipcMain.handle('setData', (_event, key, value) => {
    store.set(key, value)
})

ipcMain.handle('getData', (_event, key) => {
    return store.get(key)
})

ipcMain.handle('checkFile', (_event, fileName) => {
    let result
    access(fileName, constants.F_OK, (err) => {
        err ? result = false : result = true
    })
    return result
})

ipcMain.handle('runProcess', (_event, processPath) => {
    spawn(processPath)
})