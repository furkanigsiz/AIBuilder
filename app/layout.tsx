import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Builder - Yapay Zeka ile Web Geliştirme",
  description: "Yapay zeka araçlarını kullanarak kod yazmadan web siteleri ve uygulamalar geliştirmeyi öğrenin. Modern AI framework'leri ile projelerinizi hayata geçirin.",
  keywords: "yapay zeka, web geliştirme, AI framework, no-code, low-code, eğitim, öğretim",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
} 