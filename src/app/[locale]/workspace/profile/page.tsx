import { useTranslations } from "next-intl";
import { Suspense } from "react";
import ProfileWorkspace, { ProfileWorkspaceTranslations } from "./profile-client";
import { NoAuthWorkspaceTranslations } from "@/components/no-auth";

export default function Workspace() {
  const t = useTranslations("workspace")
  const translations:ProfileWorkspaceTranslations = {
    profileError:t("profile-error"),
    profileButtonVacancy:t("profile-button-vacancy"),
    profileButtonSignout:t("profile-button-signout"),
    profileButtonUsers:t("profile-button-users"),
    profileButtonRecipes:t("profile-button-recipes"),
    profileButtonReserves:t("profile-button-reserves"),
  }
  const noAuth:NoAuthWorkspaceTranslations = {
    noAuth: t("no-auth"),
    wrongAuth: t("wrong-auth"),
    toAuth: t("to-auth")
  }
  
  return (
    <main className='flex flex-col items-center'>
      <Suspense fallback={<div></div>}>
        <ProfileWorkspace translations={translations} noAuth={noAuth}></ProfileWorkspace>
      </Suspense>
    </main>
  )
}