"use client"

import { useLocale } from "next-intl"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"
import NoAuthWorkspace, { NoAuthWorkspaceTranslations } from "../../../components/no-auth"

export default function ClientWorkspace({noAuth}:{noAuth:NoAuthWorkspaceTranslations}) {
  const [isAuth, setIsAuth] = useState(true)
  const localActive = useLocale()
  useEffect(() => {
    const role = localStorage.getItem("role-id")
    if (role === "1") {
      redirect("/" + localActive + "/workspace/users")
    } else if (role === "2") {
      redirect("/" + localActive + "/workspace/recipes")
    } else if (role === "3") {
      redirect("/" + localActive + "/workspace/reserves")
    } else {
      setIsAuth(false)
    }
  }, [])

  return isAuth ? (<div></div>) : (
    <NoAuthWorkspace translations={noAuth}></NoAuthWorkspace>
  )
}