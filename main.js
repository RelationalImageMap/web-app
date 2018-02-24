const { app, BrowserWindow } = require('electron')

let win;

function createWindow() {
    process.env.GOOGLE_API_KEY = 'AIzaSyB_P9wXWeK9o0E8k5P5_3MOh3doixOxMxQ'
    win = new BrowserWindow({
        width: 1920,
        height: 1080,
        backgroundColor: '#ffffff',
        autoHideMenuBar: true
    })

    win.maximize()

    win.loadURL(`file://${__dirname}/dist/index.html`)

    win.on('closed', function () {
        win = null
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
})

app.on('activate', function () {
    if (win === null) {
        createWindow()
    }
})