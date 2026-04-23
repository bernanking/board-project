const detailBox = document.getElementById("detailBox");
const editLink = document.getElementById("editLink");
const deleteBtn = document.getElementById("deleteBtn");
const ownerActions = document.getElementById("ownerActions");

function renderError(message) {
  detailBox.innerHTML = "";
  const text = document.createElement("p");
  text.textContent = message;
  detailBox.appendChild(text);
}

function renderPost(post) {
  detailBox.innerHTML = "";

  const title = document.createElement("h3");
  title.className = "detail-title";
  title.textContent = post.title;

  const meta = document.createElement("div");
  meta.className = "detail-meta";
  meta.textContent = `작성자: ${post.writer} | 작성일: ${post.createdAt} | 조회수: ${post.views}`;

  const content = document.createElement("div");
  content.className = "detail-content";
  content.textContent = post.content;

  detailBox.append(title, meta, content);
}

async function renderDetail() {
  const postId = getPostIdFromUrl();

  if (!postId) {
    detailBox.innerHTML = "<p>잘못된 접근입니다.</p>";
    ownerActions.hidden = true;
    return;
  }

  try {
    await renderAuthArea();
    const post = await increaseViews(postId);

    editLink.href = `./edit.html?id=${post.id}`;
    ownerActions.hidden = !post.canEdit;
    renderPost(post);
  } catch (error) {
    renderError(error.message);
    ownerActions.hidden = true;
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
