import type { Metadata } from "next";
import { Handlee } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const handlee = Handlee({
  weight: "400",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Psykiri",
  description: "Psychology by kiri",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="{handlee.className}">
      <body
        className={` ${handlee.className} antialiased`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
