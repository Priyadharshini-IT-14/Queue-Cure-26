export function tokenText(patient) {
  return patient?.token || "No token yet";
}

export function statusText(status) {
  return status ? status.replace("_", " ") : "-";
}

export function numberOrDash(value) {
  return value || value === 0 ? value : "-";
}

export function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
