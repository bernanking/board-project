const changePasswordForm = document.getElementById("changePasswordForm");

async function initializeChangePasswordPage() {
  const user = await renderAuthArea();

  if (!user) {
    alert("로그인이 필요합니다.");
    location.href = "./login.html";
  }
}

changePasswordForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const currentPassword = document.getElementById("currentPassword").value.trim();
  const newPassword = document.getElementById("newPassword").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();

  try {
    await changeUserPassword({
      currentPassword,
      newPassword,
      confirmPassword
    });

    alert("비밀번호가 변경되었습니다.");
    location.href = "./list.html";
  } catch (error) {
    alert(error.message);
  }
});

initializeChangePasswordPage();
