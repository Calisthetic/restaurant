import { Suspense } from "react";
import UsersWorkspace, { Role, UsersWorkspaceTranslations } from "./users";
import { NoAuthWorkspaceTranslations } from "@/components/no-auth";
import { getTranslations } from "next-intl/server";

async function getRoles(): Promise<Role[]> {
  const res = await fetch(process.env.API_URL + "/api/roles", {
    method: "GET"
  });
  if (!res.ok) {
    return []
  }
  const data:Role[] = await res.json();
  return data
}

export default async function Workspace() {
  const t = await getTranslations("workspace")
  const translations:UsersWorkspaceTranslations = {
    toProfile: t("button-profile"),
    buttonAdd: t("button-add"),
    buttonOk: t("button-ok"),
    usersTitle: t("users-title"),
    usersError: t("users-error"),
    usersZero: t("users-zero"),
    usersDataName:t("users-data-name"),
    usersDataEmail:t("users-data-email"),
    usersDataLogin:t("users-data-login"),
    usersDataPassword:t("users-data-password"),
    usersDataRole:t("users-data-role"),
    
    usersNew:t("users-new"),
    usersSelectRole:t("users-select-role"),
    usersDeleteError:t("users-delete-error"),
  }
  const noAuth:NoAuthWorkspaceTranslations = {
    noAuth: t("no-auth"),
    wrongAuth: t("wrong-auth"),
    toAuth: t("to-auth")
  }
  
  const roles = await getRoles()

  return (
    <main className='flex flex-col items-center'>
      <Suspense fallback={<div></div>}>
        <UsersWorkspace translations={translations} noAuth={noAuth} roles={roles}></UsersWorkspace>
      </Suspense>
    </main>
  )
}