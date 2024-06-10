"use client"

import Loading from "@/components/loading"
import Modal from "@/components/modal"
import NoAuthWorkspace, { NoAuthWorkspaceTranslations } from "@/components/no-auth"
import Translate from "@/components/translate"
import { useLocale } from "next-intl"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

export type UsersWorkspaceTranslations = {
  toProfile:string
  buttonAdd:string
  buttonOk:string
  usersTitle:string
  usersError:string
  usersZero:string
  usersDataName:string
  usersDataFirstName:string
  usersDataSecondName:string
  usersDataThirdName:string
  usersDataEmail:string
  usersDataLogin:string
  usersDataPassword:string
  usersDataRole:string

  usersNew:string
  usersSelectRole:string
  usersAddError:string
  usersAddUnable:string
  usersDeleteError:string
  usersDeleteQuestion:string
  usersDeleteConfirm:string
  usersDeleteCancel:string
}
export type Role = {
  id:number,
  name:string
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

export default function UsersWorkspace({translations, noAuth, roles}
  :{translations:UsersWorkspaceTranslations, noAuth:NoAuthWorkspaceTranslations, roles:Role[]}) {
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

  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false)
  const [isDeleteErrorModalOpen, setIsDeleteErrorModalOpen] = useState<boolean>(false)
  const [isAddErrorModalOpen, setIsAddErrorModalOpen] = useState<boolean>(false)

  const [selectedUserId, setSelectedUserId] = useState<number>(0)

  async function handleDelete(id:number) {
    await fetch("/api/users/" + id, {
      method: "DELETE"
    }).then(res => {
      if (res.ok) {
        setIsUpdateUsers(x => !x)
        setSelectedUserId(0)
      } else {
        setIsDeleteErrorModalOpen(true)
      }
    })
  }

  const newUserFirstNameRef = useRef<HTMLInputElement>(null)
  const newUserSecondNameRef = useRef<HTMLInputElement>(null)
  const newUserThirdNameRef = useRef<HTMLInputElement>(null)
  const newUserEmailRef = useRef<HTMLInputElement>(null)
  const newUserLoginRef = useRef<HTMLInputElement>(null)
  const newUserPasswordRef = useRef<HTMLInputElement>(null)
  const newUserRoleIdRef = useRef<HTMLSelectElement>(null)

  async function handleSubmit(event:any) {
    event.preventDefault()

    await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        first_name: newUserFirstNameRef.current?.value,
        second_name: newUserSecondNameRef.current?.value,
        third_name: newUserThirdNameRef.current?.value,
        email: newUserEmailRef.current?.value,
        login: newUserLoginRef.current?.value,
        password: newUserPasswordRef.current?.value,
        role_id: newUserRoleIdRef.current?.value
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(res => {
      if (res.ok) {
        setIsAddModalOpen(false)
        setIsUpdateUsers(x => !x)
      } else {
        throw new Error()
      }
    })
    .catch(() => {
      setIsDeleteErrorModalOpen
    })
  }

  return isAuth === false ? (
    <NoAuthWorkspace translations={noAuth} hasAuth={hasAuth}></NoAuthWorkspace>
  ) :  isAuth ? (
    users === undefined ? (
      <Loading className="m-20"></Loading>
    ) : users ? (
      <>
      <div className='xl:max-w-7xl lg:max-w-5xl md:max-w-3xl sm:max-w-2xl w-full'>
        <h1 className='text-center mt-16 text-2xl sm:text-3xl lg:text-4xl font-bold font-minion'>{translations.usersTitle}</h1>
        
        <div className="mt-10 mb-20 mx-2">
          <div className="overflow-x-auto">
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
                      <td className="px-1 py-2 flex justify-center">
                        <button onClick={() => setSelectedUserId(item.id)}>
                          <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg" 
                          className="w-5 h-5 hover:fill-red-500 transition-all">
                            <path d="M432 80h-82.38l-34-56.75C306.1 8.827 291.4 0 274.6 0H173.4C156.6 0 141 8.827 132.4 
                            23.25L98.38 80H16C7.125 80 0 87.13 0 96v16C0 120.9 7.125 128 16 128H32v320c0 35.35 28.65 64 
                            64 64h256c35.35 0 64-28.65 64-64V128h16C440.9 128 448 120.9 448 112V96C448 87.13 440.9 80 432 
                            80zM171.9 50.88C172.9 49.13 174.9 48 177 48h94c2.125 0 4.125 1.125 5.125 2.875L293.6 80H154.4L171.9 
                            50.88zM352 464H96c-8.837 0-16-7.163-16-16V128h288v320C368 456.8 360.8 464 352 464zM224 416c8.844 0 
                            16-7.156 16-16V192c0-8.844-7.156-16-16-16S208 183.2 208 192v208C208 408.8 215.2 416 224 416zM144 
                            416C152.8 416 160 408.8 160 400V192c0-8.844-7.156-16-16-16S128 183.2 128 192v208C128 408.8 135.2 
                            416 144 416zM304 416c8.844 0 16-7.156 16-16V192c0-8.844-7.156-16-16-16S288 183.2 288 192v208C288 
                            408.8 295.2 416 304 416z"/>
                          </svg>
                        </button> 
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
          <div className="w-full items-center flex-col flex">
            <button className="p-[3px] relative mt-8" onClick={() => setIsAddModalOpen(true)}>
              <div className="inset-0 p-0.5 w-fit bg-gradient-to-r from-teal-300 to-lime-300 rounded-lg">
                <div className="px-8 py-2 w-fit rounded-[6px] font-semibold hover:text-background-secondary bg-background-primary relative group transition duration-200 hover:bg-transparent">
                  {translations.buttonAdd}
                </div>
              </div>
            </button>
            <Link href={"/" + localActive + "/workspace/profile"} 
            className="font-semibold text-foreground-primary transition-colors
            border border-border hover:border-foreground-accent hover:bg-foreground-accent 
            rounded-lg text-sm px-4 py-2 mt-4 text-center">{translations.toProfile}</Link>
          </div>
        </div>
      </div>
      
      <Modal isOpen={isAddModalOpen} onClose={() => {setIsAddModalOpen(false)}}>
        <div className='py-3 px-6 rounded-lg bg-background-primary relative sm:w-min flex min-w-72 flex-col items-center'>
          <h1 className=' text-center text-xl font-medium whitespace-nowrap mb-2'>
            {roles.length > 0 ? translations.usersNew : translations.usersAddUnable}</h1>
          {roles.length > 0 ? (
            <form className="flex flex-col w-full gap-y-2 items-center" onSubmit={handleSubmit}>
              <input required className="outline-none w-full p-1 border-border rounded border-b-2" 
              type="text" name="first-name" placeholder={translations.usersDataFirstName} ref={newUserFirstNameRef}></input>
              <input required className="outline-none w-full p-1 border-border rounded border-b-2" 
              type="text" name="second-name" placeholder={translations.usersDataSecondName} ref={newUserSecondNameRef}></input>
              {localActive === "ru" && (
                <input required className="outline-none w-full p-1 border-border rounded border-b-2" 
                type="text" name="third-name" placeholder={translations.usersDataThirdName} ref={newUserThirdNameRef}></input>
              )}
              <input className="outline-none w-full p-1 border-border rounded border-b-2" 
              type="text" name="email" placeholder={translations.usersDataEmail} ref={newUserEmailRef}></input>
              <input className="outline-none w-full p-1 border-border rounded border-b-2" 
              type="text" name="login" placeholder={translations.usersDataLogin} ref={newUserLoginRef}></input>
              <input required className="outline-none w-full p-1 border-border rounded border-b-2" 
              type="text" name="password" placeholder={translations.usersDataPassword} ref={newUserPasswordRef}></input>
              <select defaultValue="" id="countries" ref={newUserRoleIdRef}
              className="outline-none w-full border-border rounded border-b-2 *:text-foreground-primary block py-1">
                <option value="" className='text-[#888]' hidden>{translations.usersSelectRole}</option>
                {
                  roles.map((item:Role) => (
                    <option key={item.id} value={item.id}>
                      <Translate to={localActive} text={item.name}></Translate>
                    </option>
                  ))
                }
              </select>
              <button type="submit"
              className="font-semibold text-foreground-primary transition-colors
              border border-border hover:border-foreground-accent hover:bg-foreground-accent 
              rounded-lg text-sm px-10 py-2 mt-4 text-center">{translations.buttonAdd}</button>
            </form>
          ) : (
            <button type="submit"
            className="font-semibold text-foreground-primary transition-colors
            border border-border hover:border-foreground-accent hover:bg-foreground-accent 
            rounded-lg text-sm px-10 py-2 mt-4 text-center">{roles.length > 0 ? translations.buttonAdd : translations.buttonOk}</button>
          )}
        </div>
      </Modal>
      
      <Modal isOpen={isDeleteErrorModalOpen} onClose={() => {setIsDeleteErrorModalOpen(false)}}>
        <div className='py-3 px-6 rounded-lg bg-background-primary relative sm:w-min flex flex-col items-center'>
          <h1 className=' text-center text-xl font-medium sm:whitespace-nowrap whitespace-normal'>{translations.usersDeleteError}</h1>
          <button onClick={() => setIsDeleteErrorModalOpen(false)}
          className="font-semibold text-foreground-primary transition-colors
          border border-border hover:border-foreground-accent hover:bg-foreground-accent 
          rounded-lg text-sm px-10 py-2 mt-4 text-center">{translations.buttonOk}</button>
        </div>
      </Modal>
      
      <Modal isOpen={isAddErrorModalOpen} onClose={() => {setIsAddErrorModalOpen(false)}}>
        <div className='py-3 px-6 rounded-lg bg-background-primary relative sm:w-min flex flex-col items-center'>
          <h1 className=' text-center text-xl font-medium sm:whitespace-nowrap whitespace-normal'>{translations.usersAddError}</h1>
          <button onClick={() => setIsAddErrorModalOpen(false)}
          className="font-semibold text-foreground-primary transition-colors
          border border-border hover:border-foreground-accent hover:bg-foreground-accent 
          rounded-lg text-sm px-10 py-2 mt-4 text-center">{translations.buttonOk}</button>
        </div>
      </Modal>
      
      <Modal isOpen={selectedUserId !== 0} onClose={() => {setSelectedUserId(0)}}>
        <div className='py-3 px-6 rounded-lg bg-background-primary relative sm:w-min flex flex-col items-center'>
          <h1 className=' text-center text-xl font-medium sm:whitespace-nowrap whitespace-normal'>{translations.usersDeleteQuestion}</h1>
          <div className="flex flex-col">
            <button onClick={() => handleDelete(selectedUserId)} 
            className="font-semibold text-foreground-primary transition-colors
            border border-border hover:border-rose-400 hover:bg-rose-400 
            rounded-lg text-sm px-4 py-2 mt-4 text-center">{translations.usersDeleteConfirm}</button>
            <button onClick={() => setSelectedUserId(0)}
            className="font-semibold text-foreground-primary transition-colors
            border border-border hover:border-foreground-accent hover:bg-foreground-accent 
            rounded-lg text-sm px-10 py-2 my-2 text-center">{translations.usersDeleteCancel}</button>
          </div>
        </div>
      </Modal>
      </>
    ) : (
      <h1 className='text-center my-16 text-xl sm:text-3xl lg:text-4xl font-bold font-minion'>{translations.usersError}</h1>
    )
  ) : (
    <div></div>
  )
}