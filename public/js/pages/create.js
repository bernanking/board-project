const titleInput = document.getElementById("title");
const writerInput = document.getElementById("writer");
const contentInput = document.getElementById("content");
const saveBtn = document.getElementById("saveBtn");

saveBtn.addEventListener("click", async function () {
  const title = titleInput.value.trim();
  const writer = writerInput.value.trim();
  const content = contentInput.value.trim();

  if (!title || !writer || !content) {
    alert("제목, 작성자, 내용을 모두 입력해주세요.");
    return;
  }

  try {
    const newPost = await addPost({
      title,
      writer,
      content
    });

    alert("게시글이 등록되었습니다.");
    location.href = `detail.html?id=${newPost.id}`;
  } catch (error) {
    alert(error.message);
  }
});
