const { app, BrowserWindow, Tray, Menu, dialog, ipcMain } = require('electron')
const path = require('path')
const fs = require('fs')

const userDataPath = path.join(app.getPath('userData'))

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
    ipcMain.handle('output:readData', async (event, dataName) => {
        const result = readData(dataName)
        return result
    })
    // eslint-disable-next-line no-unused-vars
    ipcMain.handle('input:writeData', async (event, dataName, dataContent) => {
        writeData(dataName, dataContent)
    })
    // eslint-disable-next-line no-unused-vars
    ipcMain.handle('check:isValid', async (event, filePath) => {
        const result = isValid(filePath)
        return result
    })
})
app.on('window-all-closed', () => {
    app.quit()
})

function readData(name = new String) {  //数据读取
    const dataName = path.join(userDataPath, name)
    let returnData
    try {
        fs.readFile(dataName, 'utf-8', (err, data) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    try {
                        fs.writeFile(dataName, '', 'utf-8', (error) => {
                            if (error) {
                                throw error
                            }
                            console.log(`Create file:${dataName} successfully.`)
                        })
                    }
                    catch (error) {
                        console.error(error)
                    }
                }
                else {
                    throw err
                }
            }
            returnData = data
        })
    }
    catch (err) {
        console.error(err)
    }
    console.log(`Read file:${dataName} successfully.Content:${returnData} .`)
    return returnData
}

function writeData(name = new String, content = new String) {  //数据写入
    const dataName = path.join(userDataPath, name)
    content = JSON.stringify(content) 
    try {
        fs.writeFile(dataName, content, 'utf-8', (err) => {
            if (err) {
                throw err
            }
            console.log(`Write file:${dataName} successfully.`)
        })
    }
    catch (err) {
        console.error(err)
    }
}

async function handleFileOpen() {  //选取文件
    const { canceled, filePaths } = await dialog.showOpenDialog()
    if (canceled) {
        return
    } else {
        return filePaths[0]
    }
}

function isValid(filePath) { //判断文件是否存在
    if (filePath == ''){
        return false
    }
    let result = false
    filePath = JSON.stringify(filePath) 
    fs.access(filePath, fs.constants.F_OK, (err) => {
        err ? result = false : result = true
    })
    return result
}
