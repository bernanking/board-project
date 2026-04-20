const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();

  try {
    await signUpUser({
      username,
      password,
      confirmPassword,
      name,
      email
    });

    alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
    location.href = "./login.html";
  } catch (error) {
    alert(error.message);
  }
});

renderAuthArea();
