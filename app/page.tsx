"use client";

import { useState } from "react";

export default function HomePage() {
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  async function handleSend() {
    setIsSending(true);
    setStatus(null);
    try {
      const res = await fetch("/api/send-billing-failure", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
   
          email: "eliosilva.mail@gmail.com",
          customerName: "Test Customer",
          last4: "1234",
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        console.error(json);
        setStatus("Error sending email (check console).");
      } else {
        setStatus("Email sent! Check your inbox (or spam).");
      }
    } catch (err) {
      console.error(err);
      setStatus("Unexpected error sending email.");
    } finally {
      setIsSending(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "12px",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <h1>Billing Failure Email Demo</h1>
      <button
        onClick={handleSend}
        disabled={isSending}
        style={{
          padding: "10px 16px",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer",
        }}
      >
        {isSending ? "Sending..." : "Send test billing failure email"}
      </button>
      {status && <p>{status}</p>}
    </main>
  );
}
