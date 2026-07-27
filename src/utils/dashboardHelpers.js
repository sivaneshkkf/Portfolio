// Shared pure-function helpers for the admin analytics dashboard.

// --- CSV export (no external dependency) ---
export function exportToCsv(filename, rows) {
  if (!rows || rows.length === 0) return;
  const headers = Object.keys(rows[0]);
  const escape = (val) => {
    const str = val === undefined || val === null ? "" : String(val);
    return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
  };
  const csv = [
    headers.join(","),
    ...rows.map((row) => headers.map((h) => escape(row[h])).join(",")),
  ].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// --- Firestore Timestamp (or raw Date) -> JS Date ---
export function toDate(timestamp) {
  if (!timestamp) return null;
  if (typeof timestamp.toDate === "function") return timestamp.toDate();
  if (typeof timestamp.seconds === "number") {
    return new Date(
      timestamp.seconds * 1000 + (timestamp.nanoseconds || 0) / 1e6
    );
  }
  const date = new Date(timestamp);
  return Number.isNaN(date.getTime()) ? null : date;
}

// --- bucket an array of docs (with createdAt) into counts per day ---
export function bucketByDay(docs, days = 14) {
  const buckets = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = days - 1; i >= 0; i--) {
    const day = new Date(today);
    day.setDate(day.getDate() - i);
    buckets.push({
      time: day.getTime(),
      label: day.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      count: 0,
    });
  }

  docs.forEach((d) => {
    const date = toDate(d.createdAt);
    if (!date) return;
    const day = new Date(date);
    day.setHours(0, 0, 0, 0);
    const bucket = buckets.find((b) => b.time === day.getTime());
    if (bucket) bucket.count += 1;
  });

  return buckets.map(({ label, count }) => ({ label, count }));
}

// --- relative time, e.g. "5m ago" ---
export function relativeTime(timestamp) {
  const date = toDate(timestamp);
  if (!date) return "";
  const diffSec = Math.round((Date.now() - date.getTime()) / 1000);
  if (diffSec < 5) return "just now";
  if (diffSec < 60) return `${diffSec}s ago`;
  const diffMin = Math.round(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.round(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDay = Math.round(diffHr / 24);
  if (diffDay < 7) return `${diffDay}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

// --- country ISO-2 code -> flag emoji ---
export function countryCodeToFlag(code) {
  if (!code || code.length !== 2) return null;
  return code
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
}

// --- normalize the two mixed location-doc shapes (Nominatim vs ipgeolocation.io) ---
export function normalizeLocation(loc) {
  const address = loc.address || {};
  return {
    country: address.country || loc.country_name || null,
    countryCode:
      (address.country_code || loc.country_code2 || "").toUpperCase() || null,
    state: address.state || loc.state_prov || null,
    city:
      address.city ||
      address.town ||
      address.village ||
      address.suburb ||
      loc.city ||
      null,
    lat: loc.lat || loc.latitude || null,
    lon: loc.lon || loc.longitude || null,
    ip: loc.ip || null,
    browser: loc.browser || null,
    device: loc.device || null,
    timezone: loc.timezone || null,
  };
}

// --- track which messages the admin has already opened (client-side only) ---
export const SEEN_MESSAGES_KEY = "dashboardSeenMessages";

export function getSeenMessageIds() {
  try {
    return new Set(JSON.parse(localStorage.getItem(SEEN_MESSAGES_KEY) || "[]"));
  } catch {
    return new Set();
  }
}

// --- lightweight user-agent parser (no dependency) ---
export function parseUserAgent(ua) {
  if (!ua) return { browser: "Unknown", device: "Unknown" };

  let browser = "Unknown";
  if (/Edg\//.test(ua)) browser = "Edge";
  else if (/Chrome\//.test(ua) && !/Chromium/.test(ua)) browser = "Chrome";
  else if (/Firefox\//.test(ua)) browser = "Firefox";
  else if (/Safari\//.test(ua) && !/Chrome/.test(ua)) browser = "Safari";
  else if (/OPR\//.test(ua)) browser = "Opera";

  let device = "Desktop";
  if (/Tablet|iPad/.test(ua)) device = "Tablet";
  else if (/Mobi|Android/.test(ua)) device = "Mobile";

  return { browser, device };
}
