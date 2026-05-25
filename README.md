# Road Show Quiz

Static retirement personality quiz intended for GitHub Pages hosting.

## Google Sheets Lead Capture Setup

1. Create a new Google Sheet for quiz leads.
2. In the Sheet, open `Extensions > Apps Script`.
3. Paste the contents of `google-apps-script-backend.gs` into the Apps Script editor.
4. Save the script.
5. Select `Deploy > New deployment`.
6. Choose `Web app`.
7. Set `Execute as` to `Me`.
8. Set `Who has access` to `Anyone`.
9. Deploy the Web App and copy the Web App URL.
10. Paste the Web App URL into `GOOGLE_SCRIPT_WEB_APP_URL` inside `interactive_retirement_quiz.html`.
11. Commit and push the updated files to GitHub.
12. Enable GitHub Pages from the repository settings.
13. Test a full quiz submission from the GitHub Pages URL.
14. Confirm the submitted row appears in Google Sheets.
15. Export or sync the Google Sheet as `.xlsx` when needed.

Opening `interactive_retirement_quiz.html` locally may work for basic testing, but final submission testing should be done from the GitHub Pages URL because that is the production environment.

Security and privacy notes:

- Do not put private API keys in frontend HTML.
- The Google Apps Script Web App URL will be visible in browser dev tools.
- This setup is suitable for simple lead capture, not sensitive financial data collection.
- Do not collect NRIC, income, bank details, medical data, or highly sensitive personal data through this simple setup.
