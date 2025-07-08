# Pendrive Order Site (Vite + Tailwind + Google Sheets)

## 🚀 Run Locally

```bash
npm install
npm run dev
```

Visit: http://localhost:5173

## 🧾 Google Sheets Integration

1. Create a new Google Sheet.
2. Go to **Extensions > Apps Script**.
3. Paste this code:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    new Date(),
    data.indexNumber,
    data.name,
    data.class,
    data.contact,
    data.quantity
  ]);
  return ContentService.createTextOutput("Success");
}
```

4. Save it, click **Deploy > New Deployment**.
5. Select **Web App**, give it a name, set access to **Anyone**, and **Deploy**.
6. Copy the Web App URL and replace it in `PendriveOrderForm.jsx`:

```js
fetch("https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec", ...)
```

Done! All form submissions go to your Google Sheet.