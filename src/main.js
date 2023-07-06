const { app, BrowserWindow, Tray, Menu, dialog, ipcMain } = require('electron')
const path = require('path')
const { access, constants } = require('fs')
const { spawn } = require('child_process')
const Store = require('electron-store')
const store = new Store()

if (require('electron-squirrel-startup')) app.quit()

function createWindow() {
    const mainWindow = new BrowserWindow({
        show: false,
        resizable: false,
        width: 1200,
        height: 675,
        backgroundColor: '#161619',
        icon: path.join(__dirname, '/resources/images/icons/icon-64.ico'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeItergration: true,
            contextIsolation: true
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

ipcMain.handle('checkFile', (_event, filePath) => {
    let result
    let newFilePath = String(decodeURIComponent(filePath))
    access(newFilePath, constants.F_OK, (err) => {
        err ? result = false : result = true
    })
    return result
})

ipcMain.on('runProcess', (_event, processPath) => {
    let newProcessPath = String(decodeURIComponent(processPath))
    spawn(newProcessPath)
})

ipcMain.handle('getData', (_event, val) => {
    return store.get(val)
})

ipcMain.on('setData', async (_event, key, val) => {
    store.set(key, val)
})