const backendURL = "https://teacat-backend-1.onrender.com";

// ========== 1. 新增管理者 ==========
document.getElementById("adminCreateForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const res = await fetch(`${backendURL}/admin/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    document.getElementById("msg").innerText = data.message;

    if (data.success) {
        loadAdminList(); // ⭐ 重新載入列表
        document.getElementById("adminCreateForm").reset();
    }
});


// ========== 2. 載入管理者列表 ==========
async function loadAdminList() {
    const res = await fetch(`${backendURL}/admin/all`);
    const data = await res.json();

    const list = document.getElementById("adminList");
    list.innerHTML = ""; // 清空

    if (!data.success || data.admins.length === 0) {
        list.innerHTML = "<p>目前沒有管理者</p>";
        return;
    }

    data.admins.forEach(admin => {
        const item = document.createElement("div");
        item.classList.add("admin-item");

        item.innerHTML = `
            <span>${admin.username}</span>
            <button class="delete-btn" data-id="${admin._id}">刪除</button>
        `;

        list.appendChild(item);
    });

    // ========== 3. 綁定刪除按鈕 ==========
    document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.addEventListener("click", async function () {
            const id = this.dataset.id;

            if (!confirm("確定要刪除此管理者嗎？")) return;

            const res = await fetch(`${backendURL}/admin/delete/${id}`, {
                method: "DELETE"
            });

            const result = await res.json();
            alert(result.message);

            loadAdminList(); // ⭐ 刪除後重新載入列表
        });
    });
}


// 頁面載入就執行
loadAdminList();
