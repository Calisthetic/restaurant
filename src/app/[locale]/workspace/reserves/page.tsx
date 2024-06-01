import { useTranslations } from "next-intl";
import { Suspense } from "react";
import ReservesWorkspace, { ReservesWorkspaceTranslations } from "./reserves";
import { NoAuthWorkspaceTranslations } from "@/components/no-auth";

export default function Workspace() {
  const t = useTranslations("workspace")
  const translations:ReservesWorkspaceTranslations = {
    reservesTitle: t("reserves-title"),
    reservesError: t("reserves-error"),
    reservesZero: t("reserves-zero")
  }
  const noAuth:NoAuthWorkspaceTranslations = {
    noAuth: t("no-auth"),
    toAuth: t("to-auth")
  }
  
  return (
    <main className='flex flex-col items-center'>
      <Suspense fallback={<div>Loading... </div>}>
        <ReservesWorkspace translations={translations} noAuth={noAuth}></ReservesWorkspace>
      </Suspense>
    </main>
  )
}