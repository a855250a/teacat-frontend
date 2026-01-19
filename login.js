// login.js（會員登入）

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const msg = document.getElementById("msg");

  msg.innerText = "登入中...";

  try {
    const res = await fetch("https://teacat-backend-1.onrender.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.success) {
      // ✅ 只存 userToken（關鍵）
      localStorage.setItem("userToken", data.token);
      localStorage.removeItem("adminToken"); // 保險

      alert("會員登入成功");
      window.location.href = "index.html";
    } else {
      msg.innerText = data.message;
    }
  } catch (err) {
    msg.innerText = "登入失敗，請稍後再試";
  }
});
