const titleInput = document.getElementById("title");
const writerInput = document.getElementById("writer");
const contentInput = document.getElementById("content");
const updateBtn = document.getElementById("updateBtn");

async function fillEditForm() {
  const postId = getPostIdFromUrl();

  if (!postId) {
    alert("잘못된 접근입니다.");
    location.href = "./list.html";
    return;
  }

  try {
    const post = await getPostById(postId);

    titleInput.value = post.title;
    writerInput.value = post.writer;
    contentInput.value = post.content;
  } catch (error) {
    alert(error.message);
    location.href = "./list.html";
  }
}

updateBtn.addEventListener("click", async function () {
  const postId = getPostIdFromUrl();
  const title = titleInput.value.trim();
  const writer = writerInput.value.trim();
  const content = contentInput.value.trim();

  if (!title || !writer || !content) {
    alert("제목, 작성자, 내용을 모두 입력해주세요.");
    return;
  }

  try {
    await updatePost(postId, {
      title,
      writer,
      content
    });

    alert("게시글이 수정되었습니다.");
    location.href = `./detail.html?id=${postId}`;
  } catch (error) {
    alert(error.message);
    location.href = "./list.html";
  }
});

fillEditForm();
