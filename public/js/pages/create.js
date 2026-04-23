const createForm = document.getElementById("createForm");
const titleInput = document.getElementById("title");
const writerInput = document.getElementById("writer");
const contentInput = document.getElementById("content");

async function initializeCreatePage() {
  if (!writerInput) {
    return;
  }

  const user = await renderAuthArea();

  if (!user) {
    alert("로그인이 필요합니다.");
    location.href = "./login.html";
    return;
  }

  writerInput.value = user.username;
}

if (createForm && titleInput && contentInput) {
  createForm.addEventListener("submit", async function (event) {
    event.preventDefault();

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
}

initializeCreatePage();
