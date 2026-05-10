// 檢查登入
const memberToken = localStorage.getItem("token");

if (!memberToken) {
  alert("請先登入");
  location.href = "login.html";
}

// 顯示會員資料
const memberInfo = JSON.parse(localStorage.getItem("userInfo"));

if (memberInfo) {
  document.getElementById("userEmail").innerText = memberInfo.email;
}

// 登出
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("userInfo");
  alert("已登出");
  location.href = "login.html";
}