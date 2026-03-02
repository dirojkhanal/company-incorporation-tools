"use client";
import React from "react";
import Link from "next/link";

//  Button 
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  loading,
  children,
  disabled,
  style,
  ...props
}: ButtonProps) {
  const base: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    fontFamily: "inherit",
    fontWeight: 500,
    borderRadius: "var(--radius-sm)",
    border: "none",
    cursor: disabled || loading ? "not-allowed" : "pointer",
    transition: "all 0.15s ease",
    whiteSpace: "nowrap",
    opacity: disabled || loading ? 0.6 : 1,
  };

  const sizes: Record<string, React.CSSProperties> = {
    sm: { fontSize: 13, padding: "6px 14px" },
    md: { fontSize: 14, padding: "10px 20px" },
    lg: { fontSize: 15, padding: "13px 28px" },
  };

  const variants: Record<string, React.CSSProperties> = {
    primary: { background: "var(--accent)", color: "#fff" },
    secondary: {
      background: "var(--surface-2)",
      color: "var(--text)",
      border: "1px solid var(--border)",
    },
    ghost: { background: "transparent", color: "var(--text-muted)" },
  };

  return (
    <button
      disabled={disabled || loading}
      style={{ ...base, ...sizes[size], ...variants[variant], ...style }}
      {...props}
    >
      {loading && (
        <span
          style={{
            width: 14,
            height: 14,
            border: "2px solid currentColor",
            borderTopColor: "transparent",
            borderRadius: "50%",
            display: "inline-block",
            animation: "spin 0.7s linear infinite",
          }}
        />
      )}
      {children}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </button>
  );
}

// Input
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  prefix?: string;
}

export function Input({ label, error, prefix, style, ...props }: InputProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {label && (
        <label
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: "var(--text-muted)",
            letterSpacing: "0.02em",
            textTransform: "uppercase",
          }}
        >
          {label}
        </label>
      )}
      <div style={{ position: "relative" }}>
        {prefix && (
          <span
            style={{
              position: "absolute",
              left: 12,
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--text-muted)",
              fontSize: 14,
              pointerEvents: "none",
            }}
          >
            {prefix}
          </span>
        )}
        <input
          style={{
            width: "100%",
            padding: prefix ? "11px 14px 11px 28px" : "11px 14px",
            border: `1.5px solid ${error ? "var(--accent)" : "var(--border)"}`,
            borderRadius: "var(--radius-sm)",
            background: "var(--surface)",
            color: "var(--text)",
            outline: "none",
            transition: "border-color 0.15s",
            ...style,
          }}
          {...props}
        />
      </div>
      {error && (
        <span style={{ fontSize: 12, color: "var(--accent)" }}>{error}</span>
      )}
    </div>
  );
}

//  Card 
interface CardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export function Card({ children, style, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        padding: 28,
        boxShadow: "var(--shadow)",
        cursor: onClick ? "pointer" : undefined,
        transition: onClick ? "box-shadow 0.15s, transform 0.15s" : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// Badge
interface BadgeProps {
  status: "draft" | "completed";
}

export function Badge({ status }: BadgeProps) {
  const styles: Record<string, React.CSSProperties> = {
    draft: {
      background: "var(--warning-bg)",
      color: "var(--warning)",
      border: "1px solid #f0c060",
    },
    completed: {
      background: "var(--success-bg)",
      color: "var(--success)",
      border: "1px solid #a8d5b5",
    },
  };

  return (
    <span
      style={{
        fontSize: 12,
        fontWeight: 600,
        padding: "3px 10px",
        borderRadius: 20,
        letterSpacing: "0.04em",
        textTransform: "capitalize",
        ...styles[status],
      }}
    >
      {status}
    </span>
  );
}

// StepIndicator 
interface StepIndicatorProps {
  current: 1 | 2;
}

export function StepIndicator({ current }: StepIndicatorProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 36 }}>
      {[1, 2].map((step, i) => (
        <React.Fragment key={step}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              opacity: step > current ? 0.4 : 1,
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background:
                  step === current
                    ? "var(--accent)"
                    : step < current
                    ? "var(--success)"
                    : "var(--surface-2)",
                color: step <= current ? "#fff" : "var(--text-muted)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              {step < current ? "✓" : step}
            </div>
            <span
              style={{
                fontSize: 13,
                fontWeight: step === current ? 600 : 400,
                color: step === current ? "var(--text)" : "var(--text-muted)",
              }}
            >
              {step === 1 ? "Company Details" : "Shareholders"}
            </span>
          </div>
          {i < 1 && (
            <div
              style={{
                flex: 1,
                height: 1,
                background: current > 1 ? "var(--success)" : "var(--border)",
                margin: "0 16px",
                minWidth: 40,
              }}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

// NavBar
export function NavBar() {
  return (
    <header
      style={{
        background: "var(--surface)",
        borderBottom: "1px solid var(--border)",
        padding: "0 32px",
        height: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <Link
        href="/"
        style={{
          fontFamily: "DM Serif Display, serif",
          fontSize: 20,
          color: "var(--text)",
        }}
      >
        Incorporate<span style={{ color: "var(--accent)" }}>.</span>
      </Link>
      <nav style={{ display: "flex", gap: 24, alignItems: "center" }}>
        <Link
          href="/incorporate"
          style={{ fontSize: 14, color: "var(--text-muted)", fontWeight: 500 }}
        >
          New Company
        </Link>
        <Link
          href="/admin"
          style={{ fontSize: 14, color: "var(--text-muted)", fontWeight: 500 }}
        >
          Admin
        </Link>
      </nav>
    </header>
  );
}

// PageWrapper 
export function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      <main
        style={{ maxWidth: 680, margin: "0 auto", padding: "48px 24px 80px" }}
      >
        {children}
      </main>
    </>
  );
}
