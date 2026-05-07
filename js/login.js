// login.js（會員登入）

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const msg = document.getElementById("msg");

  if (msg) msg.innerText = "登入中...";

  try {
    const res = await fetch("https://teacat-backend-1.onrender.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.success) {
      // ✅ 統一 token（重要🔥）
      localStorage.setItem("token", data.token);

      // ✅ 存會員資訊（給 member 頁用）
      localStorage.setItem("userInfo", JSON.stringify({
        email: email
      }));

      // 清掉管理員（避免混亂）
      localStorage.removeItem("adminToken");

      alert("會員登入成功");
      window.location.href = "index.html";

    } else {
      if (msg) msg.innerText = data.message;
    }

  } catch (err) {
    console.error(err);
    if (msg) msg.innerText = "登入失敗，請稍後再試";
  }
});