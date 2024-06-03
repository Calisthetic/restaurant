import { useTranslations } from "next-intl";
import { Suspense } from "react";
import ReservesWorkspace, { ReservesWorkspaceTranslations } from "./reserves";
import { NoAuthWorkspaceTranslations } from "@/components/no-auth";

export default function Workspace() {
  const t = useTranslations("workspace")
  const translations:ReservesWorkspaceTranslations = {
    toProfile: t("button-profile"),
    reservesTitle: t("reserves-title"),
    reservesError: t("reserves-error"),
    reservesZero: t("reserves-zero"),
    reservesDataName: t("reserves-data-name"),
    reservesDataPhone: t("reserves-data-phone"),
    reservesDataDatetime: t("reserves-data-datetime"),
    reservesDataMessage: t("reserves-data-message"),
    reservesDataPeople: t("reserves-data-people"),
    reservesDataTableName: t("reserves-data-table-name"),
  }
  const noAuth:NoAuthWorkspaceTranslations = {
    noAuth: t("no-auth"),
    wrongAuth: t("wrong-auth"),
    toAuth: t("to-auth")
  }
  
  return (
    <main className='flex flex-col items-center'>
      <Suspense fallback={<div></div>}>
        <ReservesWorkspace translations={translations} noAuth={noAuth}></ReservesWorkspace>
      </Suspense>
    </main>
  )
}