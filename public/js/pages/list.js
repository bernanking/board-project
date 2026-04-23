const postList = document.getElementById("postList");
const emptyMessage = document.getElementById("emptyMessage");
const writeLink = document.getElementById("writeLink");

function createCell(text) {
  const td = document.createElement("td");
  td.textContent = text;
  return td;
}

async function renderPostList() {
  try {
    const currentUser = await requireLoggedIn();

    if (!currentUser) {
      return;
    }

    await renderAuthArea();
    const posts = await getPosts();

    postList.innerHTML = "";
    writeLink.style.display = "inline-block";

    if (posts.length === 0) {
      emptyMessage.style.display = "block";
      return;
    }

    emptyMessage.style.display = "none";

    posts.forEach((post) => {
      const row = document.createElement("tr");
      const titleCell = document.createElement("td");
      const titleLink = document.createElement("a");

      titleLink.href = `detail.html?id=${post.id}`;
      titleLink.className = "post-title-link";
      titleLink.textContent = post.title;
      titleCell.appendChild(titleLink);

      row.appendChild(createCell(String(post.id)));
      row.appendChild(titleCell);
      row.appendChild(createCell(post.writer));
      row.appendChild(createCell(post.createdAt));
      row.appendChild(createCell(String(post.views)));

      postList.appendChild(row);
    });
  } catch (error) {
    emptyMessage.style.display = "block";
    emptyMessage.textContent = error.message;
  }
}

renderPostList();
