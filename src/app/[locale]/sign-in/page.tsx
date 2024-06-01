import { useTranslations } from "next-intl";
import SignInForm, { SignInTranslationsProps } from "./sign-in-form";

export default function SignIn(props:any) {
  const t = useTranslations("sign-in")
  const translations:SignInTranslationsProps = {
    login: t("login"),
    password: t("password"),
    alreadyAuth: t("already-auth"),
    buttonEntry: t("button-entry"),
    buttonExit: t("button-exit"),
    buttonToWorkspace: t("button-to-workspace")
  }
  return (
    <main className='flex flex-col items-center'>
      <div className='xl:max-w-7xl lg:max-w-5xl md:max-w-3xl sm:max-w-2xl w-full'>
        <div className='my-10 md:my-20 flex flex-col items-center'>
          <h1 className='text-center text-2xl sm:text-3xl lg:text-4xl font-bold font-minion'>{t("title")}</h1>
          <SignInForm translations={translations}></SignInForm>
        </div>
      </div>
    </main>
  )
}