const express = require("express");
const {
  createNewPost,
  deleteExistingPost,
  getPost,
  getPosts,
  increaseViewCount,
  updateExistingPost
} = require("../controllers/postsController");
const { requireLogin } = require("../middlewares/auth");

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", requireLogin, createNewPost);
router.put("/:id", requireLogin, updateExistingPost);
router.delete("/:id", requireLogin, deleteExistingPost);
router.post("/:id/view", increaseViewCount);

module.exports = router;
