import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Sample Shopping App",
  description: "Sample Shopping App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="flex flex-col justify-center min-h-screen">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
