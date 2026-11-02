# 動作與思考研究｜招募工作台

此公開 repository 只承載瀏覽器前端。GitHub Pages 提供正式工作台入口；介面透過隱藏的 Apps Script HTML bridge 呼叫白名單中的後端方法。登入驗證、角色權限與資料讀寫由 Apps Script 後端檢查。

前端只包含建立橋接連線所需的正式 Apps Script `/exec` 網址。請勿在此 repository 放入登入憑證、研究者私人聯絡資訊、招募海報、參與者資料、身分證字號、地址、表單／試算表／日曆 ID 或 Apps Script 專案 ID。

`index.html` 是 GitHub Pages 使用的前端檔案；`src/Index.html` 是同步保留的前端副本。更新介面時，先在私有 repository 由正式 Apps Script UI 產生前端，檢查隱私掃描，再同步這兩個檔案至此 repository。不要把 Apps Script 伺服器原始碼或 `.clasp.json` 放進公開 repository。
