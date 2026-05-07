// 檢查登入
const token = localStorage.getItem("token"); // ✔ 改這個

if (!token) {
  alert("請先登入");
  location.href = "login.html";
}

// 顯示會員資料
const user = JSON.parse(localStorage.getItem("userInfo"));

if (user) {
  document.getElementById("userEmail").innerText = user.email;
}

// 登出
function logout() {
  localStorage.removeItem("userToken");
  localStorage.removeItem("userInfo");

  alert("已登出");
  location.href = "login.html";
}