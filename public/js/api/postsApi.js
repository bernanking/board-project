async function request(url, options = {}) {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  if (response.status === 204) {
    return null;
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "요청 처리에 실패했습니다.");
  }

  return data;
}

async function getPosts() {
  return request("/api/posts");
}

async function getPostById(id) {
  return request(`/api/posts/${id}`);
}

async function addPost(postData) {
  return request("/api/posts", {
    method: "POST",
    body: JSON.stringify(postData)
  });
}

async function updatePost(id, updatedData) {
  return request(`/api/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify(updatedData)
  });
}

async function deletePost(id) {
  return request(`/api/posts/${id}`, {
    method: "DELETE"
  });
}

async function increaseViews(id) {
  return request(`/api/posts/${id}/view`, {
    method: "POST"
  });
}
