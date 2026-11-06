// 기본 설정
const express = require("express");
const app = express();
const PORT = 8899;

// 정적 파일 불러오기
app.use(express.static(__dirname + "/electron/client"));

// 앱 정보 (웹 모드의 도움말 › NodeView 정보에서 버전 표시용). 버전은 Electron 앱과 같은 package.json 기준
app.get("/app-info.json", (req, res) => {
    const pkg = require("./electron/package.json");
    res.json({ version: pkg.version, mode: "web" });
});

// 라우팅 정의
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/electron/client/index.html");
});

// 서버 실행
app.listen(PORT, () => {
    console.log(`Listen : ${PORT}`);
});


console.log("http://localhost:" + PORT);