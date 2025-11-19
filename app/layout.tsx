import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sunni Kumar | AI Software Engineer",
  description: "Premium AI & Software Solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground selection:bg-primary/30 selection:text-primary`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>

          {/* --- LIQUID BACKGROUND LAYER --- */}
          <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
            {/* Deep Void Base for Dark Mode / Light Base for Light Mode */}
            <div className="absolute inset-0 bg-background transition-colors duration-500" />

            {/* Liquid Orbs - Adjusted for Both Themes */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] animate-blob" />
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000" />
            <div className="absolute -bottom-8 left-1/3 w-96 h-96 bg-blue-400/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] animate-blob animation-delay-4000" />

            {/* Noise Overlay for Texture */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay" />
          </div>

          <main className="relative z-10 flex flex-col min-h-screen">
            {children}
          </main>

        </ThemeProvider>
      </body>
    </html>
  );
}