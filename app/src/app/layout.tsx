import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lydie",
  description: "Lydie is color profiling tool.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-light-base-color h-screen w-screen">
        <div className="w-full h-[6%] px-3 flex items-center justify-center">
          <p className="text-light-main-color text-size-paragraph font-bold">
            Lydie
          </p>
        </div>
        {children}
      </body>
    </html>
  );
}
