const detailBox = document.getElementById("detailBox");
const editLink = document.getElementById("editLink");
const deleteBtn = document.getElementById("deleteBtn");

// URL에서 id 가져오기
function getPostIdFromUrl() {
  const params = new URLSearchParams(location.search);
  return Number(params.get("id"));
}

function renderDetail() {
  const postId = getPostIdFromUrl();

  if (!postId) {
    detailBox.innerHTML = "<p>잘못된 접근입니다.</p>";
    editLink.style.display = "none";
    deleteBtn.style.display = "none";
    return;
  }

  increaseViews(postId);

  const post = getPostById(postId);

  if (!post) {
    detailBox.innerHTML = "<p>게시글을 찾을 수 없습니다.</p>";
    editLink.style.display = "none";
    deleteBtn.style.display = "none";
    return;
  }

  editLink.href = `./edit.html?id=${post.id}`;

  detailBox.innerHTML = `
    <h3 class="detail-title">${post.title}</h3>
    <div class="detail-meta">
      작성자: ${post.writer} | 작성일: ${post.createdAt} | 조회수: ${post.views}
    </div>
    <div class="detail-content">${post.content}</div>
  `;
}

// 삭제 버튼 클릭 이벤트
deleteBtn.addEventListener("click", function () {
  const postId = getPostIdFromUrl();

  if (!postId) {
    alert("잘못된 접근입니다.");
    location.href = "./list.html";
    return;
  }

  const isConfirmed = confirm("정말 이 게시글을 삭제하시겠습니까?");

  if (!isConfirmed) {
    return;
  }

  const isDeleted = deletePost(postId);

  if (!isDeleted) {
    alert("삭제할 게시글을 찾을 수 없습니다.");
    location.href = "./list.html";
    return;
  }

  alert("게시글이 삭제되었습니다.");
  location.href = "./list.html";
});

renderDetail();