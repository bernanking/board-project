const { get, run } = require("../db/index");

function findUserByUsername(username) {
  return get("SELECT * FROM users WHERE username = ?", [username]);
}

function findUserByEmail(email) {
  return get("SELECT * FROM users WHERE email = ?", [email]);
}

function findUserByNameAndEmail(name, email) {
  return get("SELECT * FROM users WHERE name = ? AND email = ?", [name, email]);
}

function createUser({ username, passwordHash, name, email, createdAt }) {
  return run(
    `
      INSERT INTO users (username, password_hash, name, email, created_at)
      VALUES (?, ?, ?, ?, ?)
    `,
    [username, passwordHash, name, email, createdAt]
  );
}

function updateUserPassword(id, passwordHash, updatedAt) {
  return run(
    `
      UPDATE users
      SET password_hash = ?, updated_at = ?
      WHERE id = ?
    `,
    [passwordHash, updatedAt, id]
  );
}

function updateLastLoginAt(id, lastLoginAt) {
  return run(
    `
      UPDATE users
      SET last_login_at = ?
      WHERE id = ?
    `,
    [lastLoginAt, id]
  );
}

module.exports = {
  createUser,
  findUserByEmail,
  findUserByNameAndEmail,
  findUserByUsername,
  updateLastLoginAt,
  updateUserPassword
};
