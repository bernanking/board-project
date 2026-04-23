const editForm = document.getElementById("editForm");
const cancelLink = document.getElementById("cancelLink");
const titleInput = document.getElementById("title");
const writerInput = document.getElementById("writer");
const contentInput = document.getElementById("content");

async function fillEditForm() {
  if (!titleInput || !writerInput || !contentInput) {
    return;
  }

  const user = await renderAuthArea();
  if (!user) {
    alert("로그인이 필요합니다.");
    location.href = "./login.html";
    return;
  }

  const postId = getPostIdFromUrl();

  if (!postId) {
    alert("잘못된 접근입니다.");
    location.href = "./list.html";
    return;
  }

  if (cancelLink) {
    cancelLink.href = `./detail.html?id=${postId}`;
  }

  try {
    const post = await getPostById(postId);

    if (!post.canEdit) {
      alert("본인 게시글만 수정할 수 있습니다.");
      location.href = `./detail.html?id=${postId}`;
      return;
    }

    titleInput.value = post.title;
    writerInput.value = post.writer;
    contentInput.value = post.content;
  } catch (error) {
    alert(error.message);
    location.href = "./list.html";
  }
}

if (editForm && titleInput && contentInput) {
  editForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const postId = getPostIdFromUrl();
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    if (!title || !content) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    try {
      await updatePost(postId, {
        title,
        content
      });

      alert("게시글이 수정되었습니다.");
      location.href = `./detail.html?id=${postId}`;
    } catch (error) {
      alert(error.message);
      location.href = "./list.html";
    }
  });
}

fillEditForm();
