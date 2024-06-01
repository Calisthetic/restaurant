import { useTranslations } from "next-intl";
import { Suspense } from "react";
import RecipeWorkspace, { RecipesWorkspaceTranslations } from "./recipe";
import { NoAuthWorkspaceTranslations } from "@/components/no-auth";

export default function Workspace({params}:{ params: { id: string }}) {
  const t = useTranslations("workspace")
  const recipesTranslations:RecipesWorkspaceTranslations = {
    recipeError:t("recipe-error"),
    recipeIngredients:t("recipe-ingredients"),
    recipeSteps:t("recipe-steps"),
    recipeBack:t("recipe-back")
  }
  const noAuth:NoAuthWorkspaceTranslations = {
    noAuth: t("no-auth"),
    toAuth: t("to-auth")
  }
  
  return (
    <main className='flex flex-col items-center'>
      <Suspense fallback={<div>Loading... </div>}>
        <RecipeWorkspace translations={recipesTranslations} noAuth={noAuth} dishId={params.id}></RecipeWorkspace>
      </Suspense>
    </main>
  )
}