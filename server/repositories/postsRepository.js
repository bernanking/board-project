const { all, get, run } = require("../db/index");

function listPosts() {
  return all("SELECT * FROM posts ORDER BY id DESC");
}

function findPostById(id) {
  return get("SELECT * FROM posts WHERE id = ?", [id]);
}

function createPost({ title, writer, content, createdAt }) {
  return run(
    `
      INSERT INTO posts (title, writer, content, created_at, views)
      VALUES (?, ?, ?, ?, 0)
    `,
    [title, writer, content, createdAt]
  );
}

function updatePost(id, { title, writer, content }) {
  return run(
    `
      UPDATE posts
      SET title = ?, writer = ?, content = ?
      WHERE id = ?
    `,
    [title, writer, content, id]
  );
}

function removePost(id) {
  return run("DELETE FROM posts WHERE id = ?", [id]);
}

function increasePostViews(id) {
  return run(
    `
      UPDATE posts
      SET views = views + 1
      WHERE id = ?
    `,
    [id]
  );
}

module.exports = {
  createPost,
  findPostById,
  increasePostViews,
  listPosts,
  removePost,
  updatePost
};
