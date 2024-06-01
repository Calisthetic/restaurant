import { useTranslations } from "next-intl";
import { Suspense } from "react";
import RecipesWorkspace, { RecipesWorkspaceTranslations } from "./recipes";
import { NoAuthWorkspaceTranslations } from "@/components/no-auth";

export default function Workspace() {
  const t = useTranslations("workspace")
  const recipesTranslations:RecipesWorkspaceTranslations = {
    recipesError: t("recipes-error"),
    recipesTitle: t("recipes-title"),
    recipesZero: t("recipes-zero"),
    recipesIngredients1: t("recipes-ingredients-1"),
    recipesIngredients2: t("recipes-ingredients-2"),
    recipesIngredients3: t("recipes-ingredients-3"),
    recipesPortions1: t("recipes-portions-1"),
    recipesPortions2: t("recipes-portions-2"),
    recipesPortions3: t("recipes-portions-3"),
    recipesHours1: t("recipes-hours-1"),
    recipesHours2: t("recipes-hours-2"),
    recipesHours3: t("recipes-hours-3"),
    recipesMinutes1: t("recipes-minutes-1"),
    recipesMinutes2: t("recipes-minutes-2"),
    recipesMinutes3: t("recipes-minutes-3"),
    recipesButton: t("recipes-button")
  }
  const noAuth:NoAuthWorkspaceTranslations = {
    noAuth: t("no-auth"),
    toAuth: t("to-auth")
  }
  
  return (
    <main className='flex flex-col items-center'>
      <Suspense fallback={<div>Loading... </div>}>
        <RecipesWorkspace translations={recipesTranslations} noAuth={noAuth}></RecipesWorkspace>
      </Suspense>
    </main>
  )
}