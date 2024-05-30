import { useLocale, useTranslations } from 'next-intl';
import style from "./page.module.css"
import "./slider.css"
import ContactForm from './contact-form';
import Link from 'next/link';

export default function Home() {
  const t = useTranslations('main');
  const localActive = useLocale();

  return (
    <main>
      <section className={style.section1}>
        <h1 className={style.header1}>{t('title')}</h1>
      </section>
      <section className='flex flex-col items-center'>
        <div className='xl:max-w-7xl lg:max-w-5xl md:max-w-3xl sm:max-w-2xl w-full'>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-8 my-20 px-4'>
            <div className={style.img1}></div>
            <div>
              <h1 className={style.aboutTitle}>{t("about-title")}</h1>
              <h4 className={style.aboutSubtitle}>{t("about-subtitle")}</h4>
              <p>{t("about-description-1")}</p>
              <p className='mt-6'>{t("about-description-2")}</p>
            </div>
          </div>
          <div className="h-0.5 bg-border"></div>
          <div className='my-20'>
            <h1 className='text-2xl sm:text-3xl mb-8 font-semibold text-center'>{t('menu-title')}</h1>
            <div className='css-slider-container'>
              <div className="css-slider-wrapper">
                <input type="radio" name="slider" className="slide-radio1 slide-radio invisible" defaultChecked id="slider_1"/>
                <input type="radio" name="slider" className="slide-radio2 slide-radio invisible" id="slider_2"/>
                <input type="radio" name="slider" className="slide-radio3 slide-radio invisible" id="slider_3"/>
                <input type="radio" name="slider" className="slide-radio4 slide-radio invisible" id="slider_4"/>
                <div className="slider-pagination">
                  <label htmlFor="slider_1" className="page1"></label>
                  <label htmlFor="slider_2" className="page2"></label>
                  <label htmlFor="slider_3" className="page3"></label>
                  <label htmlFor="slider_4" className="page4"></label>
                </div>
                
                <div className="next control">
                  <label htmlFor="slider_1" className="numb1">&gt;</label>
                  <label htmlFor="slider_2" className="numb2">&gt;</label>
                  <label htmlFor="slider_3" className="numb3">&gt;</label>
                  <label htmlFor="slider_4" className="numb4">&gt;</label>
                </div>
                <div className="previous control">
                  <label htmlFor="slider_1" className="numb1">&lt;</label>
                  <label htmlFor="slider_2" className="numb2">&lt;</label>
                  <label htmlFor="slider_3" className="numb3">&lt;</label>
                  <label htmlFor="slider_4" className="numb4">&lt;</label>
                </div>
                
                
                <div id="slide1" className="slider slide1"><div></div></div>
                <div id="slide2" className="slider slide2"><div></div></div>
                <div id="slide3" className="slider slide3"><div></div></div>
                <div id="slide4" className="slider slide4"><div></div></div>
              </div>
            </div>
            <div className='flex justify-center mt-6'>
            <Link href={localActive + '/menu'} className="p-[3px] relative">
              <div className="inset-0 p-0.5 w-fit bg-gradient-to-r from-teal-300 to-lime-300 rounded-lg">
                <div className="px-8 py-2 w-fit rounded-[6px] font-semibold hover:text-background-secondary bg-background-primary relative group transition duration-200 hover:bg-transparent">
                  {t("menu-button")}
                </div>
              </div>
            </Link>
            </div>
          </div>
          <div className="h-0.5 bg-border"></div>
          <div className='my-20 px-4 lg:px-32 xl:px-40'>
            <h1 className='text-2xl sm:text-3xl mb-8 font-semibold text-center'>{t("contact-title")}</h1>
            <p>{t("contact-description-1")}</p>
            <p className='my-3 font-semibold text-foreground-secondary'>{t("contact-adress")}</p>
            <p>{t("contact-description-2")}</p>
            <ContactForm message={t("reserve-message")} name={t("reserve-name")}
            people={t("reserve-people")} button={t("reserve-button")}></ContactForm>
          </div>
        </div>
      </section>
    </main>
  );
}