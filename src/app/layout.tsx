import type { Metadata } from "next";
import './globals.css';

export const metadata: Metadata = {
  title: "Chawakorn Todo App",
  description: "A simple todo app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-gray-300">
        {children}
      </body>
    </html>
  );
}
