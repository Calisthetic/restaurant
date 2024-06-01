import { useTranslations } from "next-intl";
import { Suspense } from "react";
import UsersWorkspace, { UsersWorkspaceTranslations } from "./users";
import { NoAuthWorkspaceTranslations } from "@/components/no-auth";

export default function Workspace() {
  const t = useTranslations("workspace")
  const translations:UsersWorkspaceTranslations = {
    usersTitle: t("users-title"),
    usersError: t("users-error"),
    usersZero: t("users-zero")
  }
  const noAuth:NoAuthWorkspaceTranslations = {
    noAuth: t("no-auth"),
    toAuth: t("to-auth")
  }
  
  return (
    <main className='flex flex-col items-center'>
      <Suspense fallback={<div>Loading... </div>}>
        <UsersWorkspace translations={translations} noAuth={noAuth}></UsersWorkspace>
      </Suspense>
    </main>
  )
}