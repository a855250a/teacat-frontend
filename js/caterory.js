// 取得 URL 的 category 值
const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category");

// 顯示分類標題
document.getElementById("categoryTitle").innerText = category;

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
                    <button class="add-cart">加入購物車</button>
                </div>
            `;
        });
    });
