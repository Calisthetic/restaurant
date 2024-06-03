"use client"

import Loading from "@/components/loading"
import NoAuthWorkspace, { NoAuthWorkspaceTranslations } from "@/components/no-auth"
import Translate from "@/components/translate"
import { useLocale } from "next-intl"
import Link from "next/link"
import { useEffect, useState } from "react"

export type UsersWorkspaceTranslations = {
  toProfile:string
  usersTitle:string
  usersError:string
  usersZero:string
  usersDataName:string
  usersDataEmail:string
  usersDataLogin:string
  usersDataPassword:string
  usersDataRole:string
}

type User = {
  id: number,
  first_name: string,
  second_name: string,
  third_name: string,
  email: string,
  login: string,
  password: string,
  gender: boolean,
  role_name: string
}

export default function UsersWorkspace({translations, noAuth}:{translations:UsersWorkspaceTranslations, noAuth:NoAuthWorkspaceTranslations}) {
  const [users, setUsers] = useState<User[]|null>()
  const [isUpdateUsers, setIsUpdateUsers] = useState(false)
  const localActive = useLocale()

  useEffect(() => {
    fetch("/api/users", {
      method: "GET"
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        throw Error("Something went wrong")
      }
    })
    .then(data => setUsers(data))
    .catch(() => setUsers(null))
  }, [isUpdateUsers])

  const [isAuth, setIsAuth] = useState<boolean>()
  const [hasAuth, setHasAuth] = useState<boolean>(false)
  useEffect(() => {
    const role = localStorage.getItem("role-id")
    setIsAuth(role === "1")
    setHasAuth(role !== null)
  }, [])

  return isAuth === false ? (
    <NoAuthWorkspace translations={noAuth} hasAuth={hasAuth}></NoAuthWorkspace>
  ) :  isAuth ? (
    users === undefined ? (
      <Loading></Loading>
    ) : users ? (
      <div className='xl:max-w-7xl lg:max-w-5xl md:max-w-3xl sm:max-w-2xl w-full'>
        <h1 className='text-center mt-16 text-2xl sm:text-3xl lg:text-4xl font-bold font-minion'>{translations.usersTitle}</h1>
        
        <div className="mt-10 mb-20 mx-2 overflow-x-auto">
          <table className=" min-w-min w-full rounded-lg overflow-hidden font-medium font-sans text-nowrap">
            <thead className=" bg-background-secondary">
              <tr>
                <th scope="col" className="px-1 sm:px-2 md:px-3 py-2 text-start">{translations.usersDataName}</th>
                <th scope="col" className="px-1 sm:px-2 md:px-3 py-2 text-start">{translations.usersDataRole}</th>
                <th scope="col" className="px-1 sm:px-2 md:px-3 py-2 text-start">{translations.usersDataEmail}</th>
                <th scope="col" className="px-1 sm:px-2 md:px-3 py-2 text-start">{translations.usersDataLogin}</th>
                <th scope="col" className="px-1 sm:px-2 md:px-3 py-2 text-start">{translations.usersDataPassword}</th>
                <th scope="col" className="px-1 sm:px-2 md:px-3 py-2 text-start"></th>
              </tr>
            </thead>
            <tbody>
              {
                users.map((item:User) => (
                  <tr key={item.id} className="border-b border-border">
                    <td className="px-1 sm:px-2 md:px-3 py-2">
                      <Translate to={localActive} text={item.second_name + " " + item.first_name + (item.third_name === null ? "" : " " + item.third_name)}></Translate>
                    </td>
                    <td className="px-1 sm:px-2 md:px-3 py-2">
                      <Translate to={localActive} text={item.role_name}></Translate>
                    </td>
                    <td className="px-1 sm:px-2 md:px-3 py-2">{item.email}</td>
                    <td className="px-1 sm:px-2 md:px-3 py-2">{item.login}</td>
                    <td className="px-1 sm:px-2 md:px-3 py-2">{item.password}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
          <div className="w-full justify-center flex">
            <Link href={"/" + localActive + "/workspace/profile"} 
            className="font-semibold text-foreground-primary transition-colors
            border border-border hover:border-foreground-accent hover:bg-foreground-accent 
            rounded-lg text-sm px-4 py-2 mt-8 text-center">{translations.toProfile}</Link>
          </div>
        </div>
      </div>
    ) : (
      <h1 className='text-center my-16 text-xl sm:text-3xl lg:text-4xl font-bold font-minion'>{translations.usersError}</h1>
    )
  ) : (
    <div></div>
  )
}