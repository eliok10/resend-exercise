import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resend Billing Failure Demo",
  description: "Sending billing failure email with Resend + React Email",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
