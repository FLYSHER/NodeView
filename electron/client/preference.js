var { ipcRenderer } = require('electron');

var Preference = Preference || {};

Preference.init = function() {
    Preference.showContent("asset");

    //
    console.log(" *** Preference.init *** ");
}

Preference.showContent = function ( contentId ) {
    // 모든 컨텐츠 숨기기
    var contents = document.querySelectorAll('.main-content > div');
    contents.forEach(function(content) {
        content.classList.add('hidden');
    });

    // 클릭한 메뉴 아이템에 해당하는 컨텐츠만 표시
    var selectedContent = document.getElementById(contentId + 'Content');
    selectedContent.classList.remove('hidden');
}

//
Preference.openFolder = function() {
    ipcRenderer.send('open-dialog');
}

ipcRenderer.on( 'select_assetPath', function( event, args ) {
    console.log(" on event : select_assetPath");

    ipcRenderer.send("message_from_child", args );
})

// 초기화
Preference.init();