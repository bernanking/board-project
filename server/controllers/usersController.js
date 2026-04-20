const bcrypt = require("bcrypt");
const {
  createUser,
  findUserByEmail,
  findUserByNameAndEmail,
  findUserByUsername,
  updateLastLoginAt,
  updateUserPassword
} = require("../repositories/usersRepository");

function getNow() {
  return new Date().toISOString();
}

function buildSessionUser(user) {
  return {
    id: user.id,
    username: user.username,
    name: user.name,
    email: user.email
  };
}

function maskUsername(username) {
  if (username.length <= 2) {
    return `${username[0]}*`;
  }

  return `${username.slice(0, 2)}${"*".repeat(username.length - 2)}`;
}

async function signUp(req, res, next) {
  try {
    const username = req.body.username?.trim();
    const password = req.body.password?.trim();
    const confirmPassword = req.body.confirmPassword?.trim();
    const name = req.body.name?.trim();
    const email = req.body.email?.trim().toLowerCase();

    if (!username || !password || !confirmPassword || !name || !email) {
      res.status(400).json({ message: "아이디, 비밀번호, 이름, 이메일을 모두 입력해주세요." });
      return;
    }

    if (password !== confirmPassword) {
      res.status(400).json({ message: "비밀번호 확인이 일치하지 않습니다." });
      return;
    }

    if (password.length < 4) {
      res.status(400).json({ message: "비밀번호는 4자 이상 입력해주세요." });
      return;
    }

    const existingUser = await findUserByUsername(username);

    if (existingUser) {
      res.status(400).json({ message: "이미 사용 중인 아이디입니다." });
      return;
    }

    const existingEmail = await findUserByEmail(email);

    if (existingEmail) {
      res.status(400).json({ message: "이미 사용 중인 이메일입니다." });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const createdAt = getNow();
    const result = await createUser({
      username,
      passwordHash,
      name,
      email,
      createdAt
    });

    const createdUser = await findUserByUsername(username);

    res.status(201).json({
      id: result.lastID,
      username: createdUser.username,
      name: createdUser.name,
      email: createdUser.email
    });
  } catch (error) {
    next(error);
  }
}

async function logIn(req, res, next) {
  try {
    const username = req.body.username?.trim();
    const password = req.body.password?.trim();
    const rememberMe = Boolean(req.body.rememberMe);

    if (!username || !password) {
      res.status(400).json({ message: "아이디와 비밀번호를 입력해주세요." });
      return;
    }

    const user = await findUserByUsername(username);

    if (!user) {
      res.status(400).json({ message: "아이디 또는 비밀번호가 올바르지 않습니다." });
      return;
    }

    const isMatched = await bcrypt.compare(password, user.password_hash);

    if (!isMatched) {
      res.status(400).json({ message: "아이디 또는 비밀번호가 올바르지 않습니다." });
      return;
    }

    req.session.user = buildSessionUser(user);

    if (rememberMe) {
      req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 7;
    } else {
      req.session.cookie.expires = false;
    }

    await updateLastLoginAt(user.id, getNow());

    res.json({
      message: "로그인되었습니다.",
      user: req.session.user
    });
  } catch (error) {
    next(error);
  }
}

function logOut(req, res, next) {
  req.session.destroy((error) => {
    if (error) {
      next(error);
      return;
    }

    res.clearCookie("connect.sid");
    res.json({
      message: "로그아웃되었습니다."
    });
  });
}

function getSessionUser(req, res) {
  res.json({
    isLoggedIn: Boolean(req.session.user),
    user: req.session.user || null
  });
}

async function findUsername(req, res, next) {
  try {
    const name = req.body.name?.trim();
    const email = req.body.email?.trim().toLowerCase();

    if (!name || !email) {
      res.status(400).json({ message: "이름과 이메일을 모두 입력해주세요." });
      return;
    }

    const user = await findUserByNameAndEmail(name, email);

    if (!user) {
      res.status(404).json({ message: "일치하는 회원 정보를 찾을 수 없습니다." });
      return;
    }

    res.json({
      message: "아이디를 찾았습니다.",
      username: user.username,
      maskedUsername: maskUsername(user.username)
    });
  } catch (error) {
    next(error);
  }
}

async function changePassword(req, res, next) {
  try {
    if (!req.session.user) {
      res.status(401).json({ message: "로그인이 필요합니다." });
      return;
    }

    const currentPassword = req.body.currentPassword?.trim();
    const newPassword = req.body.newPassword?.trim();
    const confirmPassword = req.body.confirmPassword?.trim();

    if (!currentPassword || !newPassword || !confirmPassword) {
      res.status(400).json({ message: "현재 비밀번호와 새 비밀번호를 모두 입력해주세요." });
      return;
    }

    if (newPassword !== confirmPassword) {
      res.status(400).json({ message: "새 비밀번호 확인이 일치하지 않습니다." });
      return;
    }

    if (newPassword.length < 4) {
      res.status(400).json({ message: "새 비밀번호는 4자 이상 입력해주세요." });
      return;
    }

    const user = await findUserByUsername(req.session.user.username);

    if (!user) {
      res.status(404).json({ message: "회원 정보를 찾을 수 없습니다." });
      return;
    }

    const isMatched = await bcrypt.compare(currentPassword, user.password_hash);

    if (!isMatched) {
      res.status(400).json({ message: "현재 비밀번호가 올바르지 않습니다." });
      return;
    }

    const newPasswordHash = await bcrypt.hash(newPassword, 10);
    await updateUserPassword(user.id, newPasswordHash, getNow());

    res.json({
      message: "비밀번호가 변경되었습니다."
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  changePassword,
  findUsername,
  getSessionUser,
  logIn,
  logOut,
  signUp
};
