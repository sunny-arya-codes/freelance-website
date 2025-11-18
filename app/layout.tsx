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
  title: "Sunni Kumar - Portfolio",
  description: "Building digital experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-white/20 selection:text-white`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          
          {/* Deep Space Background */}
          <div className="fixed inset-0 -z-50 bg-black" />
          
          {/* Subtle Animated Gradient Orbs - More spread out and slower */}
          <div className="fixed inset-0 -z-40 overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-purple-900/20 blur-[120px] animate-blob" />
            <div className="absolute top-[40%] right-[-10%] w-[400px] h-[400px] rounded-full bg-blue-900/10 blur-[120px] animate-blob animation-delay-2000" />
            <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] rounded-full bg-indigo-900/10 blur-[120px] animate-blob animation-delay-4000" />
          </div>

          {/* Noise Texture - Essential for the premium feel */}
          <div className="fixed inset-0 -z-30 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay" />

          <main className="relative z-10 flex flex-col min-h-screen">
            {children}
          </main>

        </ThemeProvider>
      </body>
    </html>
  );
}