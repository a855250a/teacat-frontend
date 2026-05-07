console.log("admin.js loaded");

const CLOUD_NAME = "doank2a2z";
const UPLOAD_PRESET = "teacat";
const BACKEND_URL = "https://teacat-backend-1.onrender.com";

// 上傳圖片到 Cloudinary
async function uploadImage(file) {
  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const res = await fetch(url, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  if (data.secure_url) {
    return data.secure_url;
  } else {
    throw new Error("圖片上傳失敗");
  }
}

// 新增商品
document.getElementById("productForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const price = Number(document.getElementById("price").value);
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value;
  const stock = Number(document.getElementById("stock").value);
  const imgFile = document.getElementById("imgUpload").files[0];

  const msg = document.getElementById("msg");
  msg.innerText = "圖片上傳中...";

  try {
    // ① 上傳圖片
    const imgUrl = await uploadImage(imgFile);

    msg.innerText = "商品新增中...";

    // ② 新增商品到後端
    const res = await fetch(`${BACKEND_URL}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        price,
        category,
        img: imgUrl,          // ✅ 關鍵：跟後端一致
        description,
        stock,
      }),
    });

    const data = await res.json();

    if (data.success) {
      msg.innerText = "✅ 商品新增成功！";
      document.getElementById("productForm").reset();
    } else {
      msg.innerText = "❌ 新增失敗：" + data.message;
    }

  } catch (err) {
    msg.innerText = "❌ 錯誤：" + err.message;
  }
});
