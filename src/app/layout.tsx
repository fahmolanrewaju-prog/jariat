import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jariat",
  description: "Learn and explore Islamic videos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}