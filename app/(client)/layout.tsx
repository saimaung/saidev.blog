import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import { clsx } from "clsx";
import "./globals.css";

import Navbar from "../../components/Navbar";
import { ThemeProvider } from "../../components/theme-provider";

const firaCode = Fira_Code( { subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sai Blogs",
  description: "With 💙",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx(firaCode.className, "h-full") }>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="mx-auto max-w-5xl px-6">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
