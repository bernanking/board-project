const detailBox = document.getElementById("detailBox");
const editLink = document.getElementById("editLink");
const deleteBtn = document.getElementById("deleteBtn");

async function renderDetail() {
  const postId = getPostIdFromUrl();

  if (!postId) {
    detailBox.innerHTML = "<p>잘못된 접근입니다.</p>";
    editLink.style.display = "none";
    deleteBtn.style.display = "none";
    return;
  }

  try {
    const post = await increaseViews(postId);

    editLink.href = `./edit.html?id=${post.id}`;
    detailBox.innerHTML = `
      <h3 class="detail-title">${post.title}</h3>
      <div class="detail-meta">
        작성자: ${post.writer} | 작성일: ${post.createdAt} | 조회수: ${post.views}
      </div>
      <div class="detail-content">${post.content}</div>
    `;
  } catch (error) {
    detailBox.innerHTML = `<p>${error.message}</p>`;
    editLink.style.display = "none";
    deleteBtn.style.display = "none";
  }
}

deleteBtn.addEventListener("click", async function () {
  const postId = getPostIdFromUrl();

  if (!postId) {
    alert("잘못된 접근입니다.");
    location.href = "./list.html";
    return;
  }

  if (!confirm("정말 이 게시글을 삭제하시겠습니까?")) {
    return;
  }

  try {
    await deletePost(postId);
    alert("게시글이 삭제되었습니다.");
    location.href = "./list.html";
  } catch (error) {
    alert(error.message);
    location.href = "./list.html";
  }
});

renderDetail();
