async function requireLoggedIn() {
  const session = await getCurrentUser();

  if (!session.isLoggedIn) {
    alert("로그인이 필요합니다.");
    location.href = "./login.html";
    return null;
  }

  return session.user;
}

async function renderAuthArea() {
  const authArea = document.getElementById("authArea");

  if (!authArea) {
    return null;
  }

  try {
    const session = await getCurrentUser();
    authArea.innerHTML = "";

    if (session.isLoggedIn) {
      const welcome = document.createElement("span");
      welcome.className = "auth-welcome";
      welcome.textContent = `${session.user.name}님 로그인 중`;

      const changePasswordLink = document.createElement("a");
      changePasswordLink.href = "./change-password.html";
      changePasswordLink.className = "button-link secondary";
      changePasswordLink.textContent = "비밀번호 변경";

      const logoutButton = document.createElement("button");
      logoutButton.type = "button";
      logoutButton.className = "secondary";
      logoutButton.textContent = "로그아웃";
      logoutButton.addEventListener("click", async () => {
        await logOutUser();
        location.href = "./list.html";
      });

      authArea.append(welcome, changePasswordLink, logoutButton);
      return session.user;
    }

    const loginLink = document.createElement("a");
    loginLink.href = "./login.html";
    loginLink.className = "button-link";
    loginLink.textContent = "로그인";

    const signupLink = document.createElement("a");
    signupLink.href = "./signup.html";
    signupLink.className = "button-link secondary";
    signupLink.textContent = "회원가입";

    authArea.append(loginLink, signupLink);
    return null;
  } catch (error) {
    authArea.textContent = "로그인 정보를 불러오지 못했습니다.";
    return null;
  }
}
