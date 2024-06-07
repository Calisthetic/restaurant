import { useTranslations } from "next-intl";
import { Suspense } from "react";
import { NoAuthWorkspaceTranslations } from "@/components/no-auth";
import VacancyWorkspace, { VacancyTranslations } from "./vacancy-client";

export default function Workspace() {
  const t = useTranslations("workspace")
  const translations:VacancyTranslations = {
    toProfile: t("button-profile"),
    vacancyError:t("vacancy-error"),
    vacancyTitle:t("vacancy-title"),
    vacancyDescription:t("vacancy-description"),
    vacancyPreview:t("vacancy-preview"),
    vacancyPrint:t("vacancy-print"),
  }
  const noAuth:NoAuthWorkspaceTranslations = {
    noAuth: t("no-auth"),
    wrongAuth: t("wrong-auth"),
    toAuth: t("to-auth")
  }
  
  return (
    <main className='flex flex-col items-center'>
      <Suspense fallback={<div></div>}>
        <VacancyWorkspace translations={translations} noAuth={noAuth}></VacancyWorkspace>
      </Suspense>
    </main>
  )
}