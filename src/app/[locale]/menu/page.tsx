import { getLocale, getTranslations } from "next-intl/server"
import style from "./page.module.css"
import Translate from "@/components/translate";
import { Suspense } from "react";

type MenuCategory = {
  id: number,
  name: string,
  dishes: MenuDish[]
}
type MenuDish = {
  id: number,
  name: string,
  price: number
}



async function getMenu(): Promise<MenuCategory[]> {
  const res = await fetch(process.env.API_URL + "/api/dishes", {
    method: "GET"
  });
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  const data:MenuCategory[] = await res.json();
  return data
}

export default async function Menu() {
  const t = await getTranslations('menu');
  const localActive = await getLocale();

  
  try {
    const menu: MenuCategory[] = await getMenu();
    
    return (
    <main className='flex flex-col items-center'>
      <div className='md:max-w-4xl sm:max-w-2xl w-full'>
        <h1 className='text-center mt-16 text-2xl sm:text-3xl lg:text-4xl font-bold font-minion'>{t("title")}</h1>
        
        <div className="mt-10 mb-20 mx-2">
          {menu.map((item: MenuCategory) => (
            <label key={item.id} className={style.questionBox}>
              <input type="checkbox" className={style.invisibleInput} defaultChecked={true}/>
              <div className={style.questionTitle}>
                <div></div>
                <Suspense fallback={item.name}>
                  <Translate to={localActive} text={item.name}></Translate>
                </Suspense>
                <div className={style.questionIcon}>
                  <svg enableBackground="new 0 0 32 32" height="24" version="1.1" viewBox="0 0 32 32" width="24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24.285,11.284L16,19.571l-8.285-8.288c-0.395-0.395-1.034-0.395-1.429,0  c-0.394,0.395-0.394,1.035,0,1.43l8.999,9.002l0,0l0,0c0.394,0.395,1.034,0.395,1.428,0l8.999-9.002 
                    c0.394-0.395,0.394-1.036,0-1.431C25.319,10.889,24.679,10.889,24.285,11.284z" fill="currentColor"/><g/><g/><g/><g/><g/><g/>
                  </svg>
                </div>
              </div>
              <div className={style.answerBox}>
                <div className={style.answerText}>
                  {item.dishes.map((dish: MenuDish, index:number) => (
                    <div key={index} className={style.dishes}>
                      <div className="bg-background-primary whitespace-normal sm:whitespace-nowrap">
                        <Suspense fallback={dish.name}>
                          <Translate to={localActive} text={dish.name}></Translate>
                        </Suspense>
                      </div>
                      <div className="border-foreground-secondary opacity-60 border-b-0 sm:border-b border-dashed -translate-y-1"></div>
                      <div>{dish.price}</div>
                    </div>
                  ))}  
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>
    </main>
    );
  } catch (error) {
    console.error("Failed to load menu:", error);
    return <h1 className='text-center my-16 text-xl sm:text-3xl lg:text-4xl font-bold font-minion'>{t("error")}</h1>;
  }
}