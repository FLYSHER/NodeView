# 외부 라이브러리 (로컬 포함)

인터넷 연결 없이도 NodeView 가 동작하도록, 예전에 CDN 에서 불러오던 파일을 그대로 내려받아 둔 폴더입니다.
폴더 구조는 CDN 경로와 같아서 CSS 안의 상대 경로(이미지·웹폰트)가 그대로 동작합니다.

| 라이브러리 | 버전 | 원본 | 라이선스 |
|---|---|---|---|
| jQuery | 3.4.1 | ajax.googleapis.com/ajax/libs/jquery | MIT |
| jQuery UI (smoothness 테마) | 1.12.1 | ajax.googleapis.com/ajax/libs/jqueryui | MIT |
| jsTree (default 테마) | 3.2.1 | cdnjs.cloudflare.com/ajax/libs/jstree | MIT |
| Font Awesome Free | 6.0.0-beta3 | cdnjs.cloudflare.com/ajax/libs/font-awesome | 아이콘 CC BY 4.0, 폰트 SIL OFL 1.1, 코드 MIT |
| Golden Layout | 1.5.9 | cdnjs.cloudflare.com/ajax/libs/golden-layout | MIT |

버전을 올릴 때는 같은 구조로 새 버전 폴더를 만들고 `client/index.html` 의 경로를 바꿉니다.
