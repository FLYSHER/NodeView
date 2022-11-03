// 기본 설정
const express = require("express");
const app = express();
const PORT = 8899;

// 정적 파일 불러오기
app.use(express.static(__dirname + "/electron/client"));

// 라우팅 정의
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/electron/client/index.html");
});

// 서버 실행
app.listen(PORT, () => {
    console.log(`Listen : ${PORT}`);
});


console.log("http://localhost:" + PORT);