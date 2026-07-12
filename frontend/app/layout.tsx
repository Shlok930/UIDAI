import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aadhaar InsightX — National Intelligence Platform",
  description: "AI-powered Aadhaar enrolment & update analytics for UIDAI policy decisions",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
