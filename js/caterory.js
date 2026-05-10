// 取得 URL 的 category 值
const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category");

// 顯示分類標題
document.getElementById("categoryTitle").innerText = category;

// 加入購物車
function addToCart(name, price, img) {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const exist = cart.find(p => p.name === name);
    if (exist) exist.qty++;
    else cart.push({ name, price, img, qty: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));

    // 更新購物車數量
    const total = cart.reduce((s, i) => s + i.qty, 0);
    document.getElementById("cartBadge").textContent = total;

    // 顯示提示
    showToast();
}

function showToast() {
    let toast = document.getElementById("toast");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast";
        toast.style.cssText = "position:fixed;bottom:30px;right:30px;background:#3d2b1a;color:#fff;padding:12px 22px;border-radius:30px;font-size:14px;z-index:9999;transition:all 0.3s;";
        toast.textContent = "已加入購物車 ✓";
        document.body.appendChild(toast);
    }
    toast.style.opacity = "1";
    setTimeout(() => toast.style.opacity = "0", 2000);
}

// 從後端抓全部商品
fetch("https://teacat-backend-1.onrender.com/products")
    .then(res => res.json())
    .then(data => {
        if (!data.success) return;

        const allProducts = data.products;
        const list = document.getElementById("productList");

        // 依分類篩選
        const filtered =
            category === "全部商品"
                ? allProducts
                : allProducts.filter(p => p.category === category);

        // 插入商品
        filtered.forEach(p => {
            list.innerHTML += `
                <div class="category-card">
                    <img src="${p.img}" alt="${p.name}">
                    <h5>${p.name}</h5>
                    <p class="price">$${p.price}</p>
                    <p class="rating">庫存：${p.stock}</p>
                    <button class="add-cart" onclick="addToCart('${p.name}', ${p.price}, '${p.img}')">加入購物車</button>
                </div>
            `;
        });
    });
