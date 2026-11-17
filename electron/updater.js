/**
 * 프로그램 업데이트 (electron-updater)
 *  - package.json build.publish 의 주소(S3)에서 latest.yml 을 읽어 현재 버전과 비교한다.
 *  - 새 버전이 있으면 화면(렌더러)에 알리고, 사용자가 받기를 누르면 내려받는다 (SHA-512 자동 검증).
 *  - 다 받으면 "재시작해서 설치" 또는 다음에 앱을 닫을 때 설치한다.
 *  - 압축만 풀어 쓰는 버전(zip)은 스스로 설치할 수 없어 설치 파일 주소만 알려준다.
 *
 * 렌더러와 주고받는 메시지
 *  - 렌더러 → 메인: nv:updateCheck(수동 확인), nv:updateDownload, nv:updateInstall
 *  - 메인 → 렌더러: nv:update { state, ... }
 *      state: checking | available | none | downloading | downloaded | error | unsupported
 */
const { app, ipcMain, shell } = require('electron');
const path = require('path');
const fs = require('fs');

let autoUpdater = null;
try {
  autoUpdater = require('electron-updater').autoUpdater;
} catch (e) {
  console.error('electron-updater 를 불러오지 못했습니다:', e);
}

let _win = null;
let _manual = false;       // 사용자가 직접 확인을 눌렀는지 (자동 확인은 "최신입니다" · 오류를 조용히 넘긴다)
let _latest = null;        // 마지막으로 찾은 새 버전 정보

function send(payload) {
  if (_win && !_win.isDestroyed()) _win.webContents.send('nv:update', payload);
}

// 설치 프로그램(NSIS)으로 설치했는지: 설치 폴더에 제거 프로그램이 있다
function isInstalled() {
  if (process.platform !== 'win32') return true;
  const dir = path.dirname(process.execPath);
  try {
    return fs.readdirSync(dir).some((f) => /^Uninstall .*\.exe$/i.test(f));
  } catch (e) {
    return false;
  }
}

function feedUrl() {
  try {
    const pkg = require('./package.json');
    const pub = pkg.build && pkg.build.publish && pkg.build.publish[0];
    return pub && pub.url ? pub.url.replace(/\/?$/, '/') : null;
  } catch (e) {
    return null;
  }
}

function check(manual) {
  _manual = !!manual;
  if (!autoUpdater) {
    if (_manual) send({ state: 'error', message: '업데이트 모듈을 불러오지 못했습니다.' });
    return;
  }
  if (!app.isPackaged) {
    if (_manual) send({ state: 'error', message: '개발 실행(npm start)에서는 업데이트를 확인하지 않습니다. 빌드한 앱에서 확인하세요.' });
    return;
  }
  if (_manual) send({ state: 'checking' });
  autoUpdater.checkForUpdates().catch((err) => {
    if (_manual) send({ state: 'error', message: String((err && err.message) || err) });
    console.error('업데이트 확인 실패:', err);
  });
}

function init(mainWindow) {
  _win = mainWindow;

  ipcMain.on('nv:updateCheck', () => check(true));
  ipcMain.on('nv:updateDownload', () => {
    if (!autoUpdater || !_latest) return;
    if (!isInstalled()) {
      // zip 버전: 설치 파일을 브라우저로 받게 한다
      const base = feedUrl();
      if (base && _latest.path) shell.openExternal(base + encodeURIComponent(_latest.path));
      return;
    }
    send({ state: 'downloading', percent: 0 });
    autoUpdater.downloadUpdate().catch((err) => {
      send({ state: 'error', message: '내려받지 못했습니다: ' + String((err && err.message) || err) });
    });
  });
  ipcMain.on('nv:updateInstall', () => {
    if (!autoUpdater) return;
    // 조용히 설치하고 다시 실행
    setImmediate(() => autoUpdater.quitAndInstall(true, true));
  });

  if (!autoUpdater) return;
  autoUpdater.autoDownload = false;          // 사용자가 받기를 눌렀을 때만
  autoUpdater.autoInstallOnAppQuit = true;   // 받아 두고 "나중에"를 고르면 앱을 닫을 때 설치

  autoUpdater.on('update-available', (info) => {
    _latest = info;
    send({
      state: 'available',
      version: info.version,
      current: app.getVersion(),
      releaseNotes: typeof info.releaseNotes === 'string' ? info.releaseNotes : null,
      installed: isInstalled()
    });
  });
  autoUpdater.on('update-not-available', () => {
    if (_manual) send({ state: 'none', current: app.getVersion() });
  });
  autoUpdater.on('download-progress', (p) => {
    send({ state: 'downloading', percent: Math.round(p.percent || 0), transferred: p.transferred, total: p.total });
  });
  autoUpdater.on('update-downloaded', (info) => {
    send({ state: 'downloaded', version: info.version });
  });
  autoUpdater.on('error', (err) => {
    console.error('업데이트 오류:', err);
    if (_manual) send({ state: 'error', message: String((err && err.message) || err) });
  });

  // 시작하고 잠시 뒤 한 번 조용히 확인
  mainWindow.webContents.once('did-finish-load', () => {
    setTimeout(() => check(false), 3000);
  });
}

module.exports = { init, check };
