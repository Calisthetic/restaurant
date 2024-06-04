"use client"

import { useLocale } from "next-intl"
import { useEffect, useState } from "react"
import NoAuthWorkspace, { NoAuthWorkspaceTranslations } from "@/components/no-auth"
import Loading from "@/components/loading"
import Translate from "@/components/translate"
import Link from "next/link"

export type RecipesWorkspaceTranslations = {
  recipeIngredients:string
  recipeSteps:string
  recipeBack:string
  recipeError:string
}

type Dish = {
  "id": number,
  "name": string,
  "portions": number,
  "cook_time": number,
  "price": number,
  "user_first_name": string,
  "user_second_name": string,
  "dish_category_name": string,
  "ingredients": [{
    "id": number,
    "ingredient": string,
    "count": string
  }],
  "recipes": [{
    "id": number,
    "text": string
  }]
}

const RecipeWorkspace = (({translations, noAuth, dishId}
  :{translations:RecipesWorkspaceTranslations, noAuth:NoAuthWorkspaceTranslations, dishId:string}) => {
  const [recipe, setRecipe] = useState<Dish|null>()
  const [isUpdateRecipe, setIsUpdateRecipe] = useState(false)
  const localActive = useLocale()

  useEffect(() => {
    fetch("/api/recipes/" + dishId, {
      method: "GET"
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        throw Error("Something went wrong")
      }
    })
    .then(data => setRecipe(data))
    .catch(() => setRecipe(null))
  }, [isUpdateRecipe])

  const [isAuth, setIsAuth] = useState<boolean>()
  const [hasAuth, setHasAuth] = useState<boolean>(false)
  useEffect(() => {
    const role = localStorage.getItem("role-id")
    setIsAuth(role === "2" || role === "1")
    setHasAuth(role !== null)
  }, [])

  return isAuth === false ? (
    <NoAuthWorkspace translations={noAuth} hasAuth={hasAuth}></NoAuthWorkspace>
  ) :  isAuth ? 
    (recipe === undefined ? (
      <Loading className="m-20"></Loading>
    ) : recipe ? (
      <div className='lg:max-w-4xl md:max-w-3xl sm:max-w-2xl w-full'>
        <h1 className='text-center mt-16 mb-8 text-2xl sm:text-3xl lg:text-4xl font-bold font-minion'>
          <Translate to={localActive} text={recipe.name}></Translate>
        </h1>
        
        <div className="container grid gap-12 px-4 md:px-6">
          <div className="grid gap-6">
            <h2 className="text-2xl font-bold">{translations.recipeIngredients}</h2>
            <ul className="grid gap-2">
              {recipe.ingredients.map((item) => (
                <li key={item.id} className="flex items-center gap-2">
                  <CheckIcon className="h-4 w-4 mx-1.5" />
                  <div>
                    <Translate to={localActive} text={item.ingredient + " " + item.count}></Translate>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-6">
            <h2 className="text-2xl font-bold">{translations.recipeSteps}</h2>
            <ol className="grid gap-2">
              {
                recipe.recipes.map((item, index:number) => (
                  <li key={item.id} className="flex items-start gap-2">
                    <div className="rounded-full bg-foreground-primary min-h-7 min-w-7 py-1 text-sm 
                    font-medium text-background-primary text-center">{index+1}</div>
                    <div>
                      <Translate to={localActive} text={item.text}></Translate>
                    </div>
                  </li>
                ))
              }
            </ol>
          </div>
          <div className="flex justify-center mb-8">
            <Link className="p-[3px] relative" href={"/" + localActive + "/workspace/recipes"}>
              <div className="inset-0 p-0.5 w-fit bg-gradient-to-r from-teal-300 to-lime-300 rounded-lg">
                <div className="px-8 py-2 w-fit uppercase rounded-[6px] font-semibold hover:text-background-secondary bg-background-primary relative group transition duration-200 hover:bg-transparent">
                  {translations.recipeBack}
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    ) : (
      <h1 className='text-center my-16 text-xl sm:text-3xl lg:text-4xl font-bold font-minion'>{translations.recipeError}</h1>
    )
  ) : (
    <div></div>
  )
})

function CheckIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

export default RecipeWorkspace