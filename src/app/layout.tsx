import type { Metadata } from "next";
import "./globals.css";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "sonner";

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
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}