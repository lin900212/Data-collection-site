# 動作與思考研究｜招募工作台

此公開 repository 只承載測試版瀏覽器前端。GitHub Pages 提供介面；介面透過隱藏的 Apps Script HTML bridge 呼叫白名單中的後端方法。登入驗證、角色權限與資料讀寫都由 Apps Script 後端檢查。

前端需要公開測試版 Apps Script Web App 的 `/exec` 網址來建立連線。請勿在此 repository 放入登入憑證、研究者私人聯絡資訊、招募海報、參與者資料、身分證字號、地址、表單／試算表／日曆 ID 或 Apps Script 專案 ID。此網站與後端只連接隔離測試資源，不是正式招募入口。

`index.html` 是 GitHub Pages 使用的前端檔案；`src/Index.html` 是同步保留的介面來源副本。更新介面後，先在私有 repository 產生並檢查前端，再同步這兩個檔案至此 repository。
