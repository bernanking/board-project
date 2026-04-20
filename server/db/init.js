const fs = require("node:fs");
const path = require("node:path");
const { get, run } = require("./index");

const dataDirectory = path.join(__dirname, "..", "data");

async function initializeDatabase() {
  fs.mkdirSync(dataDirectory, { recursive: true });

  await run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      created_at TEXT NOT NULL,
      updated_at TEXT,
      last_login_at TEXT
    )
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      writer TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at TEXT NOT NULL,
      views INTEGER NOT NULL DEFAULT 0
    )
  `);

  const row = await get("SELECT COUNT(*) AS count FROM posts");

  if (row.count === 0) {
    await run(
      `
        INSERT INTO posts (title, writer, content, created_at, views)
        VALUES (?, ?, ?, ?, ?),
               (?, ?, ?, ?, ?)
      `,
      [
        "첫 번째 게시글입니다",
        "관리자",
        "안녕하세요. 게시판에 오신 것을 환영합니다.",
        "2026-04-05",
        0,
        "두 번째 게시글입니다",
        "요한",
        "게시판 삭제 기능을 실습하는 중입니다.",
        "2026-04-05",
        0
      ]
    );
  }
}

module.exports = {
  initializeDatabase
};
