"use client"

import NoAuthWorkspace, { NoAuthWorkspaceTranslations } from "@/components/no-auth"
import { useEffect, useState } from "react"

export type ReservesWorkspaceTranslations = {
  reservesTitle:string
  reservesError:string
  reservesZero:string
}

export default function ReservesWorkspace({translations, noAuth}
  :{translations:ReservesWorkspaceTranslations, noAuth:NoAuthWorkspaceTranslations}) {
  const [isAuth, setIsAuth] = useState<boolean>()
  useEffect(() => {
    const role = localStorage.getItem("role-id")
    if (role !== "1") {
      setIsAuth(false)
    }
  }, [])
  return isAuth === false ? (
    <NoAuthWorkspace translations={noAuth}></NoAuthWorkspace>
  ) :  isAuth ? (
    <div>users</div>
  ) : (
    <div></div>
  )
}