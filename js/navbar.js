// navbar.js

const token = localStorage.getItem("token");
const adminToken = localStorage.getItem("adminToken");
const user = JSON.parse(localStorage.getItem("userInfo") || "{}");

const loginLink = document.getElementById("loginLink");
const registerLink = document.getElementById("registerLink");
const memberMenu = document.getElementById("memberMenu");
const adminMenu = document.getElementById("adminMenu");
const navEmail = document.getElementById("navEmail");
const memberTrigger = document.getElementById("memberTrigger");

// 預設全部隱藏
loginLink.classList.add("hidden");
registerLink.classList.add("hidden");
memberMenu.classList.add("hidden");
adminMenu.classList.add("hidden");

// 判斷登入狀態
if (adminToken) {
  adminMenu.classList.remove("hidden");
} else if (token) {
  memberMenu.classList.remove("hidden");
  if (user.name) {
    const title = user.gender === "male" ? "先生" : "小姐";
    navEmail.innerText = user.name + " " + title;
  } else if (user.email) {
    navEmail.innerText = user.email;
  }
} else {
  loginLink.classList.remove("hidden");
  registerLink.classList.remove("hidden");
}

// dropdown
memberTrigger?.addEventListener("click", (e) => {
  e.stopPropagation();
  memberMenu.classList.toggle("open");
});

document.addEventListener("click", () => {
  memberMenu.classList.remove("open");
});

// 登出
document.getElementById("logoutBtn")?.addEventListener("click", () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userInfo");
  location.reload();
});

document.getElementById("adminLogoutBtn")?.addEventListener("click", () => {
  localStorage.removeItem("adminToken");
  location.reload();
});

// 購物車 badge
const cart = JSON.parse(localStorage.getItem("cart") || "[]");
const total = cart.reduce((s, i) => s + i.qty, 0);
const badge = document.getElementById("cartBadge");
if (badge) badge.textContent = total;