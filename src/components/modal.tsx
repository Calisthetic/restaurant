"use client"

import { AnimatePresence, motion } from "framer-motion"
import { ReactNode } from "react"

export type ModalProps = {
  children:ReactNode
  isOpen:boolean
  onClose:() => void
}

export default function Modal(props:ModalProps) {
  return (
    <AnimatePresence>
      {props.isOpen && (
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}
        className="fixed h-full w-full top-0 left-0 flex items-center justify-center bg-black/50">
          <div className="py-2 px-4">
            {props.children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}