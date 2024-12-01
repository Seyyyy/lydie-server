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
        <div className="w-full h-[54px] flex items-center justify-between fixed z-10 bg-gradient-to-b from-black/75 px-6">
          <p className="text-light-base-color-light text-size-paragraph font-bold">
            Lydie
          </p>
        </div>
        {children}
        <p className="text-light-main-color text-center text-xs py-2">Lydie</p>
      </body>
    </html>
  );
}
