// const { ipcRenderer } = require('electron');
// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
});

//region [ contextIsolation 옵션이 true 일 경우 메인-렌더러 프로세스간 통신 예제 ]
// const { ipcRenderer, contextBridge } = require('electron');
// contextBridge 는 contextIsolation 옵션이 true 일 경우에만 사용 가능.
// contextBridge.exposeInMainWorld('ipcRenderer', {
//     //
//     send : function( channel, data ) {
//       ipcRenderer.send( channel, data );
//     },
//
//     receive : function ( channel, func ) {
//         ipcRenderer.on( channel, function( event, ...args ){
//             func( ...args );
//         });
//     }
// });

