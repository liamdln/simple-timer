const { app, BrowserWindow, protocol } = require('electron')
const url = require('url');
const path = require('path');

let appWindow;

function createWindow() {
    // Create the window
    appWindow = new BrowserWindow({
        width: 600,
        height: 600,
        backgroundColor: '#fff',
        webPreferences: {
            nodeIntergration: true
        }
        // add icon here
    });

    appWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, `/dist/index.html`),
            protocol: "file:",
            slashes: true
        })
    );

    // debugging: uncomment next line
    //win.webContents.openDevTools();

    appWindow.on('closed', function () {
        appWindow = null
    });

}

// Create window when electron initializes
app.on('ready', createWindow)

// Kill the app when all the windows have closed
app.on('window-all-closed', function () {
    // macOS specific closing instructions
    // on mac, closing window doesn't kill app, so we need to tell it to kill the app.
    if (process.platform !== 'darwin') {
        app.quit()
    }

    app.on('activate', function () {
        if (window === null) {
            createWindow();
        }
    })
})