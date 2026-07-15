import type { Metadata } from "next";
import "./globals.css";
import {ToastContainer} from "react-toastify";

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
        <ToastContainer />
      </body>
    </html>
  );
}