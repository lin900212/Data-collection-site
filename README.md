# 動作與思考研究｜招募工作台

GitHub Pages 是研究工作台的公開入口；實際登入與操作介面由 Google Apps Script 提供，因為 `google.script.run` 只能在 Apps Script HTML 服務頁面中安全呼叫。入口會保留 `action`、`t` 等郵件連結參數並轉送到工作台，因此研究者確認、受試者確認與改期連結仍可使用。

登入需要研究團隊信箱的一次性驗證碼。Apps Script 以管理者帳號執行，後端再依角色限制每位研究者可查看和修改的內容。此版本只連接測試表單、測試回覆表、測試工作流程資料庫與獨立測試日曆；測試模式的研究通知會轉寄至管理者測試信箱，不會寄給受試者。請勿將此頁當作正式招募入口。

`src/Index.html` 是 Apps Script 工作台介面的公開前端來源副本，不含研究者私人信箱、電話、招募海報、受試者資料或 Google 資料庫 ID。Apps Script 後端原始碼與 Google 資料庫 ID 不放在此 repo。更新介面後，請同步更新 `src/Index.html` 與私人專案的 `prototype/apps-script/Index.html`，再部署 Apps Script。
