import Link from "next/link";
import { NavBar } from "@/components/ui";

export default function Home() {
  return (
    <>
      <NavBar />
      <main
        style={{
          minHeight: "calc(100vh - 60px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 24px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 80, height: 80, borderRadius: "50%",
            border: "2px solid var(--border)",
            display: "flex", alignItems: "center", justifyContent: "center",
            marginBottom: 32, fontSize: 32,
          }}
        >
          🏛️
        </div>

        <h1 style={{ fontSize: "clamp(36px, 6vw, 60px)", marginBottom: 16, maxWidth: 560 }}>
          Register your company{" "}
          <em style={{ color: "var(--accent)", fontStyle: "italic" }}>in minutes</em>
        </h1>

        <p style={{ fontSize: 17, color: "var(--text-muted)", marginBottom: 40, maxWidth: 440, lineHeight: 1.7 }}>
          A simple two-step process to incorporate your business and register shareholders.
        </p>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          <Link
            href="/incorporate"
            style={{
              background: "var(--accent)", color: "#fff",
              padding: "13px 32px", borderRadius: "var(--radius-sm)",
              fontSize: 15, fontWeight: 600,
            }}
          >
            Start Incorporating →
          </Link>
          <Link
            href="/admin"
            style={{
              background: "var(--surface)", color: "var(--text)",
              padding: "13px 32px", borderRadius: "var(--radius-sm)",
              fontSize: 15, fontWeight: 500, border: "1px solid var(--border)",
            }}
          >
            View Admin
          </Link>
        </div>

        <div
          style={{
            marginTop: 72,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 20, maxWidth: 560, width: "100%",
          }}
        >
          {[
            { step: "01", title: "Company Details", desc: "Name, capital & shareholder count" },
            { step: "02", title: "Add Shareholders", desc: "Fill in each shareholder's info" },
          ].map((item) => (
            <div
              key={item.step}
              style={{
                background: "var(--surface)", border: "1px solid var(--border)",
                borderRadius: "var(--radius)", padding: "24px 20px", textAlign: "left",
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "var(--accent)", marginBottom: 10 }}>
                STEP {item.step}
              </div>
              <div style={{ fontFamily: "DM Serif Display, serif", fontSize: 18, marginBottom: 6 }}>
                {item.title}
              </div>
              <div style={{ fontSize: 13, color: "var(--text-muted)" }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}