"use client"

import Link from "next/link"
import LocalSwitcher from "../local-switcher"
import style from "./header.module.css"
import { ReactNode, useEffect, useRef } from "react"

export default function HeaderClient({restaurant, localActive, children}
  :{restaurant:string, localActive:string, children:ReactNode}) {
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
          <Link href={"/" + localActive}>{restaurant}</Link>
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
  )
}