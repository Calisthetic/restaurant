"use client"

import Link from "next/link"
import LocalSwitcher from "../local-switcher"
import style from "./header.module.css"
import { useEffect, useRef } from "react"

export default function Header({restaurant, children}:any) {
  const headerDrop:any = useRef()
  const headerDropBtn:any = useRef()

  function handleChange(event:any) {
    headerDrop.current.style.gridTemplateRows = event.target.checked === true ? "1fr" : "0fr"
  }

  useEffect(() => {
    const handleResize = () => {
      if (headerDropBtn.current.checked) {
      headerDrop.current.style.gridTemplateRows = 
        (window.innerWidth < 768  ? "1fr" : "0fr")
      }
    }
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <header className={style.header}>
      <div>
        <nav role="navigation" className={style.nav}>
          <Link href="/">{restaurant}</Link>
          {children}
        </nav>
        <div className={style.headerUtilsContainer}>
          <LocalSwitcher></LocalSwitcher>
          <label className={style.headerDropButton}>
            <input type="checkbox" id="headerDrop" ref={headerDropBtn} onChange={handleChange} className="invisible"/>
            <svg fill="none" height="28" stroke="currentColor" strokeLinecap="round" 
            strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="28" xmlns="http://www.w3.org/2000/svg">
              <line x1="3" x2="21" y1="12" y2="12"/><line x1="3" x2="21" y1="6" y2="6"/><line x1="3" x2="21" y1="18" y2="18"/>
            </svg>
          </label>
        </div>
      </div>
      <section ref={headerDrop} className={style.navDropBox} id="navDropBox">
        <div className={style.navDropItems}>
          {children}
        </div>
      </section>
    </header>
    // <header className="flex items-center h-14 fixed shadow-header-shadow w-full justify-between px-2">
    //   <nav className="flex align-center h-full justify-center">
    //     <Link href="/" className="flex flex-col justify-center font-bold text-xl uppercase px-2 
    //     transition-colors border-b-2 hover:border-border border-background-primary">Restaurant</Link>
    //     <div className="flex align-center ml-4 text-md">
    //       <Link href="/menu" className="flex flex-col justify-center px-2 transition-colors border-b-2 hover:border-border border-background-primary">Меню</Link>
    //       <Link href="/gallery" className="flex flex-col justify-center px-2 transition-colors border-b-2 hover:border-border border-background-primary">Галерея</Link>
    //     </div>
    //   </nav>
    //   <LocalSwitcher></LocalSwitcher>
    // </header>
  )
}