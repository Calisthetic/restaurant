"use client"

import { useLocale } from "next-intl"
import Link from "next/link"

export type NoAuthWorkspaceTranslations = {
  noAuth:string
  wrongAuth:string
  toAuth:string
}

export default function NoAuthWorkspace({translations, hasAuth}:{translations:NoAuthWorkspaceTranslations, hasAuth:boolean}) {
  const localActive = useLocale()
  
  return (
    <div className='xl:max-w-7xl lg:max-w-5xl md:max-w-3xl sm:max-w-2xl w-full'>
      <div className='my-10 md:my-20 flex flex-col items-center'>
        <p className="text-xl font-semibold text-center">{hasAuth ? translations.wrongAuth : translations.noAuth}</p>
        <Link href={"/" + localActive + "/sign-in"} className="p-[3px] relative mt-4">
          <div className="inset-0 p-0.5 w-fit bg-gradient-to-r from-teal-300 to-lime-300 rounded-lg">
            <div className="px-8 py-2 w-fit uppercase rounded-[6px] font-semibold hover:text-background-secondary bg-background-primary relative group transition duration-200 hover:bg-transparent">
              {translations.toAuth}
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}