/** @format */

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { NeonAuthUIProvider, UserButton } from "@neondatabase/auth/react";
import { authClient } from "@/lib/auth/client";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Event Planner",
  description: "Plan and manage your events",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-(--color-background) text-(--color-foreground)">
        <NeonAuthUIProvider authClient={authClient}>
          <header className="border-b border-(--color-border) bg-(--color-surface)/90 backdrop-blur sticky top-0 z-50">
            <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4">
              <Link
                href="/"
                className="text-sm font-semibold tracking-wide text-(--color-foreground) hover:text-(--color-primary) transition-colors">
                Event Planner
              </Link>
              <nav className="flex items-center gap-4">
                <Link
                  href="/dashboard"
                  className="text-sm text-(--color-muted) hover:text-(--color-foreground) transition-colors">
                  Dashboard
                </Link>
                <UserButton size="icon" />
              </nav>
            </div>
          </header>

          <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-8">
            {children}
          </main>
        </NeonAuthUIProvider>
      </body>
    </html>
  );
}
