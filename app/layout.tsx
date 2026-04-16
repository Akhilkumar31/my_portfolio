import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Akhil Kumar Puri - Software Engineer",
  description:
    "Portfolio of Akhil Kumar Puri - Software Engineer specializing in Java, Spring Boot, Kafka & Cloud Infrastructure",
  keywords: [
    "Software Engineer",
    "Java",
    "Spring Boot",
    "Kafka",
    "AWS",
    "Kubernetes",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-body bg-background text-text-primary antialiased">
        {children}
      </body>
    </html>
  );
}
