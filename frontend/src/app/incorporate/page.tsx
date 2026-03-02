"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCompany } from "@/lib/api";
import { Button, Card, Input, PageWrapper, StepIndicator } from "@/components/ui";

export default function IncorporatePage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", shareholders_count: "", total_capital: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Company name is required";
    if (!form.shareholders_count) e.shareholders_count = "Required";
    else if (Number(form.shareholders_count) < 1) e.shareholders_count = "Must be at least 1";
    if (!form.total_capital) e.total_capital = "Required";
    else if (Number(form.total_capital) <= 0) e.total_capital = "Must be greater than 0";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) return setErrors(e);
    setLoading(true);
    setServerError("");
    try {
      const res = await createCompany({
        name: form.name.trim(),
        shareholders_count: Number(form.shareholders_count),
        total_capital: Number(form.total_capital),
      });
      router.push(`/incorporate/${res.data.id}/shareholders`);
    } catch (err: unknown) {
      setServerError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((p) => ({ ...p, [field]: e.target.value }));
    setErrors((p) => ({ ...p, [field]: "" }));
  };

  return (
    <PageWrapper>
      <StepIndicator current={1} />
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 32, marginBottom: 8 }}>Company Details</h1>
        <p style={{ color: "var(--text-muted)" }}>Tell us about the company you want to incorporate.</p>
      </div>
      <Card>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <Input
            label="Company Name"
            placeholder="e.g. Himalayan Ventures Pvt. Ltd."
            value={form.name}
            onChange={set("name")}
            error={errors.name}
          />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Input
              label="Number of Shareholders"
              type="number" min={1} placeholder="e.g. 3"
              value={form.shareholders_count}
              onChange={set("shareholders_count")}
              error={errors.shareholders_count}
            />
            <Input
              label="Total Capital (NPR)"
              type="number" min={1} placeholder="e.g. 500000"
              prefix="₨"
              value={form.total_capital}
              onChange={set("total_capital")}
              error={errors.total_capital}
            />
          </div>
          {serverError && (
            <div style={{ background: "var(--accent-light)", border: "1px solid #f0c0b0", borderRadius: "var(--radius-sm)", padding: "10px 14px", fontSize: 13, color: "var(--accent)" }}>
              {serverError}
            </div>
          )}
          <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: 8 }}>
            <Button onClick={handleSubmit} loading={loading} size="lg">
              Continue to Shareholders →
            </Button>
          </div>
        </div>
      </Card>
    </PageWrapper>
  );
}