"use client"

import Loading from "@/components/loading"
import NoAuthWorkspace, { NoAuthWorkspaceTranslations } from "@/components/no-auth"
import Translate from "@/components/translate"
import { useLocale } from "next-intl"
import Link from "next/link"
import { useEffect, useState } from "react"

export type ReservesWorkspaceTranslations = {
  toProfile:string
  reservesTitle:string
  reservesError:string
  reservesZero:string

  reservesDataName:string
  reservesDataPhone:string
  reservesDataDatetime:string
  reservesDataMessage:string
  reservesDataPeople:string
  reservesDataTableName:string
}

type Reserve = {
  "id": number,
  "user_name": string,
  "user_phone": string,
  "people_count": number,
  "reserve_at": string,
  "message": string,
  "table_name": string,
}

export default function ReservesWorkspace({translations, noAuth}
  :{translations:ReservesWorkspaceTranslations, noAuth:NoAuthWorkspaceTranslations}) {
  const [reserves, setReserves] = useState<Reserve[]|null>()
  const [isUpdateReserves, setIsUpdateReserves] = useState(false)
  const localActive = useLocale()

  useEffect(() => {
    fetch("/api/reserves", {
      method: "GET"
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        throw Error("Something went wrong")
      }
    })
    .then(data => setReserves(data))
    .catch(() => setReserves(null))
  }, [isUpdateReserves])

  const [isAuth, setIsAuth] = useState<boolean>()
  const [hasAuth, setHasAuth] = useState<boolean>(false)
  useEffect(() => {
    const role = localStorage.getItem("role-id")
    setIsAuth(role === "3" || role === "1")
    setHasAuth(role !== null)
  }, [])

  function transformDate(date:string) {
    const strings = date.split('-')
    return strings[2] + "." + strings[1] + "." + strings[0]
  }

  return isAuth === false ? (
    <NoAuthWorkspace translations={noAuth} hasAuth={hasAuth}></NoAuthWorkspace>
  ) :  isAuth ? (
    reserves === undefined ? (
      <Loading></Loading>
    ) : reserves ? (
      <div className='xl:max-w-7xl lg:max-w-5xl md:max-w-3xl sm:max-w-2xl w-full'>
        <h1 className='text-center mt-16 text-2xl sm:text-3xl lg:text-4xl font-bold font-minion'>{translations.reservesTitle}</h1>
        
        <div className="mt-10 mb-20 mx-2 overflow-x-auto">
          <table className=" min-w-min w-full rounded-lg overflow-hidden font-medium font-sans text-nowrap">
            <thead className=" bg-background-secondary">
              <tr>
                <th scope="col" className="px-1 sm:px-2 md:px-3 py-2 text-start">{translations.reservesDataDatetime}</th>
                <th scope="col" className="px-1 sm:px-2 md:px-3 py-2 text-start">{translations.reservesDataTableName}</th>
                <th scope="col" className="px-1 sm:px-2 md:px-3 py-2 text-start">{translations.reservesDataPhone}</th>
                <th scope="col" className="px-1 sm:px-2 md:px-3 py-2 text-start">{translations.reservesDataName}</th>
                <th scope="col" className="px-1 sm:px-2 md:px-3 py-2 text-start">{translations.reservesDataMessage}</th>
                <th scope="col" className="px-1 sm:px-2 md:px-3 py-2 text-start">{translations.reservesDataPeople}</th>
              </tr>
            </thead>
            <tbody>
              {
                reserves.map((item:Reserve) => (
                  <tr key={item.id} className="border-b border-border">
                    <td className="px-1 sm:px-2 md:px-3 py-2">{item.reserve_at.split('T')[1].split('.')[0].slice(0,-3) + " " 
                    + transformDate(item.reserve_at.split('T')[0])}</td>
                    <td className="px-1 sm:px-2 md:px-3 py-2">{item.table_name}</td>
                    <td className="px-1 sm:px-2 md:px-3 py-2">{item.user_phone}</td>
                    <td className="px-1 sm:px-2 md:px-3 py-2">
                      <Translate to={localActive} text={item.user_name}></Translate>
                    </td>
                    <td className="px-1 sm:px-2 md:px-3 py-2">
                      <Translate to={localActive} text={item.message}></Translate>
                    </td>
                    <td className="px-1 sm:px-2 md:px-3 py-2">{item.people_count}</td>
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
      <h1 className='text-center my-16 text-xl sm:text-3xl font-bold font-minion'>{translations.reservesError}</h1>
    )
  ) : (
    <div></div>
  )
}