# 動作與思考研究｜招募工作台

GitHub Pages 僅提供工作台前端；Google Apps Script 負責登入驗證、角色權限，以及測試表單、工作流程試算表、郵件和測試日曆操作。Apps Script 原始碼不放在此公開 repo。

此版本只連接測試表單、測試回覆表、測試工作流程資料庫與獨立測試日曆。測試模式的研究通知會轉寄至管理者測試信箱，不會寄給受試者。請勿將此頁當作正式招募入口。

公開前端不含研究者私人信箱、電話、海報、受試者資料或 Google 資料庫 ID。登入後，後端依管理者或研究者角色限制可讀取與修改的資料；身分證字號與戶籍地址僅管理者權限可讀取。

Google Apps Script 橋接頁只接受 GitHub Pages 與本機開發頁來源，並限制可呼叫的 API。更新前端時，在私人 `Data-collection` 專案執行 `node prototype/public-site/build-public-site.mjs`，再更新此 repo 的 `index.html` 和 `bridge-client.js`。
