const findIdForm = document.getElementById("findIdForm");
const resultBox = document.getElementById("resultBox");

if (findIdForm && resultBox) {
  findIdForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();

    try {
      const result = await findUserId({ name, email });
      resultBox.textContent = `찾은 아이디: ${result.maskedUsername}`;
    } catch (error) {
      resultBox.textContent = error.message;
    }
  });
}

renderAuthArea();
