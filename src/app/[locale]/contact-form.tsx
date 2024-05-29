"use client"

export default function ContactForm(props:any) {
  const handleSubmit = (event:any) => {
    event.preventDefault()
    console.log(event)
  }
  
  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <input className="outline-none border-border rounded border-b-2" type="text" name="name" placeholder={props.name}></input>
      <input className="outline-none border-border rounded border-b-2" type="text" name="peoples" placeholder={props.people}></input>
      <input className="outline-none border-border rounded border-b-2" type="text" name="message" placeholder={props.message}></input>
      <input className="outline-none border-border rounded border-b-2" type="datetime-local" value="2024-01-01T20:00"></input>
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