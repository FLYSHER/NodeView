// Modules to control application life and create native browser window
const {app, BrowserWindow, Menu, dialog, globalShortcut, screen} = require('electron');
const path = require('path');
const loadManager = require('./LoadManager');
const log = require('electron-log/main');
const localShortcut = require('electron-localshortcut');
const sentryMain = require("@sentry/electron/main");
const {rewriteFramesIntegration} = require("@sentry/integrations");
sentryMain.init({
  dsn : 'https://84d805b8c03d8b956113b4e8567cad0d@o4506908221112320.ingest.us.sentry.io/4506908226813952',
  release : `${app.getName()}@${app.getVersion()}`,
  integrations : [ rewriteFramesIntegration() ],
});

function createWindow () {
  // 현재 화면 정보 가져오기
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: width,
    height: height,
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
      },
      {
        label : "sentry undefined error test",
        click : function () {
          myUndefinedFunction();
          console.log("[sentry] send undefined error on sentry");
        }
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


