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
    views: row.views,
    canEdit: false
  };
}

function validatePostInput(body) {
  const title = body.title?.trim();
  const content = body.content?.trim();

  if (!title || !content) {
    return {
      isValid: false,
      message: "제목과 내용을 모두 입력해주세요."
    };
  }

  return {
    isValid: true,
    value: { title, content }
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
    res.json(
      rows.map((row) => ({
        ...mapPost(row),
        canEdit: Boolean(req.session.user && req.session.user.username === row.writer)
      }))
    );
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

    res.json({
      ...mapPost(post),
      canEdit: Boolean(req.session.user && req.session.user.username === post.writer)
    });
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

    const { title, content } = validation.value;
    const createdAt = getToday();
    const writer = req.session.user.username;
    const result = await createPost({ title, writer, content, createdAt });
    const createdPost = await findPostById(result.lastID);

    res.status(201).json({
      ...mapPost(createdPost),
      canEdit: true
    });
  } catch (error) {
    next(error);
  }
}

async function updateExistingPost(req, res, next) {
  try {
    const existingPost = await findPostById(req.params.id);

    if (!existingPost) {
      res.status(404).json({ message: "수정할 게시글을 찾을 수 없습니다." });
      return;
    }

    if (existingPost.writer !== req.session.user.username) {
      res.status(403).json({ message: "본인 게시글만 수정할 수 있습니다." });
      return;
    }

    const validation = validatePostInput(req.body);

    if (!validation.isValid) {
      res.status(400).json({ message: validation.message });
      return;
    }

    const { title, content } = validation.value;
    const result = await updatePost(req.params.id, {
      title,
      writer: req.session.user.username,
      content
    });

    if (result.changes === 0) {
      res.json({
        ...mapPost(existingPost),
        canEdit: true
      });
      return;
    }

    const updatedPost = await findPostById(req.params.id);
    res.json({
      ...mapPost(updatedPost),
      canEdit: true
    });
  } catch (error) {
    next(error);
  }
}

async function deleteExistingPost(req, res, next) {
  try {
    const existingPost = await findPostById(req.params.id);

    if (!existingPost) {
      res.status(404).json({ message: "삭제할 게시글을 찾을 수 없습니다." });
      return;
    }

    if (existingPost.writer !== req.session.user.username) {
      res.status(403).json({ message: "본인 게시글만 삭제할 수 있습니다." });
      return;
    }

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
    res.json({
      ...mapPost(post),
      canEdit: Boolean(req.session.user && req.session.user.username === post.writer)
    });
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
