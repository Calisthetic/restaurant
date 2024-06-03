import { useLocale, useTranslations } from "next-intl";
import Link from "next/link"
import HeaderClient from "./headerClient";

export default function Header({hasAuth}:{hasAuth?:boolean}) {
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
  const authPaths = [
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
    {
      path: "/" + localActive + "/workspace",
      name: "workspace",
    },
    {
      path: "/" + localActive + "/workspace/profile",
      name: "workspace-profile",
    },
  ]
  
  return (
    <HeaderClient localActive={localActive} restaurant={useTranslations("data")("restaurant")}>
      {paths.map((item, index) => (<Link key={index} href={item.path}>{t(item.name)}</Link>))}
    </HeaderClient>
  )
}