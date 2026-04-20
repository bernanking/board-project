async function requestUserApi(url, options = {}) {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "요청 처리에 실패했습니다.");
  }

  return data;
}

async function signUpUser(userData) {
  return requestUserApi("/api/users/signup", {
    method: "POST",
    body: JSON.stringify(userData)
  });
}

async function logInUser(loginData) {
  return requestUserApi("/api/users/login", {
    method: "POST",
    body: JSON.stringify(loginData)
  });
}

async function logOutUser() {
  return requestUserApi("/api/users/logout", {
    method: "POST"
  });
}

async function getCurrentUser() {
  return requestUserApi("/api/users/me");
}

async function findUserId(data) {
  return requestUserApi("/api/users/find-id", {
    method: "POST",
    body: JSON.stringify(data)
  });
}

async function changeUserPassword(data) {
  return requestUserApi("/api/users/password", {
    method: "PUT",
    body: JSON.stringify(data)
  });
}
