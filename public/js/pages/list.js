const postList = document.getElementById("postList");
const emptyMessage = document.getElementById("emptyMessage");

async function renderPostList() {
  try {
    const posts = await getPosts();

    postList.innerHTML = "";

    if (posts.length === 0) {
      emptyMessage.style.display = "block";
      return;
    }

    emptyMessage.style.display = "none";

    posts.forEach((post) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${post.id}</td>
        <td>
          <a href="detail.html?id=${post.id}" class="post-title-link">${post.title}</a>
        </td>
        <td>${post.writer}</td>
        <td>${post.createdAt}</td>
        <td>${post.views}</td>
      `;

      postList.appendChild(row);
    });
  } catch (error) {
    emptyMessage.style.display = "block";
    emptyMessage.textContent = error.message;
  }
}

renderPostList();
