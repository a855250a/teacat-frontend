console.log("register.js loaded");

document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch("https://teacat-backend.onrender.com/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();
    document.getElementById("msg").innerText = data.message;

    if (data.success) {
        //1秒後跳轉到登入頁
        setTimeout(() => {
            window.location.href = "login.html";
        }, 1000);
    }
});
