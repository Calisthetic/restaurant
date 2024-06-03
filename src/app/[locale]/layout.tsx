import { Lora } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import Header from "@/components/header/header";
import { NextIntlClientProvider, useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

const inter = Lora({ subsets: ["latin"] });

export async function generateMetadata() {
  const t = await getTranslations("header");

  return {
    title: t('title'),
    description: t("description"),
    icons: {
      icon: '/logo.png',
    },
  };
}

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}


export default function RootLayout({
  children,
  params: { locale },
}: Readonly<RootLayoutProps>) {
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
