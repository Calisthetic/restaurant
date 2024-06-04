"use client"

import { useLocale } from "next-intl"
import { redirect } from "next/navigation"
import { useEffect, useRef, useState } from "react"

type UserInfo = {
  id:number
  role_id:number
  role_name:string
  email:string
  first_name:string
  second_name:string
  third_name?:string
  gender:boolean
}
export type SignInTranslationsProps = {
  login:string
  password:string
  alreadyAuth:string
  buttonExit:string
  buttonEntry:string
  buttonToWorkspace:string
}

export default function SignInForm({translations}:{translations:SignInTranslationsProps}) {
  const [isAuthUpdate, setIsAuthUpdate] = useState(false)

  useEffect(() => {
    const roleId = localStorage.getItem("role-id")
    const userId = localStorage.getItem("user-id")
    if (roleId && userId) {
      redirect(`/${localActive}/workspace/profile`)
    }
  }, [isAuthUpdate])

  const loginRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const localActive = useLocale();

  const handleSubmit = (event:any) => {
    event.preventDefault()
    
    fetch("/api/users/auth", {
      method: "POST",
      body: JSON.stringify({
        login: loginRef.current?.value,
        password: passwordRef.current?.value
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error()
      }
    })
    .then((data:UserInfo) => {
      localStorage.setItem("role-id", data.role_id.toString())
      localStorage.setItem("user-id", data.id.toString())
      setIsAuthUpdate(x => !x)
    })
    .catch(() => alert("Wrong login or password"))
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col mt-8 gap-y-2 items-center w-full max-w-[600px] p-2 sm:p-0">
      <input required className="outline-none font-sans w-full p-1 border-border rounded border-b-2" type="text" ref={loginRef} name="login" placeholder={translations.login}></input>
      <input required className="outline-none font-sans w-full p-1 border-border rounded border-b-2" type="text" ref={passwordRef} name="password" placeholder={translations.password}></input>
      <button className="p-[3px] relative mt-4" type="submit">
        <div className="inset-0 p-0.5 w-fit bg-gradient-to-r from-teal-300 to-lime-300 rounded-lg">
          <div className="px-8 py-2 w-fit uppercase rounded-[6px] font-semibold hover:text-background-secondary bg-background-primary relative group transition duration-200 hover:bg-transparent">
            {translations.buttonEntry}
          </div>
        </div>
      </button>
    </form>
  )
}