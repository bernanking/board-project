const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const rememberMe = document.getElementById("rememberMe").checked;

  try {
    await logInUser({
      username,
      password,
      rememberMe
    });

    alert("로그인되었습니다.");
    location.href = "./list.html";
  } catch (error) {
    alert(error.message);
  }
});

renderAuthArea();
