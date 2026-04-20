function requireLogin(req, res, next) {
  if (!req.session.user) {
    res.status(401).json({
      message: "로그인이 필요합니다."
    });
    return;
  }

  next();
}

module.exports = {
  requireLogin
};
