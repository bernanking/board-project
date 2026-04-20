const titleInput = document.getElementById("title");
const writerInput = document.getElementById("writer");
const contentInput = document.getElementById("content");
const saveBtn = document.getElementById("saveBtn");

async function initializeCreatePage() {
  const user = await renderAuthArea();

  if (!user) {
    alert("로그인이 필요합니다.");
    location.href = "./login.html";
    return;
  }

  writerInput.value = user.username;
}

saveBtn.addEventListener("click", async function () {
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();

  if (!title || !content) {
    alert("제목과 내용을 모두 입력해주세요.");
    return;
  }

  try {
    const newPost = await addPost({
      title,
      content
    });

    alert("게시글이 등록되었습니다.");
    location.href = `detail.html?id=${newPost.id}`;
  } catch (error) {
    alert(error.message);
  }
});

initializeCreatePage();
