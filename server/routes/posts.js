const express = require("express");
const {
  createNewPost,
  deleteExistingPost,
  getPost,
  getPosts,
  increaseViewCount,
  updateExistingPost
} = require("../controllers/postsController");

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", createNewPost);
router.put("/:id", updateExistingPost);
router.delete("/:id", deleteExistingPost);
router.post("/:id/view", increaseViewCount);

module.exports = router;
