// =====================
// 1. 讀取購物車資料
// =====================
const cart = JSON.parse(localStorage.getItem("cart") || "[]");

// =====================
// 2. 渲染購物車內容
// =====================
function renderOrder() {
    const list = document.getElementById("orderItems");
    const totalText = document.getElementById("orderTotal");

    if (!cart.length) {
        list.innerHTML = `<p>購物車是空的。</p>`;
        totalText.innerText = "";
        return;
    }

    let total = 0;

    list.innerHTML = cart
        .map(item => {
            const sum = item.price * item.qty;
            total += sum;

            return `
                <div class="order-box">
                    <strong>${item.name}</strong> × ${item.qty}
                    <br>
                    小計：$${sum}
                </div>
            `;
        })
        .join("");

    totalText.innerText = "總金額：" + total + " 元";
}

renderOrder();

// =====================
// 3. 送出訂單（前端版，還沒串後端）
// =====================
function submitOrder() {
    const receiver = document.getElementById("receiver").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();
    const msg = document.getElementById("msg");

    if (!receiver || !phone || !address) {
        msg.style.color = "red";
        msg.innerText = "請完整填寫收件資訊";
        return;
    }

    if (!cart.length) {
        msg.style.color = "red";
        msg.innerText = "購物車目前為空，無法送出訂單";
        return;
    }

    // 目前先假裝成功（等你準備好再串 API）
    msg.style.color = "green";
    msg.innerText = "✔ 訂單已送出（目前為前端版本，尚未串後端）";

    // 送出後清空購物車
    localStorage.removeItem("cart");
}
