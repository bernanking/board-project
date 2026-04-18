const {
  createPost,
  findPostById,
  increasePostViews,
  listPosts,
  removePost,
  updatePost
} = require("../repositories/postsRepository");

function mapPost(row) {
  if (!row) {
    return null;
  }

  return {
    id: row.id,
    title: row.title,
    writer: row.writer,
    content: row.content,
    createdAt: row.created_at,
    views: row.views
  };
}

function validatePostInput(body) {
  const title = body.title?.trim();
  const writer = body.writer?.trim();
  const content = body.content?.trim();

  if (!title || !writer || !content) {
    return {
      isValid: false,
      message: "제목, 작성자, 내용을 모두 입력해주세요."
    };
  }

  return {
    isValid: true,
    value: { title, writer, content }
  };
}

function getToday() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const date = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${date}`;
}

async function getPosts(req, res, next) {
  try {
    const rows = await listPosts();
    res.json(rows.map(mapPost));
  } catch (error) {
    next(error);
  }
}

async function getPost(req, res, next) {
  try {
    const post = await findPostById(req.params.id);

    if (!post) {
      res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
      return;
    }

    res.json(mapPost(post));
  } catch (error) {
    next(error);
  }
}

async function createNewPost(req, res, next) {
  try {
    const validation = validatePostInput(req.body);

    if (!validation.isValid) {
      res.status(400).json({ message: validation.message });
      return;
    }

    const { title, writer, content } = validation.value;
    const createdAt = getToday();
    const result = await createPost({ title, writer, content, createdAt });
    const createdPost = await findPostById(result.lastID);

    res.status(201).json(mapPost(createdPost));
  } catch (error) {
    next(error);
  }
}

async function updateExistingPost(req, res, next) {
  try {
    const validation = validatePostInput(req.body);

    if (!validation.isValid) {
      res.status(400).json({ message: validation.message });
      return;
    }

    const { title, writer, content } = validation.value;
    const result = await updatePost(req.params.id, { title, writer, content });

    if (result.changes === 0) {
      res.status(404).json({ message: "수정할 게시글을 찾을 수 없습니다." });
      return;
    }

    const updatedPost = await findPostById(req.params.id);
    res.json(mapPost(updatedPost));
  } catch (error) {
    next(error);
  }
}

async function deleteExistingPost(req, res, next) {
  try {
    const result = await removePost(req.params.id);

    if (result.changes === 0) {
      res.status(404).json({ message: "삭제할 게시글을 찾을 수 없습니다." });
      return;
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

async function increaseViewCount(req, res, next) {
  try {
    const result = await increasePostViews(req.params.id);

    if (result.changes === 0) {
      res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
      return;
    }

    const post = await findPostById(req.params.id);
    res.json(mapPost(post));
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createNewPost,
  deleteExistingPost,
  getPost,
  getPosts,
  increaseViewCount,
  updateExistingPost
};
