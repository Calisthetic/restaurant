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
  console.log(localActive)

  
  try {
    const menu: MenuCategory[] = await getMenu();
    
    return (
    <main className='flex flex-col items-center'>
      <div className='xl:max-w-7xl lg:max-w-5xl md:max-w-3xl sm:max-w-2xl w-full'>
        <h1 className='text-center my-16 text-xl sm:text-3xl lg:text-4xl font-bold font-minion'>{t("title")}</h1>
        
        <div>
          {menu.map((item: MenuCategory) => (
            <label key={item.id} className={style.questionBox}>
              <input type="checkbox" className={style.invisibleInput} defaultChecked={false}/>
              <div className={style.questionTitle}>
                <div className={style.questionIcon}>
                  <div className={style.questionIconOpen}>-</div>
                  <div className={style.questionIconClosed}>+</div>
                </div>
                <Suspense fallback={item.name}>
                  <Translate to={localActive} text={item.name}></Translate>
                </Suspense>
                <div className="h-0.5 bg-border"></div>
              </div>
              <div className={style.answerBox}>
                <div className={style.answerText}>
                  {item.dishes.map((dish: MenuDish, index:number) => (
                    <div key={index}>
                      <Suspense fallback={dish.name}>
                        <Translate to={localActive} text={dish.name}></Translate>
                      </Suspense>
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