async function requireLoggedIn() {
  const session = await getCurrentUser();

  if (!session.isLoggedIn) {
    alert("로그인이 필요합니다.");
    location.href = "./login.html";
    return null;
  }

  return session.user;
}

async function redirectToListIfLoggedIn() {
  const session = await getCurrentUser();

  if (session.isLoggedIn) {
    location.href = "./list.html";
    return true;
  }

  return false;
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
      authArea.className = "auth-area";

      const welcome = document.createElement("span");
      welcome.className = "auth-welcome badge rounded-pill text-bg-light border text-dark";
      welcome.textContent = `${session.user.name}님 로그인 중`;

      const changePasswordLink = document.createElement("a");
      changePasswordLink.href = "./change-password.html";
      changePasswordLink.className = "btn btn-outline-secondary btn-sm";
      changePasswordLink.textContent = "비밀번호 변경";

      const logoutButton = document.createElement("button");
      logoutButton.type = "button";
      logoutButton.className = "btn btn-danger btn-sm";
      logoutButton.textContent = "로그아웃";
      logoutButton.addEventListener("click", async () => {
        await logOutUser();
        location.href = "./login.html";
      });

      authArea.append(welcome, changePasswordLink, logoutButton);
      return session.user;
    }

    authArea.className = "auth-area d-none";
    return null;
  } catch (error) {
    authArea.textContent = "로그인 정보를 불러오지 못했습니다.";
    authArea.className = "auth-area text-secondary small";
    return null;
  }
}
