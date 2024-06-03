"use client"

import NoAuthWorkspace, { NoAuthWorkspaceTranslations } from "@/components/no-auth"
import Translate from "@/components/translate"
import { useLocale } from "next-intl"
import { useEffect, useState } from "react"
import './initials.css'
import Link from "next/link"
import { useRouter } from "next/navigation"

export type ProfileWorkspaceTranslations = {
  profileError:string
  profileButtonVacancy:string
  profileButtonSignout:string
  profileButtonUsers:string
  profileButtonRecipes:string
  profileButtonReserves:string
}

type Profile = {
  "id": number,
  "first_name": string,
  "second_name": string,
  "third_name": string,
  "email": string,
  "login": string,
  "password": string,
  "gender": boolean,
  "role_name": string
}

export default function ProfileWorkspace({translations, noAuth}
  :{translations:ProfileWorkspaceTranslations, noAuth:NoAuthWorkspaceTranslations}) {
  const [user, setUser] = useState<Profile|null>()
  const [isUpdateUser, setIsUpdateUser] = useState(false)
  const localActive = useLocale()

  useEffect(() => {
    fetch("/api/users/" + localStorage.getItem("user-id"), {
      method: "GET"
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        throw Error("Something went wrong")
      }
    })
    .then(data => setUser(data))
    .catch(() => setUser(null))
  }, [isUpdateUser])

  const [role, setRole] = useState<string|null>()
  useEffect(() => {
    const role = localStorage.getItem("role-id")
    setRole(role)
  }, [])

  const router = useRouter();
  const handleSignout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("role-id")
      localStorage.removeItem("user-id")
      router.push(`/${localActive}/sign-in`);
    }
  }

  return role === null ? (
    <NoAuthWorkspace translations={noAuth} hasAuth={true}></NoAuthWorkspace>
  ) :  role ? (
    user === undefined ? (
      <div className='xl:max-w-7xl lg:max-w-5xl md:max-w-3xl sm:max-w-2xl w-full flex items-center justify-center font-sans'>        
        <div className="rounded-lg shadow-lg w-full max-w-md p-6 my-8 sm:my-12 md:my-16">
          <div className="flex flex-col items-center mb-6">
            <div className="rounded-full bg-background-secondary w-24 h-24 flex items-center justify-center 
            text-4xl font-bold text-foreground-secondary mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded-full w-40 mb-4 animate-pulse"></div>
            <div className="h-2 bg-gray-200 rounded-full w-[60px] mb-2.5 animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div className="h-10 bg-gray-200 rounded-full w-full mb-2.5 animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded-full w-full mb-2.5 animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded-full w-full mb-2.5 animate-pulse"></div>
          </div>
        </div>
      </div>
    ) : user ? (
      <div className='xl:max-w-7xl lg:max-w-5xl md:max-w-3xl sm:max-w-2xl w-full flex items-center justify-center font-sans'>        
        <div className="rounded-lg shadow-lg w-full max-w-md p-6 my-8 sm:my-12 md:my-16">
          <div className="flex flex-col items-center mb-6">
            <div className="rounded-full bg-background-secondary w-24 h-24 flex items-center justify-center 
            text-4xl font-bold text-foreground-secondary mb-4 initials">
              <span>
                <Translate to={localActive} text={user.first_name}></Translate>
              </span>
              <span>
                <Translate to={localActive} text={user.second_name}></Translate>
              </span>
            </div>
            <h2 className="text-2xl font-bold mb-1">
              <Translate to={localActive} text={user.first_name + " " + user.second_name}></Translate>
            </h2>
            <p className="text-gray-500 text-sm">
              <Translate to={localActive} text={user.role_name}></Translate>
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {role === "1" ? (
              <Link href={"/" + localActive + "/workspace/users"} 
              className="font-semibold text-foreground-primary transition-colors
              border border-border hover:border-foreground-accent hover:bg-foreground-accent 
              rounded-lg text-sm px-4 py-2 text-center">{translations.profileButtonUsers}</Link>
            ) : null}
            {(role === "2" || role === "1") ? (
              <Link href={"/" + localActive + "/workspace/recipes"} 
              className="font-semibold text-foreground-primary transition-colors
              border border-border hover:border-foreground-accent hover:bg-foreground-accent 
              rounded-lg text-sm px-4 py-2 text-center">{translations.profileButtonRecipes}</Link>
            ) : null}
            {(role === "3" || role === "1") ? (
              <Link href={"/" + localActive + "/workspace/reserves"} 
              className="font-semibold text-foreground-primary transition-colors
              border border-border hover:border-foreground-accent hover:bg-foreground-accent 
              rounded-lg text-sm px-4 py-2 text-center">{translations.profileButtonReserves}</Link>
            ) : null}
            <Link href={"/" + localActive + "/workspace/vacancy"} 
            className="font-semibold text-foreground-primary transition-colors
            border border-border hover:border-foreground-accent hover:bg-foreground-accent 
            rounded-lg text-sm px-4 py-2 text-center">{translations.profileButtonVacancy}</Link>
            <button onClick={handleSignout} 
            className="font-semibold text-foreground-primary transition-colors
            border border-border hover:border-rose-400 hover:bg-rose-400 
            rounded-lg text-sm px-4 py-2 text-center">{translations.profileButtonSignout}</button>
          </div>
        </div>
      </div>
    ) : (
      <h1 className='text-center my-16 text-xl sm:text-3xl font-bold font-minion'>{translations.profileError}</h1>
    )
  ) : (
    <div></div>
  )
}