// Express 서버 시작 파일
const express = require("express");
const path = require("node:path");
const session = require("express-session");
const SQLiteStoreFactory = require("connect-sqlite3");
const { databasePath } = require("./db/index");
const { initializeDatabase } = require("./db/init");
const postsRouter = require("./routes/posts");
const usersRouter = require("./routes/users");

const app = express();
const PORT = 3000;
const SQLiteStore = SQLiteStoreFactory(session);

app.use(express.json());
app.use(
  session({
    store: new SQLiteStore({
      db: "sessions.sqlite3",
      dir: path.join(__dirname, "data")
    }),
    secret: "board-project-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24
    }
  })
);

// public 폴더 안의 정적 파일 제공
app.use(express.static(path.join(__dirname, "..", "public")));
app.use("/api/posts", postsRouter);
app.use("/api/users", usersRouter);

app.get("/", (req, res) => {
  res.redirect("/pages/list.html");
});

// 서버가 켜졌는지 확인용
app.get("/health", (req, res) => {
  res.send("server is running");
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({
    message: "서버에서 오류가 발생했습니다."
  });
});

async function startServer() {
  await initializeDatabase();

  app.listen(PORT, () => {
    console.log(`서버 실행 중: http://localhost:${PORT}`);
    console.log(`게시판 목록: http://localhost:${PORT}/pages/list.html`);
    console.log(`SQLite DB: ${databasePath}`);
  });
}

startServer().catch((error) => {
  console.error("서버 시작 실패:", error);
  process.exit(1);
});
