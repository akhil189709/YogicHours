export type SheetKind = 'booking' | 'contact' | 'intake';

export type SubmitResult =
  | { ok: true }
  // `message` is only set when the sheet script rejected the input in a way the visitor can act on.
  | { ok: false; message?: string };

// Referenced literally so Next.js can inline it into the browser bundle at build time.
const SHEET_URL = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL;

const REQUEST_TIMEOUT_MS = 20000;

/**
 * Posts a form submission straight to the Google Apps Script web app (google-apps-script/Code.gs),
 * which appends it as a row on the tab for that form. No server route in between.
 */
export const submitToSheet = async (
  kind: SheetKind,
  data: Record<string, string | number>
): Promise<SubmitResult> => {
  if (!SHEET_URL) {
    console.error(
      `NEXT_PUBLIC_GOOGLE_SHEETS_URL is not set — the ${kind} form cannot save. Deploy ` +
        'google-apps-script/Code.gs as a Web app, paste its /exec URL into .env.local, then restart.'
    );
    return { ok: false };
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(SHEET_URL, {
      method: 'POST',
      // text/plain keeps this a "simple" cross-origin request. Apps Script cannot answer the CORS
      // preflight that application/json would trigger, so JSON here would be blocked by the browser.
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ kind, data }),
      redirect: 'follow',
      signal: controller.signal,
    });

    // Not JSON (e.g. Google's sign-in page) means the web app isn't shared with "Anyone".
    const result = (await response.json()) as { ok?: boolean; invalid?: boolean; error?: string };

    if (result.ok) return { ok: true };

    console.error(`The sheet script rejected the ${kind} submission:`, result.error);
    return { ok: false, message: result.invalid ? result.error : undefined };
  } catch (error) {
    console.error(
      `Could not reach the sheet script:`,
      error,
      '— if the Network tab shows 401/403 or a redirect to a Google sign-in page, redeploy the ' +
        'Apps Script web app with "Execute as: Me" and "Who has access: Anyone".'
    );
    return { ok: false };
  } finally {
    clearTimeout(timer);
  }
};
