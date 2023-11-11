const { app, BrowserWindow, Tray, Menu, dialog, ipcMain } = require('electron')
const path = require('path')
const { access, constants } = require('fs')
const { exec, execFile } = require('child_process')
const Store = require('electron-store')
const store = new Store()

if (require('electron-squirrel-startup')) app.quit()

app.on("ready", () => {
    const mainWindow = new BrowserWindow({
        //titleBarStyle: 'hidden',
        show: false,
        resizable: false,
        width: 1280,
        height: 760,
        backgroundColor: '#111018',
        icon: path.join(__dirname, '../icons/icon-32.ico'),
        webPreferences: {
            preload: path.join(__dirname, './preload.js'),
            nodeItergration: true,
            contextIsolation: true
        }
    })
    mainWindow.loadFile(path.join(__dirname, '../renderer/index/index.html'))
    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    })

    const tray = new Tray(path.join(__dirname, '../icons/icon-32.ico'))
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

    ipcMain.on('closeWin', () => {
        app.quit()
    })

    ipcMain.on('minimizeWin', () => {
        mainWindow.minimize()
    })

    ipcMain.on('openSettings', () => {
        const settingsWindow = new BrowserWindow({
            //titleBarStyle: 'hidden',
            parent: mainWindow,
            backgroundColor: '#FFFFFF',
            show: false,
            resizable: false,
            width: 800,
            height: 450,
            icon: path.join(__dirname, '../icons/icon-64.ico')
        })
        settingsWindow.loadFile(path.join(__dirname, '../renderer/settings/settings.html'))
        settingsWindow.once('ready-to-show', () => {
            settingsWindow.show()
        })
    })
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
    access(filePath, constants.F_OK, (err) => {
        err ? result = false : result = true
    })
    return result
})

ipcMain.on('execCmd', (_event, cmd) => {
    console.log('Command: ', cmd)
    exec(cmd, [], (err, stdout, stderr) => {
        if (err) console.error(err)
        console.log('stdout:', stdout)
        console.log('stderr:', stderr, '\n')
    })
})

ipcMain.on('execFile', (_event, file) => {
    console.log('Exec file: ', file)
    execFile(file, [], (err, stdout, stderr) => {
        if (err) console.error(err)
        console.log('stdout:', stdout)
        console.log('stderr:', stderr, '\n')
    })
})

ipcMain.handle('getData', (_event, val) => {
    return store.get(val)
})

ipcMain.on('setData', async (_event, key, val) => {
    store.set(key, val)
})