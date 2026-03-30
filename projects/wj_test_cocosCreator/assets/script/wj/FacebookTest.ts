import { _decorator, Component, Node, log, sys } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('FacebookTest')
export class FacebookTest extends Component {
    start() {
         (window as any).a = 10;
    }
    // 버튼의 Click Events에 연결할 함수
    public onLoginButtonClicked() {
       
        // 1. SDK가 정상적으로 로드되었는지 확인 (안전장치)
        if (typeof FB === 'undefined') {
            log('페이스북 SDK가 아직 로드되지 않았습니다.');
            return;
        }
        FB.init({
                        appId                : SERVER_CONFIG.FB_ID,
                        version              : SERVER_CONFIG.FB_GRAPH_API_VER,
                        cookie               : true,
                        // status               : true,
                        xfbml                : true,
                        frictionlessRequests : true
        });

        // 2. 로그인 팝업 띄우기
        FB.login((response: any) => {
            if (response.authResponse) {
                // 로그인 성공! (유저가 승인함)
                log('로그인 성공! Access Token:', response.authResponse.accessToken);
                
                // TODO: 여기서 씬을 넘기거나, 게임 서버로 토큰을 보내서 검증하세요.
                
            } else {
                // 로그인 실패! (유저가 팝업을 닫았거나 승인 취소)
                log('로그인이 취소되었거나 실패했습니다.');
            }
        }, { scope: 'public_profile,email' }); // 유저에게 요구할 권한 (프로필, 이메일)
    }
}

/*
1.cocosCreator 메뉴 -> Project/Create web Preview Template 
    * 현재는 Preview만 됨(preview in editor는 안됨)
    * build시에는 project/Create build Template 쪽 만들어줘야함
2.(프로젝트)/preview-template/index.ejs 파일 생성되고 아래 facebook 라이브러리 불려오는걸 추가한다. 
    <%- include(cocosTemplate, {}) %> 아래 코드 추가한다.

   <%- include(cocosTemplate, {}) %>
        // <script>
        // window.fbAsyncInit = function() {
        //     FB.init({
        //     appId            : '1231231321', // 페이스북 개발자 센터에서 발급받은 App ID로 변경하세요
        //     autoLogAppEvents : true,
        //     xfbml            : true,
        //     version          : 'v13.0' // 페이스북 대시보드에 명시된 최신 API 버전으로 맞춰주세요
        //     });
        // };
        // </script>
        <script async defer crossorigin="anonymous" src="https://connect.facebook.net/ko_KR/sdk.js"></script>

3. 프로젝트 상단에서 npm를 통해 sdk 설치해준다. 자동완성(IntelliSense)과 타입 검사위해
  (npm install --save-dev @types/facebook-js-sdk)설치한후에 
  프로젝트의 tsconfig.json 의 compilerOptions 에 "types": ["facebook-js-sdk"] 추가해준다.
    - 
        "compilerOptions": {
            "types": ["facebook-js-sdk"]
        }

  * 만약 IntelliSense 필요없고 설치안한다면 
        6+9 (이름).d.ts (Declaration file, 타입 선언 파일)를 만들어서 declare const FB: any; 선언해준다.
    -  // facebook.d.ts 파일 내부
        declare const FB: any;
    - 또는 FB 사용하는 쪽에서 /// <reference types="facebook-js-sdk" /> 주석을 위에 남겨준다.

4.  
*/