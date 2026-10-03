export function formatDate(iso: string | null | undefined): string {
  if (!iso) return "Not yet checked";
  const d = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

export function triLabel(v: "yes" | "no" | "unknown"): string {
  return v === "yes" ? "Yes" : v === "no" ? "No" : "Unverified";
}
