// admin-login.js（管理員登入）

document.getElementById("adminLoginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch("https://teacat-backend-1.onrender.com/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();

  if (data.success) {
    // 🔴 重點：只存 adminToken
    localStorage.setItem("adminToken", data.token);
    localStorage.removeItem("userToken"); // 保險

    alert("管理員登入成功");
    location.href = "admin.html";
  } else {
    alert(data.message);
  }
});
