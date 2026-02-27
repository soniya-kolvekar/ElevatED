import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "ElevatED - AI-Driven Campus Placement ERP",
    description: "Institutional, AI-driven, and real-time student placement tracking and opportunity match engine.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className} bg-[#f8f6f0]`}>
                <main className="min-h-screen text-gray-800">
                    {children}
                </main>
            </body>
        </html>
    );
}
