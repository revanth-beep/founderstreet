export async function patchSite(patch: Record<string, unknown>): Promise<void> {
  const res = await fetch("/api/admin/site", {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ patch }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(typeof data.error === "string" ? data.error : "Could not save changes.");
  }
}
