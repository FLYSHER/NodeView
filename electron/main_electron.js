// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain, Menu, dialog, screen, globalShortcut } = require('electron');
const path = require('path');
const loadManager = require('./LoadManager');
const log = require('electron-log/main');
const localShortcut = require('electron-localshortcut');
const fileUtil  = require('./FileUtil');
const { sentryMainInit } = require('./sentryMain');
sentryMainInit();

let mainWindow;
let preferenceWnd;


function createWindow () {
    // 현재 화면 정보 가져오기
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;

    // Create the browser window.
    const window = new BrowserWindow({
        width: width,
        height: height,
        webPreferences: {
            webSecurity: false,
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: false,
            nodeIntegration: true,
        }
    });

    console.log("electron created window");

    // and load the index.html of the app.
    window.loadFile('client/index.html');

    return window;

}

function createPreferenceWindow( parentWnd ) {
  const window = new BrowserWindow({
      parent  : parentWnd,
      width   : 800,
      height  : 600,
      show    : true,
      modal   : true,
      webPreferences: {
          preload: path.join(__dirname, 'preload.js'),
          contextIsolation: false, // context isolation 활성화
          nodeIntegration: true // node.js 인터페이스 비활성화
      }
  });

  window.loadFile( 'client/preference.html' );

  //
  window.on('closed', function() {
    preferenceWnd = null;
  });

  return window;
}

// 어플리케이션 메뉴 세팅
const template = [
  {
    label: 'File',
    submenu: [
      {   // 툴 정보
          label : 'Genie Tool 정보',
          click() {
              console.log("onclick Genie Tool 정보");
          }
      },
      {
          label : 'preference',
          click() {
              togglePreferenceWindow();
          }

      },
      // {
      //   label: 'Open',
      //   click () {
      //
      //     dialog.showOpenDialog().then((result)=>{
      //       if(result.canceled === false){
      //         const files = result.filePaths;
      //         //console.log("selectedPaths = "+ files);
      //         loadManager.loadFiles(files);
      //       }
      //     });
      //   }
      // },
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
  mainWindow = createWindow();
  preferenceWnd = createPreferenceWindow();

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
        createPreferenceWindow();
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


function togglePreferenceWindow() {
    if ( preferenceWnd.isVisible()) {
       preferenceWnd.hide();
    }
    else {
       preferenceWnd.show();
    }
}
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.


// event
// 렌더러 프로세스에서 'open-dialog' 이벤트를 수신하면 파일 다이얼로그 열기
ipcMain.on('open-dialog', (event) => {
    dialog.showOpenDialog({
        properties: ['openDirectory'] // 폴더 선택 가능하도록 설정
    }).then((result) => {
        if (!result.canceled && result.filePaths.length > 0) {
            // 선택한 폴더
            const folderPath      = result.filePaths[0];
            const excludedFolders = [''];
            const fileFilter = /\.(jpg|png|fnt|exportJson|plist)$/; // 이미지 파일 필터 (예: jpg, png, gif)

            var files = fileUtil.getAllFilesInFolderWithFilter(folderPath,excludedFolders, fileFilter);
            // console.log( files );
            // event.sender.send('selected-path', result.filePaths[0] ); // 선택한 파일 또는 폴더의 경로를 렌더러 프로세스로 전달
            // console.log( result.filePaths[0] );

            event.sender.send('select_assetPath', {
                assetPath   : result.filePaths[0],
                assets      : files
            } ); // 선택한 파일 또는 폴더의 경로를 렌더러 프로세스로 전달
        }
    }).catch((err) => {
        console.log(err);
    });
});

// 자식 창으로부터의 메시지 수신
ipcMain.on('message_from_child', (event, message) => {
    console.log('자식 창에서 받은 메시지:', message );
    mainWindow.webContents.send('message_from_main', message);
});




