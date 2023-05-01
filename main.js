const { app, BrowserWindow, Tray, Menu } = require('electron')
const path = require('path')

function createWindow() {
    const mainWindow = new BrowserWindow({
        show: false,
        resizable: false,
        width: 800,
        height: 600,
        backgroundColor: '#161619',
        icon: './images/icons/2.ico',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeItergration:true
        }
    })
    mainWindow.loadFile('index.html')
    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
      })
}
function createTray() {
    const tray = new Tray('./images/icons/2.ico')
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
