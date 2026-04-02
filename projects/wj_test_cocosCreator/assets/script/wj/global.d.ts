// .d.ts (Declaration file, 타입 선언 파일)를 만들어서 코드를 적어주는 겁니다.
interface Window {
    facebook: any;
    // 앞으로 전역으로 쓸 변수가 생기면 여기에 계속 추가하시면 됩니다!
    // MyGlobalData: any;
}
//declare: "이 변수는 내가 지금 이 파일에 구현하진 않았지만, 나중에 실행할 때 외부(브라우저)에서 무조건 들어올 거니까 의심하지 말고 통과시켜 줘!"라고 선언하는 겁니다.
declare const rnc: any;
declare let SERVER_CONFIG: any;
declare let facebook: any;
declare let FacebookWrapper: any;
declare let RockN : any;
declare let g_api : any;
declare let HTTP_METHOD : any;
declare let IS_SUCCEED : any;
declare let browser : any;
declare const CONFIG : any;
declare let Player : any;
// 1.모든 js 파일는  내용은 declare로 선언한다.
// declare module '*.js';
// 사용하는쪽
// import * as OldLogic from './OldLogic.js';

// 2.tsconfig.js
// {
//   "compilerOptions": {
//     "allowJs": true,           // "JS 파일도 compile 허용"
//     "noImplicitAny": false,    // "타입 안 적혀 있어도 에러 내지 말고 대충 any로 인식하도록"
//     // ... 기존 설정들 ...
//   }
//}

//3. 파일 맨 위에 이 한 줄만 추가하세요! (window를 any로 속이고 필요한 것만 쏙쏙 뽑아옵니다)
// const { blob, someFunc, oldLogic } = window as any;