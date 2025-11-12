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
  title: "Samsara Group Canberra | SPL Season 2",
  description: "Official fixtures, league table, clubs, and sponsors of the Samsara Premier League Season 2, Canberra.",
  metadataBase: new URL("https://www.samsaragroup.com.au"),
  openGraph: {
    title: "Samsara Group Canberra | SPL Season 2",
    description: "Fostering community and promoting football across Canberra.",
    type: "website",
    url: "https://www.samsaragroup.com.au",
    siteName: "Samsara Group Canberra"
  },
  twitter: {
    card: "summary_large_image",
    title: "Samsara Group Canberra | SPL Season 2",
    description: "Official SPL fixtures, table, and clubs."
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}


