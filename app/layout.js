import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SoundProvider } from "./contexts/SoundContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Tyler's Books",
  description: "A collection of books I've read",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <main className="bg-gradient-to-t from-slate-900 h-screen">
          <SoundProvider>{children}</SoundProvider>
        </main>
      </body>
    </html>
  );
}
