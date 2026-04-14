//Express 서버 시작 파일
const express = require("express");
const path = require("node:path");

const app = express();
const PORT = 3000;

// public 폴더 안의 정적 파일 제공
app.use(express.static(path.join(__dirname, "..", "public")));

// 서버가 켜졌는지 확인용
app.get("/health", (req, res) => {
  res.send("server is running");
});

app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
  console.log(`게시판 목록: http://localhost:${PORT}/pages/list.html`);
});