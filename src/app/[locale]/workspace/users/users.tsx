"use client"

import NoAuthWorkspace, { NoAuthWorkspaceTranslations } from "@/components/no-auth"
import { useEffect, useState } from "react"

export type UsersWorkspaceTranslations = {
  usersTitle:string
  usersError:string
  usersZero:string
}

export default function UsersWorkspace({translations, noAuth}:{translations:UsersWorkspaceTranslations, noAuth:NoAuthWorkspaceTranslations}) {
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