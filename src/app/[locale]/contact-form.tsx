"use client"

import InputMask from 'react-input-mask';

export default function ContactForm(props:any) {
  const handleSubmit = (event:any) => {
    event.preventDefault()
    console.log(event)
  }
  function getCurrentDate() {
    let today = new Date();
    let date = new Date(today);
    const currentDay = date.getDate();
    const currentMonth = date.getMonth() + 1;
    return `${date.getFullYear().toString()}-${currentMonth < 10 ? "0" + currentMonth : currentMonth}-${currentDay < 10 ? "0" + currentDay : currentDay}`
  }
  
  return (
    <form onSubmit={handleSubmit} className="flex flex-col mt-8 gap-y-2 items-center">
      <input required className="outline-none w-full p-1 border-border rounded border-b-2" type="text" name="name" placeholder={props.name}></input>
      <InputMask required placeholder='+7 (___) ___-__-__' className="outline-none w-full p-1 border-border rounded border-b-2" mask="+7 (999) 999-99-99" />
      <input required className="outline-none w-full p-1 border-border rounded border-b-2" type="number" name="peoples" placeholder={props.people}></input>
      <textarea rows={1} className="outline-none w-full p-1 border-border rounded border-b-2" name="message" placeholder={props.message}></textarea>
      <input required className="outline-none w-full p-1 border-border rounded border-b-2" type="datetime-local" defaultValue={getCurrentDate() + "T12:00"}></input>
      <button className="p-[3px] relative mt-4">
        <div className="inset-0 p-0.5 w-fit bg-gradient-to-r from-teal-300 to-lime-300 rounded-lg">
          <div className="px-8 py-2 w-fit rounded-[6px] font-semibold hover:text-background-secondary bg-background-primary relative group transition duration-200 hover:bg-transparent">
            {props.button}
          </div>
        </div>
      </button>
    </form>
  )
}