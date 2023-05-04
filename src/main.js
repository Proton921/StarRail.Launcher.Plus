/* eslint-disable no-unused-vars */
const { app, BrowserWindow, Tray, Menu } = require('electron')
const path = require('path')
const fs = require('fs')

const userDataPath = app.getPath('userData')

function createWindow() {
    const mainWindow = new BrowserWindow({
        show: false,
        resizable: false,
        width: 800,
        height: 600,
        backgroundColor: '#161619',
        icon: path.join(__dirname,'\\resources\\images\\icons\\2.ico'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeItergration:true
        }
    })
    mainWindow.loadFile(path.join(__dirname,'index.html'))
    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
      })
}
function createTray() {
    const tray = new Tray(path.join(__dirname,'\\resources\\images\\icons\\2.ico'))
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

function readUserData(name) {
    const dataName = path.join(userDataPath, name)
    let returnData
    fs.readFile(dataName, 'utf-8', (err, data) => {
        if (err.code === 'ENOENT'){
            fs.writeFile(dataName,'','utf-8',(error)=>{
                if(error) console.error(error)
                console.log('Create file:' + dataName + 'successfully.')
            })
        }
        returnData = data
    })
    return returnData
}
function writeUserData(name,content){
    const dataName = path.join(userDataPath, name)
    fs.writeFile(dataName,content,'utf-8',(error)=>{
        if(error) console.error(error)
        console.log('Write file:' + dataName + 'successfully.');
    })
}