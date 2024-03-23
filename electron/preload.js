const { ipcRenderer, contextBridge } = require('electron');

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
})

// contextBridge.exposeInMainWorld('electronAPI', {
//   // dialog 오픈.
//   openDialog : function() {
//     // preference.js/ main.js 같은 렌더러 프로세스에서는 일렉트론 모듈에 직접 접근할 수 없으므로
//     // preload 스크립트를 사용하여 메인 프로세스와 통신할 수 있도록 설정
//     ipcRenderer.send('open-dialog');
//   }
// });

contextBridge.exposeInMainWorld('ipcRenderer', {
    //
    send : function( channel, data ) {
      ipcRenderer.send( channel, data );
    },

    receive : function ( channel, func ) {
        ipcRenderer.on( channel, function( event, ...args ){
            func( ...args );
        });
    }
});

