import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Greetely Dashboard",
  description: "Enterprise level SaaS application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}