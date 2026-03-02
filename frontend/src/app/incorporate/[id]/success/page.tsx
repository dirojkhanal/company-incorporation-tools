"use client";
import { use, useEffect, useState } from "react";
import Link from "next/link";
import { getCompanyById } from "@/lib/api";
import { Company } from "@/types";
import { NavBar } from "@/components/ui";

export default function SuccessPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [company, setCompany] = useState<Company | null>(null);

  useEffect(() => {
    getCompanyById(id).then((r) => setCompany(r.data)).catch(() => {});
  }, [id]);

  return (
    <>
      <NavBar />
      <main style={{ minHeight: "calc(100vh - 60px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "48px 24px", textAlign: "center" }}>
        <div style={{ width: 72, height: 72, borderRadius: "50%", background: "var(--success-bg)", border: "2px solid #a8d5b5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, marginBottom: 28 }}>
          ✓
        </div>

        <h1 style={{ fontSize: 40, marginBottom: 12 }}>Application Submitted!</h1>

        {company && (
          <p style={{ fontSize: 17, color: "var(--text-muted)", marginBottom: 8 }}>
            <strong style={{ color: "var(--text)" }}>{company.name}</strong> has been registered with{" "}
            <strong style={{ color: "var(--text)" }}>{company.shareholders_count}</strong> shareholder{company.shareholders_count !== 1 ? "s" : ""}.
          </p>
        )}

        <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 40, fontFamily: "monospace", background: "var(--surface-2)", padding: "6px 14px", borderRadius: 6 }}>
          ID: {id}
        </p>

        {company?.shareholders && company.shareholders.length > 0 && (
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "20px 24px", marginBottom: 36, width: "100%", maxWidth: 420, textAlign: "left" }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: "var(--accent)", marginBottom: 14 }}>SHAREHOLDERS REGISTERED</div>
            {company.shareholders.map((s, i) => (
              <div key={s.id} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: i < company.shareholders.length - 1 ? "1px solid var(--border)" : "none", fontSize: 14 }}>
                <span style={{ fontWeight: 500 }}>{s.first_name} {s.last_name}</span>
                <span style={{ color: "var(--text-muted)", fontSize: 12 }}>{s.nationality}</span>
              </div>
            ))}
          </div>
        )}

        <div style={{ display: "flex", gap: 12 }}>
          <Link href="/incorporate" style={{ background: "var(--accent)", color: "#fff", padding: "12px 28px", borderRadius: "var(--radius-sm)", fontSize: 14, fontWeight: 600 }}>Register Another</Link>
          <Link href="/admin" style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)", padding: "12px 28px", borderRadius: "var(--radius-sm)", fontSize: 14, fontWeight: 500 }}>View All Companies</Link>
        </div>
      </main>
    </>
  );
}