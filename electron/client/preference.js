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

Preference.openFolder = function() {
    // window.electronAPI.openDialog();
    window.ipcRenderer.send('open-dialog');
}


window.ipcRenderer.receive( 'selected-path', function( args ){
    console.log("received event selected-path > ", args );
    const parentWnd = window.opener;
    console.log( "parentWnd ", parentWnd );
    if( parentWnd ) {
        parentWnd.postMessage("message i am child", args );
    }
});
// event from main-process

window.ipcRenderer.receive( 'test_event', function( args ){
    console.log("received event test_event > ", args );

    // 부모창에 메시지 보내자.
    window.ipcRenderer.send("message-from-child", args);
});

// 초기화
Preference.init();