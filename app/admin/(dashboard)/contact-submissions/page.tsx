import { listContactSubmissions } from "@/lib/contact-submissions";
import { getSql } from "@/lib/db";

function formatWhen(iso: string): string {
  try {
    return new Date(iso).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}

export default async function AdminContactSubmissionsPage() {
  const hasDb = Boolean(getSql());
  const submissions = hasDb ? await listContactSubmissions(300) : [];

  return (
    <>
      <h1 className="admin-page-title">Contact form</h1>
      <p className="admin-page-desc">
        Enquiries submitted from the public <strong>/contact</strong> page. Newest first.
      </p>

      {!hasDb ? (
        <p className="admin-msg--err">
          Connect <code>DATABASE_URL</code> (or <code>POSTGRES_URL</code>) to store and view submissions.
        </p>
      ) : submissions.length === 0 ? (
        <div className="admin-card">
          <p className="admin-hint" style={{ margin: 0 }}>
            No submissions yet. They will appear here when someone completes the contact form.
          </p>
        </div>
      ) : (
        <div className="admin-list-card">
          <div className="overflow-x-auto">
            <table className="admin-table w-full">
              <thead>
                <tr>
                  <th>When</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th className="hidden md:table-cell">Phone</th>
                  <th className="hidden lg:table-cell">Service</th>
                  <th className="hidden xl:table-cell">Stage</th>
                  <th>Message</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((s) => (
                  <tr key={s.id}>
                    <td style={{ whiteSpace: "nowrap", fontSize: "0.8125rem", color: "#6b7280" }}>
                      {formatWhen(s.createdAt)}
                    </td>
                    <td>
                      <span className="admin-text-title">
                        {s.firstName} {s.lastName}
                      </span>
                    </td>
                    <td>
                      <a href={`mailto:${encodeURIComponent(s.email)}`}>{s.email}</a>
                    </td>
                    <td className="hidden md:table-cell" style={{ fontSize: "0.8125rem" }}>
                      {s.phone || "—"}
                    </td>
                    <td className="hidden lg:table-cell" style={{ fontSize: "0.8125rem" }}>
                      {s.service}
                    </td>
                    <td className="hidden xl:table-cell" style={{ fontSize: "0.8125rem" }}>
                      {s.stage}
                    </td>
                    <td style={{ maxWidth: "22rem", fontSize: "0.8125rem", color: "#4a5056" }} title={s.message}>
                      {s.message.length > 160 ? `${s.message.slice(0, 160)}…` : s.message}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
