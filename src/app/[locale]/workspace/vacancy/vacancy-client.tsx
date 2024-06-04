"use client"

import { useLocale } from "next-intl";
import { useEffect, useState } from "react";
import NoAuthWorkspace, { NoAuthWorkspaceTranslations } from "@/components/no-auth";
import Loading from "@/components/loading";
import Translate from "@/components/translate";

export type VacancyTranslations = {
  vacancyError:string
  vacancyTitle:string
  vacancyDescription:string
  vacancyPreview:string
  vacancyPrint:string
}
type Profile = {
  "id": number,
  "first_name": string,
  "second_name": string,
  "third_name"?: string,
  "email": string,
  "login": string,
  "password": string,
  "gender": boolean,
  "role_name": string
}

export default function VacancyWorkspace({translations, noAuth}
  :{translations:VacancyTranslations, noAuth:NoAuthWorkspaceTranslations}) {
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

  const handlePrint = () => {
    var prtContent = document.getElementById("vac");
    var WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
    if (!prtContent) {
      return null
    }
    WinPrint?.document.write(
      '<main style="padding: 20px 40px;">' + prtContent.innerHTML + "</main>"
    );
    WinPrint?.document.close();
    WinPrint?.focus();
    WinPrint?.print();
    WinPrint?.close();
  }
  
  const [vacancyDate, setVacancyDate] = useState(getCurrentDate())
  function getCurrentDate(type?:string) {
    let today = new Date();
    let date = new Date(today);
    const currentDay = date.getDate();
    const currentMonth = date.getMonth() + 1;
    if (type === "input") {
      return `${date.getFullYear().toString()}-${currentMonth < 10 ? "0" + currentMonth : currentMonth}-${currentDay < 10 ? "0" + currentDay : currentDay}`
    }
    return `${currentDay < 10 ? "0" + currentDay : currentDay}.${currentMonth < 10 ? "0" + currentMonth : currentMonth}.${date.getFullYear().toString()}`
  }

  return role === null ? (
    <NoAuthWorkspace translations={noAuth} hasAuth={true}></NoAuthWorkspace>
  ) :  role ? (
    user === undefined ? (
      <Loading className="m-20"></Loading>
    ) : user ? (
      <div className="md:max-w-3xl sm:max-w-2xl w-full">
        <div>
          <h1 className='text-center mt-8 text-2xl sm:text-3xl lg:text-4xl font-bold font-minion'>{translations.vacancyTitle}</h1>
          <p className="mt-6 mb-2">{translations.vacancyDescription}</p>
          <input onInput={(e:any) => {
            const dateString:string = e.target.value
            setVacancyDate(`${dateString.slice(8)}.${dateString.slice(5, -3)}.${dateString.slice(0, -6)}`)
          }} required className="outline-none w-full p-1 border-border rounded border-b-2" type="date" defaultValue={getCurrentDate("input")}></input>
          <div className="flex justify-center">
            
          </div>
        </div>
        <div className="overflow-x-auto mt-8">
          <p className="text-lg mb-2 text-center font-semibold">{translations.vacancyPreview}</p>
          <div style={{width: "16.5cm", minWidth:"16.5cm", fontSize: "14pt", fontFamily: '"Times New Roman", Times, serif'}} id="vac" 
          className="border border-border rounded-lg !w-full py-2 px-6">
            <div style={{display: "flex", justifyContent: "end", whiteSpace: 'nowrap'}}>
              <div style={{width: "min-content"}}>
                <div>Генеральному директору</div>
                <div>ООО "Смит"</div>
                <div>Иванову И.И.</div>
                <div style={{textTransform: "lowercase", marginTop: "12px"}}>{"от " + user.role_name + "а"}</div>
                <div>{user.second_name + " " + user.first_name[0] + "."
                + (user.third_name === undefined ? "" : (user.third_name[0] + "."))}</div>
              </div>
            </div>
            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
              <div style={{marginTop: "12px", textTransform: "uppercase"}}>Заявление</div>
              <div>о предоставлении ежегодного оплачиваемого отпуска</div>
            </div>
            <div>
              <div style={{textIndent: "1.25cm", marginTop: "8px"}}>
                {"Прошу предоставить мне ежегодный оплачиваемый отпуск продолжительностью 28 календарных дней с " + vacancyDate + "."}
              </div>
            </div>
            <div>
              <div style={{marginTop: "12px"}}>{getCurrentDate()}</div>
            </div>
            <div style={{display: "flex", justifyContent: "end"}}>
              <div style={{marginTop: "12px"}}>
                <span style={{marginRight:"16px"}}>{"______________"}</span>
                <span>{user.first_name[0] + "." + 
                (user.third_name === undefined ? "" : (user.third_name[0] + ". "))
                + user.second_name}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mb-8">
          <button className="p-[3px] relative mt-4" onClick={handlePrint}>
            <div className="inset-0 p-0.5 w-fit bg-gradient-to-r from-teal-300 to-lime-300 rounded-lg">
              <div className="px-8 py-2 w-fit rounded-[6px] font-semibold uppercase
              hover:text-background-secondary bg-background-primary relative group transition duration-200 hover:bg-transparent">
                {translations.vacancyPrint}
              </div>
            </div>
          </button>
        </div>
      </div>
    ) : (
      <h1 className='text-center my-16 text-xl sm:text-3xl font-bold font-minion'>{translations.vacancyError}</h1>
    )
  ) : (
    <div></div>
  )
}