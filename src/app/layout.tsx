import type { Metadata } from "next";
import { CartProvider } from "@/contexts/cart-context";
import { defaultLocale, t } from "@/lib/i18n";
import "./globals.css";

export const metadata: Metadata = {
  title: t("app.title"),
  description: t("app.description"),
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={defaultLocale}>
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
