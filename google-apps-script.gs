/**
 * CLEAR FLOW — Contact Form to Google Sheet
 * --------------------------------------------------
 * SETUP:
 * 1. Open your Google Sheet (the one where you want responses saved)
 * 2. Extensions -> Apps Script
 * 3. Delete any existing code, paste this whole file
 * 4. Click Deploy -> New deployment
 *      - Type: Web app
 *      - Execute as: Me
 *      - Who has access: Anyone
 * 5. Click Deploy, authorize permissions when asked
 * 6. Copy the "Web app URL" it gives you — that goes into main.js
 *
 * NOTE: Every time you EDIT this script, you must create a NEW deployment
 * (or "Manage deployments" -> edit -> New version) for changes to go live.
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      new Date(),
      data.name || '',
      data.phone || '',
      data.email || '',
      data.interest || '',
      data.message || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: lets you test the deployment URL by just opening it in browser
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'Clear Flow contact endpoint is live' }))
    .setMimeType(ContentService.MimeType.JSON);
}
