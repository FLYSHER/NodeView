// Modules to control application life and create native browser window
const {app, BrowserWindow, Menu, dialog, globalShortcut } = require('electron');
const path = require('path');
const loadManager = require('./LoadManager');
const log = require('electron-log/main');
const localShortcut = require('electron-localshortcut');


function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      webSecurity: false,
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  console.log("electron created window");

  // and load the index.html of the app.
  mainWindow.loadFile('client/index.html');

  return mainWindow;
}

const template = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Open',
        click () {

          dialog.showOpenDialog().then((result)=>{
            if(result.canceled === false){
              const files = result.filePaths;
              //console.log("selectedPaths = "+ files);
              loadManager.loadFiles(files);
            }
          });
        }
      },
      {
        type: 'separator'
      },
      {
        label: 'Exit',
        role: 'close'
      }
    ]
  },
  {
    role: 'Window',
    submenu: [
      {
        role: 'Minimize'
      },
      {
        role: 'Close'
      },
      {
        role: 'ToggleDevTools'
      }
    ]
  },
]
const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  let mainWindow = createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
  });

  localShortcut.register( mainWindow, 'CommandOrControl+Z', function(){
      mainWindow.webContents.send('undo');
  });

  localShortcut.register( mainWindow, 'CommandOrControl+Shift+Z', function() {
    mainWindow.webContents.send('redo');
  });

  loadManager.init(mainWindow);


  // log
  log.initialize({
    preload : true
  });

  log.info("main process ready");
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.


