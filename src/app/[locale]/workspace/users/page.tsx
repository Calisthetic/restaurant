import { useTranslations } from "next-intl";
import { Suspense } from "react";
import UsersWorkspace, { UsersWorkspaceTranslations } from "./users";
import { NoAuthWorkspaceTranslations } from "@/components/no-auth";

export default function Workspace() {
  const t = useTranslations("workspace")
  const translations:UsersWorkspaceTranslations = {
    usersTitle: t("users-title"),
    usersError: t("users-error"),
    usersZero: t("users-zero"),
    usersDataName:t("users-data-name"),
    usersDataEmail:t("users-data-email"),
    usersDataLogin:t("users-data-login"),
    usersDataPassword:t("users-data-password"),
    usersDataRole:t("users-data-role"),
  }
  const noAuth:NoAuthWorkspaceTranslations = {
    noAuth: t("no-auth"),
    wrongAuth: t("wrong-auth"),
    toAuth: t("to-auth")
  }
  
  return (
    <main className='flex flex-col items-center'>
      <Suspense fallback={<div></div>}>
        <UsersWorkspace translations={translations} noAuth={noAuth}></UsersWorkspace>
      </Suspense>
    </main>
  )
}