"use client";
import { useEffect, useState } from "react";
import { getAllCompanies } from "@/lib/api";
import { Company } from "@/types";
import { Badge, NavBar } from "@/components/ui";

function formatCapital(n: number) {
  return new Intl.NumberFormat("en-NP", { style: "currency", currency: "NPR", maximumFractionDigits: 0 }).format(n);
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
}

export default function AdminPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Company | null>(null);

  useEffect(() => {
    getAllCompanies().then((r) => setCompanies(r.data)).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <NavBar />
      <main style={{ maxWidth: 960, margin: "0 auto", padding: "48px 24px 80px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
          <div>
            <h1 style={{ fontSize: 36, marginBottom: 6 }}>All Companies</h1>
            <p style={{ color: "var(--text-muted)" }}>{companies.length} registration{companies.length !== 1 ? "s" : ""} total</p>
          </div>
          <a href="/incorporate" style={{ background: "var(--accent)", color: "#fff", padding: "10px 22px", borderRadius: "var(--radius-sm)", fontSize: 14, fontWeight: 600 }}>+ New Company</a>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", paddingTop: 60, color: "var(--text-muted)" }}>Loading…</div>
        ) : companies.length === 0 ? (
          <div style={{ textAlign: "center", paddingTop: 60, color: "var(--text-muted)" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🏛️</div>
            <p>No companies yet.</p>
          </div>
        ) : (
          <div style={{ display: "flex", gap: 24 }}>
            <div style={{ flex: 1 }}>
              <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", overflow: "hidden", boxShadow: "var(--shadow)" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto auto", gap: 16, padding: "12px 20px", borderBottom: "1px solid var(--border)", background: "var(--surface-2)", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: "var(--text-muted)", textTransform: "uppercase" }}>
                  <span>Company</span>
                  <span style={{ textAlign: "right" }}>Capital</span>
                  <span style={{ textAlign: "center" }}>Status</span>
                  <span style={{ textAlign: "right" }}>Date</span>
                </div>

                {companies.map((c, i) => (
                  <div
                    key={c.id}
                    onClick={() => setSelected(selected?.id === c.id ? null : c)}
                    style={{ display: "grid", gridTemplateColumns: "1fr auto auto auto", gap: 16, padding: "14px 20px", borderBottom: i < companies.length - 1 ? "1px solid var(--border)" : "none", cursor: "pointer", background: selected?.id === c.id ? "var(--accent-light)" : "transparent", alignItems: "center" }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>{c.name}</div>
                      <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{c.shareholders_count} shareholder{c.shareholders_count !== 1 ? "s" : ""}</div>
                    </div>
                    <span style={{ fontSize: 13, color: "var(--text-muted)", textAlign: "right" }}>{formatCapital(c.total_capital)}</span>
                    <span style={{ display: "flex", justifyContent: "center" }}><Badge status={c.status} /></span>
                    <span style={{ fontSize: 12, color: "var(--text-muted)", textAlign: "right", whiteSpace: "nowrap" }}>{formatDate(c.created_at)}</span>
                  </div>
                ))}
              </div>
            </div>

            {selected && (
              <div style={{ width: 280, flexShrink: 0 }}>
                <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: 24, boxShadow: "var(--shadow)", position: "sticky", top: 80 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                    <h3 style={{ fontSize: 18 }}>{selected.name}</h3>
                    <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", fontSize: 18 }}>×</button>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
                    {[
                      { label: "Status", value: <Badge status={selected.status} /> },
                      { label: "Capital", value: formatCapital(selected.total_capital) },
                      { label: "Registered", value: formatDate(selected.created_at) },
                    ].map(({ label, value }) => (
                      <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 500 }}>{label}</span>
                        <span style={{ fontSize: 13 }}>{value}</span>
                      </div>
                    ))}
                  </div>

                  {selected.shareholders.length > 0 && (
                    <>
                      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: "var(--accent)", marginBottom: 12 }}>SHAREHOLDERS</div>
                      {selected.shareholders.map((s) => (
                        <div key={s.id} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid var(--border)", fontSize: 13 }}>
                          <span style={{ fontWeight: 500 }}>{s.first_name} {s.last_name}</span>
                          <span style={{ color: "var(--text-muted)", fontSize: 12 }}>{s.nationality}</span>
                        </div>
                      ))}
                    </>
                  )}

                  {selected.status === "draft" && (
                    <a href={`/incorporate/${selected.id}/shareholders`} style={{ display: "block", marginTop: 20, background: "var(--accent)", color: "#fff", padding: "10px 0", borderRadius: "var(--radius-sm)", textAlign: "center", fontSize: 13, fontWeight: 600 }}>
                      Resume Draft →
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </>
  );
}
