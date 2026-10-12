// Modules to control application life and create native browser window
const {app, BrowserWindow, Menu, dialog, ipcMain} = require('electron')
const loadManager = require('./LoadManager')
const windowStateKeeper = require('electron-window-state');
const fs = require('fs');
const path = require('path');

// 앱 이름을 바꾸면 설정 폴더(레이아웃, 최근 파일, 창 위치 등)도 바뀌므로
// 예전 이름의 폴더가 있으면 처음 한 번 새 폴더로 복사해 설정을 이어 쓴다
(function migrateUserData() {
  try {
    const current = app.getPath('userData');
    const legacy = path.join(app.getPath('appData'), 'NodeView(flysher)');
    if (current !== legacy && !fs.existsSync(current) && fs.existsSync(legacy)) {
      fs.cpSync(legacy, current, { recursive: true });
    }
  } catch (e) {
    console.error('설정 폴더 이전 실패:', e);
  }
})();


function createWindow () {
  let mainWindowState = windowStateKeeper({
    defaultWidth: 800,
    defaultHeight: 600
  });

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    backgroundColor: '#141518',
    // 제목 표시줄은 앱 상단 바(HTML)가 대신하고, 창 버튼(최소화/최대화/닫기)만 시스템 것을 쓴다
    titleBarStyle: process.platform === 'darwin' ? 'hiddenInset' : 'hidden',
    titleBarOverlay: process.platform === 'darwin' ? undefined : { color: '#141518', symbolColor: '#a3a7ae', height: 34 },
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  mainWindowState.manage(mainWindow);

  console.log("electron created window");
  // and load the index.html of the app.
  mainWindow.loadFile('client/index.html');
  //mainWindow.setMenu()
  //mainWindow.setMenu(null);
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
  return mainWindow;
}

// 메뉴는 앱 상단 바(HTML)에 있다. macOS 는 복사/붙여넣기 단축키를 위해 기본 앱 메뉴를 그대로 둔다
if (process.platform !== 'darwin') Menu.setApplicationMenu(null);

// 앱 상단 바에서 보내는 요청
ipcMain.handle('nv:openDialog', async (evt) => {
  const win = BrowserWindow.fromWebContents(evt.sender);
  const result = await dialog.showOpenDialog(win, {
    title: '파일 열기',
    properties: ['openFile', 'multiSelections'],
    filters: [
      { name: 'NodeView 에셋', extensions: ['ExportJson', 'exportjson', 'json', 'png'] },
      { name: '모든 파일', extensions: ['*'] }
    ]
  });
  return result.canceled ? [] : result.filePaths;
});
ipcMain.handle('nv:openFolderDialog', async (evt) => {
  const win = BrowserWindow.fromWebContents(evt.sender);
  const result = await dialog.showOpenDialog(win, { title: '리소스 폴더 열기', properties: ['openDirectory'] });
  return result.canceled ? [] : result.filePaths;
});
ipcMain.handle('nv:appInfo', () => ({ version: app.getVersion(), platform: process.platform }));
ipcMain.on('nv:window', (evt, command) => {
  const win = BrowserWindow.fromWebContents(evt.sender);
  if (!win) return;
  if (command === 'toggleDevTools') win.webContents.toggleDevTools();
  else if (command === 'reload') win.webContents.reload();
  else if (command === 'toggleFullScreen') win.setFullScreen(!win.isFullScreen());
  else if (command === 'close') win.close();
});


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  let mainWindow = createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })


  loadManager.init(mainWindow);


})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.


