/**
 * Yogic Hours — saves the website's Booking, Contact and Health Intake forms into this spreadsheet.
 *
 * SETUP (once)
 *  1. Open your Google Sheet → Extensions → Apps Script.
 *     Delete whatever code is there and paste this whole file. Save.
 *  2. Choose "setup" in the function dropdown → Run → approve the permission prompt.
 *     This creates the "Bookings", "Contact Messages" and "Health Intake" tabs with headers.
 *  3. Deploy → New deployment → type "Web app"
 *       Execute as:      Me
 *       Who has access:  Anyone
 *     Copy the Web app URL (it ends in /exec).
 *  4. Put that URL in the website's .env.local:
 *       NEXT_PUBLIC_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/.../exec
 *     Then restart the dev server (or rebuild for production).
 *
 * Changed this script later? Deploy → Manage deployments → Edit (pencil) → Version: New version
 * → Deploy. Otherwise the live URL keeps running the old code. The URL stays the same.
 *
 * The browser calls this URL directly, so visitors can see it in the network tab. That is fine:
 * this script only ever appends rows, and validates everything it receives.
 */

// The columns of each tab, in order. The `key` is the field name the website sends.
const TABS = {
  booking: {
    name: 'Bookings',
    columns: [
      ['Submitted At', null],
      ['Name', 'name'],
      ['Email', 'email'],
      ['Session Type', 'type'],
      ['Preferred Date', 'date'],
      ['Time Slot', 'timeSlot'],
      ['Fee (INR)', 'fee'],
      ['Notes / Health Concerns', 'notes'],
    ],
  },
  contact: {
    name: 'Contact Messages',
    columns: [
      ['Submitted At', null],
      ['Name', 'name'],
      ['Email', 'email'],
      ['Subject', 'subject'],
      ['Message', 'message'],
    ],
  },
  intake: {
    name: 'Health Intake',
    columns: [
      ['Submitted At', null],
      ['Name', 'name'],
      ['Email', 'email'],
      ['Phone', 'phone'],
      ['Age', 'age'],
      ['Experience Level', 'experience'],
      ['Primary Goal', 'goal'],
      ['Health Conditions / Injuries', 'conditions'],
      ['Medications', 'medications'],
      ['Preferred Format', 'format'],
      ['Preferred Time', 'preferredTime'],
      ['Anything Else', 'notes'],
    ],
  },
};

// Receives a form submission from the website.
function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    const payload = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    const tab = TABS[payload.kind];
    if (!tab) return respond({ ok: false, error: 'Unknown form type: ' + payload.kind });

    const data = payload.data || {};
    if (!text(data.name)) return invalid('Please enter your name.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text(data.email)))
      return invalid('Please enter a valid email address.');

    // Two people submitting at the same instant must not write to the same row.
    lock.waitLock(20000);
    addRow(tab, data);
    return respond({ ok: true });
  } catch (error) {
    return respond({ ok: false, error: String(error) });
  } finally {
    if (lock.hasLock()) lock.releaseLock();
  }
}

// Open the /exec URL in a browser to check WHICH version of this script is live.
// It lists the form types this deployment understands. If "intake" is missing from that list,
// the deployment is running older code: Deploy > Manage deployments > Edit (pencil) >
// Version: New version > Deploy.
function doGet() {
  return respond({
    ok: true,
    message: 'Yogic Hours form endpoint is live.',
    accepts: Object.keys(TABS),
  });
}

// Run this once from the editor to create both tabs and grant permission.
function setup() {
  Object.keys(TABS).forEach(function (kind) {
    sheetFor(TABS[kind]);
  });
}

function addRow(tab, data) {
  const sheet = sheetFor(tab);
  const values = tab.columns.map(function (column) {
    return column[1] === null ? new Date() : text(data[column[1]]).slice(0, 5000);
  });

  const range = sheet.getRange(sheet.getLastRow() + 1, 1, 1, values.length);
  // Formatting the cells as plain text BEFORE writing means a visitor typing "=HYPERLINK(...)"
  // into a form is stored as harmless text instead of running as a formula.
  range.setNumberFormats([
    tab.columns.map(function (column) {
      return column[1] === null ? 'dd mmm yyyy, hh:mm AM/PM' : '@';
    }),
  ]);
  range.setValues([values]);
}

// Returns the tab, creating it with its header row the first time.
function sheetFor(tab) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(tab.name) || spreadsheet.insertSheet(tab.name);

  if (sheet.getLastRow() === 0) {
    const headers = tab.columns.map(function (column) {
      return column[0];
    });
    sheet
      .getRange(1, 1, 1, headers.length)
      .setValues([headers])
      .setFontWeight('bold')
      .setFontColor('#ffffff')
      .setBackground('#143024');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function text(value) {
  return value === undefined || value === null ? '' : String(value).trim();
}

// `invalid: true` tells the website this message is safe to show to the visitor.
function invalid(message) {
  return respond({ ok: false, invalid: true, error: message });
}

function respond(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(
    ContentService.MimeType.JSON
  );
}
