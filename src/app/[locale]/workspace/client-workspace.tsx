"use client"

import { useLocale } from "next-intl"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"
import NoAuthWorkspace, { NoAuthWorkspaceTranslations } from "../../../components/no-auth"

export default function ClientWorkspace({noAuth}:{noAuth:NoAuthWorkspaceTranslations}) {
  const [isAuth, setIsAuth] = useState<boolean>(true)
  const localActive = useLocale()
  useEffect(() => {
    const role = localStorage.getItem("role-id")
    if (role) {
      redirect(`/${localActive}/workspace/profile`)
    } else {
      setIsAuth(false)
    }
  }, [])

  return isAuth ? (<div></div>) : (
    <NoAuthWorkspace translations={noAuth} hasAuth={false}></NoAuthWorkspace>
  )
}