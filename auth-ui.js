document.addEventListener("DOMContentLoaded", () => {
  const loginLink = document.getElementById("loginLink");
  const registerLink = document.getElementById("registerLink");

  const memberMenu = document.getElementById("memberMenu");
  const adminMenu = document.getElementById("adminMenu");

  const userToken = localStorage.getItem("userToken");
  const adminToken = localStorage.getItem("adminToken");

  // 預設全部隱藏
  loginLink?.classList.add("hidden");
  registerLink?.classList.add("hidden");
  memberMenu?.classList.add("hidden");
  adminMenu?.classList.add("hidden");

  if (adminToken) {
    // 管理員登入
    adminMenu.classList.remove("hidden");
  } else if (userToken) {
    // 一般會員登入
    memberMenu.classList.remove("hidden");
  } else {
    // 未登入
    loginLink.classList.remove("hidden");
    registerLink.classList.remove("hidden");
  }

  // 登出
  document.getElementById("logoutUser")?.addEventListener("click", () => {
    localStorage.removeItem("userToken");
    location.reload();
  });

  document.getElementById("logoutAdmin")?.addEventListener("click", () => {
    localStorage.removeItem("adminToken");
    location.reload();
  });
});
