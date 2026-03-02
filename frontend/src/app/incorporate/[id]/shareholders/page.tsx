"use client";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { getCompanyById, saveShareholders } from "@/lib/api";
import { Company, ShareholderInput } from "@/types";
import { Button, Card, Input, PageWrapper, StepIndicator } from "@/components/ui";

const NATIONALITIES = ["Nepali","Indian","American","British","Chinese","Australian","Canadian","German","French","Japanese","Other"];
const emptyRow = (): ShareholderInput => ({ first_name: "", last_name: "", nationality: "" });

export default function ShareholdersPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [company, setCompany] = useState<Company | null>(null);
  const [shareholders, setShareholders] = useState<ShareholderInput[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    getCompanyById(id)
      .then((res) => {
        setCompany(res.data);
        const count = res.data.shareholders_count;
        const existing = res.data.shareholders ?? [];
        const rows: ShareholderInput[] = Array.from({ length: count }, (_, i) =>
          existing[i]
            ? { first_name: existing[i].first_name, last_name: existing[i].last_name, nationality: existing[i].nationality }
            : emptyRow()
        );
        setShareholders(rows);
      })
      .catch(() => router.push("/incorporate"))
      .finally(() => setFetchLoading(false));
  }, [id, router]);

  const setField = (index: number, field: keyof ShareholderInput, value: string) => {
    setShareholders((prev) => prev.map((s, i) => (i === index ? { ...s, [field]: value } : s)));
    setErrors((p) => ({ ...p, [`${index}_${field}`]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    shareholders.forEach((s, i) => {
      if (!s.first_name.trim()) e[`${i}_first_name`] = "Required";
      if (!s.last_name.trim()) e[`${i}_last_name`] = "Required";
      if (!s.nationality) e[`${i}_nationality`] = "Required";
    });
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) return setErrors(e);
    setLoading(true);
    setServerError("");
    try {
      await saveShareholders(id, shareholders);
      router.push(`/incorporate/${id}/success`);
    } catch (err: unknown) {
      setServerError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) return <PageWrapper><div style={{ textAlign: "center", paddingTop: 60, color: "var(--text-muted)" }}>Loading...</div></PageWrapper>;

  return (
    <PageWrapper>
      <StepIndicator current={2} />
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 32, marginBottom: 8 }}>Shareholders</h1>
        <p style={{ color: "var(--text-muted)" }}>
          Add details for all <strong style={{ color: "var(--text)" }}>{company?.shareholders_count}</strong> shareholder{company?.shareholders_count !== 1 ? "s" : ""} of{" "}
          <strong style={{ color: "var(--text)" }}>{company?.name}</strong>.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {shareholders.map((s, i) => (
          <Card key={i}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: "var(--accent)", marginBottom: 18 }}>
              SHAREHOLDER {i + 1}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <Input label="First Name" placeholder="Ram" value={s.first_name} onChange={(e) => setField(i, "first_name", e.target.value)} error={errors[`${i}_first_name`]} />
                <Input label="Last Name" placeholder="Bahadur" value={s.last_name} onChange={(e) => setField(i, "last_name", e.target.value)} error={errors[`${i}_last_name`]} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 13, fontWeight: 500, color: "var(--text-muted)", letterSpacing: "0.02em", textTransform: "uppercase" }}>Nationality</label>
                <select
                  value={s.nationality}
                  onChange={(e) => setField(i, "nationality", e.target.value)}
                  style={{ padding: "11px 14px", border: `1.5px solid ${errors[`${i}_nationality`] ? "var(--accent)" : "var(--border)"}`, borderRadius: "var(--radius-sm)", background: "var(--surface)", color: s.nationality ? "var(--text)" : "var(--text-muted)", fontSize: 15, fontFamily: "inherit", outline: "none", cursor: "pointer" }}
                >
                  <option value="">Select nationality…</option>
                  {NATIONALITIES.map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
                {errors[`${i}_nationality`] && <span style={{ fontSize: 12, color: "var(--accent)" }}>{errors[`${i}_nationality`]}</span>}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {serverError && (
        <div style={{ marginTop: 16, background: "var(--accent-light)", border: "1px solid #f0c0b0", borderRadius: "var(--radius-sm)", padding: "10px 14px", fontSize: 13, color: "var(--accent)" }}>
          {serverError}
        </div>
      )}

      <div style={{ marginTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Button variant="secondary" onClick={() => router.push("/incorporate")}>← Back</Button>
        <Button onClick={handleSubmit} loading={loading} size="lg">Submit Application</Button>
      </div>
    </PageWrapper>
  );
}