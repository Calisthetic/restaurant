import Footer from "@/components/footer";
import Header from "@/components/header/header";
import { ReactNode } from "react";

export default function Workspace({children}:{children:ReactNode}) {
  return (
    <>
      <Header hasAuth={true}></Header>
      {children}
      <Footer></Footer>
    </>
  )
}