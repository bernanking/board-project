const detailBox = document.getElementById("detailBox");
const editLink = document.getElementById("editLink");

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
    return;
  }

  increaseViews(postId);

  const post = getPostById(postId);

  if (!post) {
    detailBox.innerHTML = "<p>게시글을 찾을 수 없습니다.</p>";
    editLink.style.display = "none";
    return;
  }

  // 수정하기 버튼 클릭 시 edit.html?id=현재글번호 로 이동
  editLink.href = `./edit.html?id=${post.id}`;

  detailBox.innerHTML = `
    <h3 class="detail-title">${post.title}</h3>
    <div class="detail-meta">
      작성자: ${post.writer} | 작성일: ${post.createdAt} | 조회수: ${post.views}
    </div>
    <div class="detail-content">${post.content}</div>
  `;
}

renderDetail();