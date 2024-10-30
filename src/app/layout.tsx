import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Marc Bau NTTDATA",
    default: "Marc Bau",
  },
  description: "Este es mi portfolio personal IA con un chatbot integrado",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class">
        <Navbar />
        <main className="mx-auto max-w-3xl px-3 py-10">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
