"use client"

import { useLocale } from "next-intl"
import style from "./recipes.module.css"
import { useEffect, useState } from "react"
import Translate from "@/components/translate"
import Link from "next/link"
import NoAuthWorkspace, { NoAuthWorkspaceTranslations } from "@/components/no-auth"
import Loading from "@/components/loading"
import modifyTextForNumber from "@/utils/modifyText"

export type RecipesWorkspaceTranslations = {
  recipesTitle:string
  recipesError:string
  recipesZero:string
  recipesIngredients1:string
  recipesIngredients2:string
  recipesIngredients3:string
  recipesPortions1:string
  recipesPortions2:string
  recipesPortions3:string
  recipesHours1:string
  recipesHours2:string
  recipesHours3:string
  recipesMinutes1:string
  recipesMinutes2:string
  recipesMinutes3:string
  recipesButton:string
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
  "ingredients_count": number,
  "recipes_count": number
}

const RecipesWorkspace = (({translations, noAuth}
  :{translations:RecipesWorkspaceTranslations, noAuth:NoAuthWorkspaceTranslations}) => {
  const [menu, setMenu] = useState<any[]|null>()
  const [isUpdateMenu, setIsUpdateMenu] = useState(false)
  const localActive = useLocale()

  useEffect(() => {
    fetch("/api/recipes", {
      method: "GET"
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        throw Error("Something went wrong")
      }
    })
    .then(data => setMenu(data))
    .catch(() => setMenu(null))
  }, [isUpdateMenu])

  const [isAuth, setIsAuth] = useState<boolean>()
  useEffect(() => {
    const role = localStorage.getItem("role-id")
    setIsAuth(role === "2")
  }, [])

  return isAuth === false ? (
    <NoAuthWorkspace translations={noAuth}></NoAuthWorkspace>
  ) :  isAuth ? 
    (menu === undefined ? (
      <div className="mt-20">
        <Loading></Loading>
      </div>
    ) : menu ? (
      <div className='lg:max-w-4xl md:max-w-3xl sm:max-w-2xl w-full'>
        <h1 className='text-center mt-16 text-2xl sm:text-3xl lg:text-4xl font-bold font-minion'>{translations.recipesTitle}</h1>
        
        <div className="mt-10 mb-20 mx-2">
          {Object.keys(menu).map((item: any, index:number) => menu[item].length === 0 ? (null) : (
            <div key={index} className={style.questionBox}>
              <label className="cursor-pointer">
                <input type="checkbox" className={style.invisibleInput} defaultChecked={true}/>
                <div className={style.questionTitle}>
                  <div></div>
                  <Translate to={localActive} text={menu[item][0].dish_category_name}></Translate>
                  <div className={style.questionIcon}>
                    <svg enableBackground="new 0 0 32 32" height="24" version="1.1" viewBox="0 0 32 32" width="24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24.285,11.284L16,19.571l-8.285-8.288c-0.395-0.395-1.034-0.395-1.429,0  c-0.394,0.395-0.394,1.035,0,1.43l8.999,9.002l0,0l0,0c0.394,0.395,1.034,0.395,1.428,0l8.999-9.002 
                      c0.394-0.395,0.394-1.036,0-1.431C25.319,10.889,24.679,10.889,24.285,11.284z" fill="currentColor"/><g/><g/><g/><g/><g/><g/>
                    </svg>
                  </div>
                </div>
              </label>
              <div className={style.answerBox}>
                <div className={style.answerText}>
                  {menu[item].map((dish: Dish, index:number) => (
                    <div key={index} className="rounded-lg py-1 px-2 flex flex-col justify-between">
                      <Link href={"/" + localActive + "/recipes/" + dish.id} 
                      className="hover:text-foreground-accent transition-colors font-serif text-lg text-balance font-semibold">
                        <Translate to={localActive} text={dish.name}></Translate>
                      </Link>
                      <div className="flex gap-2 mt-2 text-sm text-gray-500 flex-col">
                        <div className="flex flex-nowrap whitespace-nowrap gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
                          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                            <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path><path d="M7 2v20"></path>
                            <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path>
                          </svg>
                          <span>{dish.ingredients_count + " " + modifyTextForNumber(dish.ingredients_count, 
                          translations.recipesIngredients1, translations.recipesIngredients2, translations.recipesIngredients3)}</span>
                        </div>
                        <div className="flex flex-nowrap whitespace-nowrap gap-2">
                          <svg enable-background="new 0 0 24 24" className="w-4 h-4" version="1.1" 
                          viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><g>
                            <path d="M0,23c0,0.6,0.4,1,1,1h22c0.6,0,1-0.4,1-1v-1H0V23z"/>
                            <path d="M22,20h2c0-6.3-4.8-11.4-11-11.9V7h1c0.6,0,1-0.4,1-1s-0.4-1-1-1h-4C9.4,5,9,5.4,9,6s0.4,1,
                            1,1h1v1.1C4.8,8.6,0,13.7,0,20   h2H22z M12,10c4.8,0,8.9,3.4,9.8,8H2.2C3.1,13.4,7.2,10,12,10z"/>
                            <path d="M16.5,12.2L16,13.1c1.5,0.9,2.7,2.2,3.4,3.8l0.9-0.4C19.6,14.7,18.2,13.2,16.5,12.2z"/></g>
                          </svg>
                          <span>{dish.portions + " " + modifyTextForNumber(dish.portions, translations.recipesPortions1, 
                            translations.recipesPortions2, translations.recipesPortions3)}</span>
                        </div>
                        <div className="flex flex-nowrap whitespace-nowrap gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" 
                          fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                            <circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                          {
                            dish.cook_time >= 60 ? (
                              dish.cook_time % 60 === 0 ? (
                                <span>{(dish.cook_time / 60) + " " + modifyTextForNumber(dish.cook_time, translations.recipesHours1, 
                                  translations.recipesHours2, translations.recipesHours3)}</span>
                              ) : (
                                <span>{Math.floor(dish.cook_time / 60) + " " + 
                                modifyTextForNumber(Math.floor(dish.cook_time / 60), translations.recipesHours1, 
                                translations.recipesHours2, translations.recipesHours3) + " " + 
                                (dish.cook_time - Math.floor(dish.cook_time / 60) * 60) + " " + 
                                modifyTextForNumber(dish.cook_time, translations.recipesMinutes1, 
                                translations.recipesMinutes2, translations.recipesMinutes3)}</span>
                              )
                            ) : (
                              <span>{dish.cook_time + " " + modifyTextForNumber(dish.cook_time, translations.recipesMinutes1, 
                              translations.recipesMinutes2, translations.recipesMinutes3)}</span>
                            )
                          }
                        </div>
                      </div>
                      <div className="pb-1 pt-2 flex justify-center">
                        <Link href={"/" + localActive + "/workspace/recipes/" + dish.id} 
                        className="font-semibold text-foreground-primary transition-colors
                        border border-border hover:border-foreground-accent hover:bg-foreground-accent 
                        rounded-lg text-sm px-4 py-2 text-center">{translations.recipesButton}</Link>
                      </div>
                    </div>
                  ))}  
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ) : (
      <h1 className='text-center my-16 text-xl sm:text-3xl lg:text-4xl font-bold font-minion'>{translations.recipesError}</h1>
    )
  ) : (
    <div></div>
  )
})
export default RecipesWorkspace