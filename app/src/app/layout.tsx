import type { Metadata } from "next";
import "./globals.css";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { appWithTranslation } from 'next-i18next';

export const metadata: Metadata = {
  title: "Lydie",
  description: "Lydie is color profiling tool.",
};

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <I18nextProvider i18n={i18n}>
        <body className="bg-light-base-color h-screen w-screen">
          <div className="w-full h-[6%] px-3 flex items-center justify-center">
            <p className="text-light-main-color text-size-paragraph font-bold">
              Lydie
            </p>
          </div>
          {children}
        </body>
      </I18nextProvider>
    </html>
  );
}

export default appWithTranslation(RootLayout);
