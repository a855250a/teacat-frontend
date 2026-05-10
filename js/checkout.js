const BACKEND = "https://teacat-backend-1.onrender.com";
const cart = JSON.parse(localStorage.getItem("cart") || "[]");

// 渲染訂單明細
const box = document.getElementById("orderItems");
let total = 0;

if (!cart.length) {
  box.innerHTML = '<p style="color:var(--muted);font-size:14px;">購物車是空的</p>';
} else {
  let rows = cart.map(item => {
    const sub = item.price * item.qty;
    total += sub;
    return `<div class="order-row"><span>${item.name} × ${item.qty}</span><span>$${sub}</span></div>`;
  }).join("");
  rows += `<div class="order-row total"><span>總金額</span><span>$${total}</span></div>`;
  box.innerHTML = rows;
}

// 送出訂單
async function submitOrder() {
  const receiver = document.getElementById("receiver").value.trim();
  const phone    = document.getElementById("phone").value.trim();
  const address  = document.getElementById("address").value.trim();
  const msg      = document.getElementById("msg");
  const token    = localStorage.getItem("token");

  if (!token) {
    msg.style.color = "red";
    msg.innerText = "請先登入才能送出訂單";
    return;
  }

  if (!receiver || !phone || !address) {
    msg.style.color = "red";
    msg.innerText = "請完整填寫收件資訊";
    return;
  }

  if (!cart.length) {
    msg.style.color = "red";
    msg.innerText = "購物車是空的";
    return;
  }

  try {
    const res = await fetch(`${BACKEND}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({ items: cart, totalAmount: total, receiver, phone, address })
    });

    const data = await res.json();

    if (data.success) {
      localStorage.removeItem("cart");
      msg.style.color = "green";
      msg.innerText = "訂單送出成功！";
      setTimeout(() => {
        window.location.href = "order-detail.html";
      }, 1500);
    } else {
      msg.style.color = "red";
      msg.innerText = data.message || "送出失敗";
    }
  } catch (err) {
    msg.style.color = "red";
    msg.innerText = "網路錯誤，請稍後再試";
  }
}
