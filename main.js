const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let addWindow

function createWindow () {
  // Get screen size.
  let screen = electron.screen.getPrimaryDisplay()
  let dimensions = screen.workAreaSize
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 340, height: 115, frame: false, backgroundColor: '#1fc8db', x: dimensions.width-375, y: -dimensions.height+60+dimensions.height})
  addWindow = new BrowserWindow({width: 340, height: 57, frame: false, backgroundColor: '#1fc8db', hasShadow: 'false', x: mainWindow.getPosition()[0], y: mainWindow.getPosition()[1]+135})
  
  

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  addWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'advertisement.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Make bottom window follow primary when moved in an animated fashion.
  mainWindow.on('move', function () {
    addWindow.setPosition(mainWindow.getPosition()[0], mainWindow.getPosition()[1]+135)
  })

  //settingsWindow.show();

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
    addWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
