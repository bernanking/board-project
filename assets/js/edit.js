const titleInput = document.getElementById("title");
const writerInput = document.getElementById("writer");
const contentInput = document.getElementById("content");
const updateBtn = document.getElementById("updateBtn");

// URL에서 게시글 id 읽기
function getPostIdFromUrl() {
  const params = new URLSearchParams(location.search);
  return Number(params.get("id"));
}

// 기존 게시글 내용을 input에 채워 넣기
function fillEditForm() {
  const postId = getPostIdFromUrl();

  if (!postId) {
    alert("잘못된 접근입니다.");
    location.href = "./list.html";
    return;
  }

  const post = getPostById(postId);

  if (!post) {
    alert("게시글을 찾을 수 없습니다.");
    location.href = "./list.html";
    return;
  }

  titleInput.value = post.title;
  writerInput.value = post.writer;
  contentInput.value = post.content;
}

// 수정 완료 버튼 클릭
updateBtn.addEventListener("click", function () {
  const postId = getPostIdFromUrl();

  const title = titleInput.value.trim();
  const writer = writerInput.value.trim();
  const content = contentInput.value.trim();

  if (title === "" || writer === "" || content === "") {
    alert("제목, 작성자, 내용을 모두 입력해주세요.");
    return;
  }

  const updatedPost = updatePost(postId, {
    title: title,
    writer: writer,
    content: content
  });

  if (!updatedPost) {
    alert("수정할 게시글을 찾을 수 없습니다.");
    location.href = "./list.html";
    return;
  }

  alert("게시글이 수정되었습니다.");
  location.href = `./detail.html?id=${postId}`;
});

// 페이지가 열리면 기존 값 먼저 보여주기
fillEditForm();