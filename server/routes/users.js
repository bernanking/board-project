const express = require("express");
const {
  changePassword,
  findUsername,
  getSessionUser,
  logIn,
  logOut,
  signUp
} = require("../controllers/usersController");

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", logIn);
router.post("/logout", logOut);
router.get("/me", getSessionUser);
router.post("/find-id", findUsername);
router.put("/password", changePassword);

module.exports = router;
