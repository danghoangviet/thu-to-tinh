import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jules - AI Coding Assistant",
  description: "Jules does coding tasks you don't want to do.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-mesh min-h-screen text-white`}
      >
        <header className="w-full flex items-center justify-between p-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight">Jules</span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-300">
            <a href="#plans" className="hover:text-white transition-colors">
              Plans
            </a>
          </nav>
          <button className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
            Try Jules
          </button>
        </header>
        <main>{children}</main>
        <footer className="w-full border-t border-white/10 mt-24 py-8">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
            <p>© {new Date().getFullYear()} Jules</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-gray-300">Terms</a>
              <a href="#" className="hover:text-gray-300">Privacy</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
