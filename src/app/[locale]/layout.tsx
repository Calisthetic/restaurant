import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import Header from "@/components/header/header";
import { NextIntlClientProvider, useLocale, useTranslations } from "next-intl";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

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
  ]
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider>
          <Header restaurant={useTranslations("data")("restaurant")}>
            {paths.map((item, index) => (<Link key={index} href={item.path}>{t(item.name)}</Link>))}
          </Header>
        </NextIntlClientProvider>
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}