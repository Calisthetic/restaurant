# Restaurant app

## О проекте

Разработан с использованием фреймворка [Next.js](https://nextjs.org/).

Диаграмма базы данных [здесь](https://dbdiagram.io/d/restaurant-66561d06b65d933879e8709f).

Размещён на хостинге при помощи [Velcel](https://vercel.com).

База данных [Postgres](https://vercel.com/docs/storage/vercel-postgres/) расположена на Vercel.

Перевод динамического контента GoodleAPI.

Языки:

- HTML
- CSS
- TypeScript (типизированный JS)
- SQL

### Используемые библиотеки

- [vercel/postgres](https://vercel.com/docs/storage/vercel-postgres/quickstart) - провайдер базы данных PostgreSQL (в Vercel)
- [TailwindCSS](https://tailwindcss.com/docs/installation) - библиотека, наполненная классами для использования CSS в HTML-разметке
- [PostCSS](https://postcss.org/) - инструмент для преобразования CSS, помогает избегать ошибок и обеспечивает поддержку CSS-модулей
- [Autoprefixer](https://www.npmjs.com/package/autoprefixer) - плагин для CSS, позволяет НЕ прописывать префиксы для корректного отображения на различных браузерах
- [next-intl](next-intl-docs.vercel.app/docs/getting-started) - поддержка различных языков
- [react-input-mask](https://www.npmjs.com/package/react-input-mask) - маска для ввода номера телефона
- [framer-motion](https://www.framer.com/motion/introduction/) - анимации

## Запуск проекта

### Подготовка ПО

Для локального запуска и разработки проекта необходимо установить следующее ПО:

- [Node.js](https://nodejs.org/en) - используемая в проекте среда выполнения JavaScript
- [Visual Studio Code](https://code.visualstudio.com/download) - редактор кода

### Установка конфигурации

### Старт

После скачивания проекта на свой ПК зайдите в папку проекта и откройте консоль (Ctrl+Shift+` в VS Code). Запустите проект следующей командой:

```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000) в своём браузере и погружайтесь в разработку!

## Ход разработки

### Установка фреймворка и библиотек

Создание проекта с использованием фреймворка Next.js

```bash
npm create next-app restaurant
```

Инициализация БД [PostgreSQL](https://www.postgresql.org/) по [этому видео](https://youtu.be/_ad99LhxBeQ?si=gIPsllQ7MOi7prCb)

Поддержка мультиязычности как в [этом репозиторие](https://github.com/candraKriswinarto/nextlingo/tree/main)

Перевод динамического контента как в [этом репозиторие](https://github.com/opensource-coding/Javascript-Language-Translater)

Установка пакетов/библиотек:

```bash
npm i @vercel/postgres
npm i autoprefixer
npm install next-intl
npm i react-input-mask
npm i --save-dev @types/react-input-mask
npm install framer-motion
```

### Использованные ресурсы

Рецепты [eda.ru](https://eda.ru/):

- [Картофельное пюре](https://eda.ru/recepty/osnovnye-blyuda/kartofelnoe-pjure-29188)
- [Курица, запеченная в хрустящей корочке, с имбирем и апельсинами](https://eda.ru/recepty/osnovnye-blyuda/kurica-zapechennaja-v-hrustjaschej-korochke-s-imbirem-apelsinami-30720)
- [Баранья нога в мятной панировке](https://eda.ru/recepty/osnovnye-blyuda/baranja-noga-v-mjatnoj-panirovke-18570)
- [Запеченный говяжий край](https://eda.ru/recepty/osnovnye-blyuda/zapechennij-govjazhij-kraj-17670)
- [Ароматная свинина в духовке](https://eda.ru/recepty/osnovnye-blyuda/aromatnaya-svinina-v-duhovke-35305)
- [Говядина «Веллингтон» по рецепту Гордона Рамзи](https://eda.ru/recepty/osnovnye-blyuda/govjadina-vellington-po-receptu-gordona-ramzi-51381)
- [Греческий салат](https://eda.ru/recepty/salaty/nastojaschij-grecheskij-salat-30893)
- [Закуска из красной рыбы в хрустящем тесте](https://eda.ru/recepty/zakuski/zakuska-iz-krasnoy-ryby-v-hrustyaschem-teste-140928)
- [Гороховый крем-суп с чесночными гренками](https://eda.ru/recepty/supy/gorohovij-krem-sup-s-chesnochnimi-grenkami-39915)
- [Чизкейк с персиками](https://eda.ru/recepty/vypechka-deserty/chizkejk-s-persikami-bez-vipechki-38864)
