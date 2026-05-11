# 茶貓商店 TeaCat Shop — 前台

一個貓咪用品電商網站，支援會員登入、商品瀏覽、購物車與線上下單，前後端分離架構。

🔗 **線上展示：** [https://teacat-frontend.onrender.com](https://teacat-frontend.onrender.com)

---

## 功能

- **會員系統**：註冊、登入、登出，JWT 驗證
- **商品瀏覽**：依分類篩選（飼料、玩具、貓砂、貓抓板、清潔用品、保健食品）
- **購物車**：新增、修改數量、移除商品，資料存於 localStorage
- **結帳下單**：填寫收件資訊送出訂單，串接後端 API
- **訂單查詢**：查看所有歷史訂單與單筆訂單明細
- **後台管理**：商品新增、管理員帳號管理（另有後台專案）

## 技術棧

| 項目 | 說明 |
|------|------|
| HTML / CSS / JavaScript | 純原生，無框架 |
| JWT | 會員身份驗證，token 存於 localStorage |
| Fetch API | 前後端資料溝通 |
| Cloudinary | 商品圖片托管 |
| Render | 靜態網站部署 |

## 頁面結構

```
html/
├── index.html          # 首頁（精選商品 + Banner）
├── category.html       # 分類商品列表
├── cart.html           # 購物車
├── checkout.html       # 結帳
├── order-detail.html   # 訂單列表 / 訂單明細
├── login.html          # 會員登入
├── register.html       # 會員註冊
├── member.html         # 會員中心
└── admin.html          # 後台管理
```

## 後端專案

後端 API 使用 Node.js + Express + MongoDB，部署於 Render。

👉 [teacat-backend](https://github.com/a855250a/teacat-backend)
