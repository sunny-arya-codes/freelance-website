import type { Metadata, Viewport } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import MenuBar from "@/components/MenuBar";
import Dock from "@/components/Dock";
import Chat from "@/components/Chat";

// Fonts
const inter = Inter({
  subsets: ["latin"],
  variable: '--font-sans',
  display: 'swap',
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "Sunni Kumar | AI/ML & Backend Engineer",
    template: "%s | Sunni Kumar"
  },
  description: "Personal portfolio of Sunni Kumar, an AI/ML & Backend Engineer specializing in building modern web applications and machine learning solutions.",
  keywords: ["Sunni Kumar", "Portfolio", "AI/ML Engineer", "Backend Developer", "Full Stack Developer"],
  authors: [{ name: "Sunni Kumar" }],
  creator: "Sunni Kumar",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
  ],
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
    { media: '(prefers-color-scheme: dark)', color: '#020617' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body 
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable,
          firaCode.variable,
          "bg-gradient-to-br from-background via-background/95 to-background/90"
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <MenuBar />
            <main className="flex-1 pt-16 pb-24 md:pb-32">
              {children}
            </main>
            <Dock />
            <Chat />
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
