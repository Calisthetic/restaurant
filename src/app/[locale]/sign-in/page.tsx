import { useTranslations } from "next-intl";
import SignInForm from "./sign-in-form";

export default function SignIn(props:any) {
  const t = useTranslations("sign-in")
  
  return (
    <main className='flex flex-col items-center'>
      <div className='xl:max-w-7xl lg:max-w-5xl md:max-w-3xl sm:max-w-2xl w-full'>
        <div className='my-0 sm:my-10 md:my-20 flex flex-col items-center'>
          <h1 className='text-center mt-16 text-2xl sm:text-3xl lg:text-4xl font-bold font-minion'>{t("title")}</h1>
          <SignInForm button={t("button")} login={t("login")} password={t("password")}></SignInForm>
        </div>
      </div>
    </main>
    
  )
}