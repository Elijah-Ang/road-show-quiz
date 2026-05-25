const HEADERS = [
  "Timestamp",
  "Full Name",
  "Email",
  "Consent",
  "Lead Interested",
  "Dominant Letter",
  "Dominant Archetype",
  "Q1 Answer",
  "Q2 Answer",
  "Q3 Answer",
  "Q4 Answer",
  "Q5 Answer",
  "Score A",
  "Score B",
  "Score C",
  "Score D",
  "Score E",
  "Selected Answers JSON",
  "User Agent",
  "Page URL",
  "Received At"
];

function doPost(e) {
  try {
    const payload = parsePayload_(e);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
    }

    const selectedAnswers = Array.isArray(payload.selectedAnswers)
      ? payload.selectedAnswers
      : [];

    sheet.appendRow([
      safeValue_(payload.timestamp),
      safeValue_(payload.fullName),
      safeValue_(payload.email),
      Boolean(payload.consent),
      Boolean(payload.leadInterested),
      safeValue_(payload.dominantLetter),
      safeValue_(payload.dominantArchetype),
      safeValue_(payload.q1Answer),
      safeValue_(payload.q2Answer),
      safeValue_(payload.q3Answer),
      safeValue_(payload.q4Answer),
      safeValue_(payload.q5Answer),
      safeNumber_(payload.scoreA),
      safeNumber_(payload.scoreB),
      safeNumber_(payload.scoreC),
      safeNumber_(payload.scoreD),
      safeNumber_(payload.scoreE),
      JSON.stringify(selectedAnswers),
      safeValue_(payload.userAgent),
      safeValue_(payload.pageUrl),
      new Date().toISOString()
    ]);

    return jsonResponse_({
      ok: true,
      message: "Submission received"
    });
  } catch (error) {
    return jsonResponse_({
      ok: false,
      message: error && error.message ? error.message : "Submission failed"
    });
  }
}

function parsePayload_(e) {
  if (!e || !e.postData || !e.postData.contents) {
    return {};
  }

  try {
    return JSON.parse(e.postData.contents);
  } catch (error) {
    return {};
  }
}

function safeValue_(value) {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value);
}

function safeNumber_(value) {
  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : 0;
}

function jsonResponse_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
