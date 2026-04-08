const STORAGE_KEY = "simple_board_posts";

// 처음 실행 시 샘플 데이터 넣기
function initializePosts() {
  const savedPosts = localStorage.getItem(STORAGE_KEY);

  if (!savedPosts) {
    const samplePosts = [
      {
        id: 1,
        title: "첫 번째 게시글입니다",
        writer: "관리자",
        content: "안녕하세요. 게시판에 오신 것을 환영합니다.",
        createdAt: "2026-04-05",
        views: 0
      },
      {
        id: 2,
        title: "두 번째 게시글입니다",
        writer: "요한",
        content: "게시판 수정 기능을 실습하는 중입니다.",
        createdAt: "2026-04-05",
        views: 0
      }
    ];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(samplePosts));
  }
}

// 전체 게시글 조회
function getPosts() {
  const posts = localStorage.getItem(STORAGE_KEY);
  return posts ? JSON.parse(posts) : [];
}

// 전체 게시글 저장
function savePosts(posts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

// 게시글 1개 조회
function getPostById(id) {
  const posts = getPosts();
  return posts.find((post) => post.id === id);
}

// 새 ID 생성
function getNextId() {
  const posts = getPosts();

  if (posts.length === 0) {
    return 1;
  }

  const maxId = Math.max(...posts.map((post) => post.id));
  return maxId + 1;
}

// 오늘 날짜 구하기
function getToday() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const date = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${date}`;
}

// 게시글 추가
function addPost(postData) {
  const posts = getPosts();

  const newPost = {
    id: getNextId(),
    title: postData.title,
    writer: postData.writer,
    content: postData.content,
    createdAt: getToday(),
    views: 0
  };

  posts.unshift(newPost);
  savePosts(posts);

  return newPost;
}

// 게시글 수정
function updatePost(id, updatedData) {
  const posts = getPosts();
  let updatedPost = null;

  const updatedPosts = posts.map((post) => {
    if (post.id === id) {
      updatedPost = {
        ...post,
        title: updatedData.title,
        writer: updatedData.writer,
        content: updatedData.content
      };
      return updatedPost;
    }

    return post;
  });

  savePosts(updatedPosts);
  return updatedPost;
}

// 조회수 증가
function increaseViews(id) {
  const posts = getPosts();

  const updatedPosts = posts.map((post) => {
    if (post.id === id) {
      return {
        ...post,
        views: post.views + 1
      };
    }

    return post;
  });

  savePosts(updatedPosts);
}

// 처음 실행
initializePosts();