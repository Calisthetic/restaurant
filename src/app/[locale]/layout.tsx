import type { Metadata } from "next";
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
  const t = useTranslations('header');
  const localActive = useLocale();
  
  const paths = [
    {
      path: "/" + localActive + "/menu",
      name: "menu",
    },
    {
      path: "/" + localActive + "/gallery",
      name: "gallery",
    },
    {
      path: "/" + localActive + "/sign-in",
      name: "staff",
    },
  ]
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider>
          <Header localActive={localActive} restaurant={useTranslations("data")("restaurant")}>
            {paths.map((item, index) => (<Link key={index} href={item.path}>{t(item.name)}</Link>))}
          </Header>
        </NextIntlClientProvider>
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}
