import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations('footer');
  const td = useTranslations('data');

  return (
    <footer className="flex items-center flex-col mt-auto">
      <div className="xl:max-w-7xl lg:max-w-5xl md:max-w-3xl sm:max-w-2xl w-full">
        <div className="h-0.5 bg-border"></div>
        <div className="grid grid-cols-1 gap-y-6 md:gap-y-0 sm:grid-cols-2 md:grid-cols-4 *:text-center my-6 sm:my-10 items-center *:max-h-fit">
          <div>
            <p>{t("section-1-1")}</p>
            <a className="font-semibold" href={"tel:" + td("phone")}>{td("phone")}</a>
          </div>
          <div>
            <p>{t("section-2-1")}</p>
            <p className="font-semibold">{t("section-2-2")}</p>
            <p className="font-semibold">{t("section-2-3")}</p>
          </div>
          <div>
            <p>{t("section-3-1")}</p>
            <p className="font-semibold">{td("adress")}</p>
          </div>
          <div>
            <p>{t("section-4-1")}</p>
            <p><a className="font-semibold" href={"tel:" + td("phone")}>{td("phone")}</a></p>
            <p><a className="font-semibold" href={"mailto:" + td("email")}>{td("email")}</a></p>
          </div>
        </div>
        <div className="h-0.5 bg-border"></div>
        <div className="flex flex-col sm:flex-row items-center sm:justify-between m-2 text-foreground-secondary">
          <p>{t("section-5-1")}</p>
          <a href={"mailto:" + td("email")}>{td("email")}</a>
        </div>
      </div>
    </footer>
  )
}