"use client"

import Modal from '@/components/modal';
import { useRef, useState } from 'react';
import InputMask from 'react-input-mask';

export type ContactFormTranslations = {
  message: string
  name: string
  people: string
  button: string
  select: string
  table: string
  sendSuccess:string
  sendError:string
  ok:string
}
export type Table = {
  id: number
  name: string
  capacity: number
}

export default function ContactForm({translations, selectOptions}
  :{translations:ContactFormTranslations, selectOptions:Table[]}) {
  const nameRef = useRef<HTMLInputElement>(null)
  const phoneRef = useRef<string | null>(null)
  const peoplesRef = useRef<HTMLInputElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)
  const datetimeRef = useRef<HTMLInputElement>(null)
  const tableRef = useRef<HTMLSelectElement>(null)

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isSendSuccess, setIsSendSuccess] = useState<boolean>(false)

  const handleSubmit = (event:any) => {
    event.preventDefault()

    fetch("/api/reserves", {
      method: "POST",
      body: JSON.stringify({
        user_name: nameRef.current?.value,
        user_phone: phoneRef.current?.replace(/\s+/g, ''),
        people_count: peoplesRef.current?.value,
        message: messageRef.current?.value,
        reserve_at: datetimeRef.current?.value,
        table_id: tableRef.current?.value
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
    .then(() => setIsSendSuccess(true))
    .catch(() => setIsSendSuccess(false))

    setIsModalOpen(true)
  }

  function getCurrentDate() {
    let today = new Date();
    let date = new Date(today);
    const currentDay = date.getDate();
    const currentMonth = date.getMonth() + 1;
    return `${date.getFullYear().toString()}-${currentMonth < 10 ? "0" + currentMonth : currentMonth}-${currentDay < 10 ? "0" + currentDay : currentDay}`
  }
  
  return (
    <>
    <form onSubmit={handleSubmit} className="flex flex-col mt-8 gap-y-2 items-center">
      <input ref={nameRef} required className="outline-none w-full p-1 border-border rounded border-b-2" type="text" name="name" placeholder={translations.name}></input>
      <InputMask onChange={e => {phoneRef.current = e.target.value}} required placeholder='+7 (___) ___-__-__' className="outline-none w-full p-1 border-border rounded border-b-2" mask="+7 (999) 999-99-99" />
      <input ref={peoplesRef} required className="outline-none w-full p-1 border-border rounded border-b-2" type="number" name="peoples" placeholder={translations.people}></input>
      <select required ref={tableRef} defaultValue="" id="countries" className="outline-none w-full border-border rounded border-b-2 *:text-foreground-primary block py-1">
        <option value="" className='text-[#888]' hidden>{translations.select}</option>
        {
          selectOptions.map((item:Table) => (
            <option key={item.id} value={item.id}>{translations.table + " " + item.name + " (" + item.capacity + ")"}</option>
          ))
        }
      </select>
      <textarea ref={messageRef} rows={1} className="outline-none w-full p-1 border-border rounded border-b-2" name="message" placeholder={translations.message}></textarea>
      <input ref={datetimeRef} required className="outline-none w-full p-1 border-border rounded border-b-2" type="datetime-local" defaultValue={getCurrentDate() + "T12:00"}></input>
      <button className="p-[3px] relative mt-4">
        <div className="inset-0 p-0.5 w-fit bg-gradient-to-r from-teal-300 to-lime-300 rounded-lg">
          <div className="px-8 py-2 w-fit rounded-[6px] font-semibold hover:text-background-secondary bg-background-primary relative group transition duration-200 hover:bg-transparent">
            {translations.button}
          </div>
        </div>
      </button>
    </form>
    <Modal isOpen={isModalOpen} onClose={() => {setIsModalOpen(false)}}>
      <div className='py-3 px-6 rounded-lg bg-background-primary relative sm:w-min flex flex-col items-center'>
        <h1 className=' text-center text-xl font-medium sm:whitespace-nowrap whitespace-normal'>{isSendSuccess ? translations.sendSuccess : translations.sendError}</h1>
        <button onClick={() => setIsModalOpen(false)}
        className="font-semibold text-foreground-primary transition-colors
        border border-border hover:border-foreground-accent hover:bg-foreground-accent 
        rounded-lg text-sm px-10 py-2 mt-4 text-center">{translations.ok}</button>
      </div>
    </Modal>
    </>
  )
}