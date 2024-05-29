# Restaurant

## О проекте

Разработан с использованием фреймворка [Next.js](https://nextjs.org/).
База данных [Postgres](https://vercel.com/docs/storage/vercel-postgres/).
Диаграмма базы данных [здесь](https://dbdiagram.io/d/restaurant-66561d06b65d933879e8709f).
Размещён на хостинге при помощи [Velcel](https://vercel.com)

### Используемые библиотеки

- [vercel/postgres](https://vercel.com/docs/storage/vercel-postgres/quickstart) - провайдер базы данных PostgreSQL (в Vercel)
- [TailwindCSS](https://tailwindcss.com/docs/installation) - библиотека, наполненная классами для использования CSS в HTML-разметке
- [PostCSS](https://postcss.org/) - инструмент для преобразования CSS, помогает избегать ошибок и обеспечивает поддержку CSS-модулей
- [Autoprefixer](https://www.npmjs.com/package/autoprefixer) - плагин для CSS, позволяет НЕ прописывать префиксы для корректного отображения на различных браузерах
- [next-intl](next-intl-docs.vercel.app/docs/getting-started) - поддержка различных языков

## Запуск проекта

### Подготовка ПО

Для локального запуска и разработки проекта необходимо установить следующее ПО:

- [Node.js](https://nodejs.org/en) - используемая в проекте среда выполнения JavaScript
- [Visual Studio Code](https://code.visualstudio.com/download) - редактор кода

### Старт

После скачивания проекта на свой ПК зайдите в папку проекта и откройте консоль (Ctrl+Shift+` в VS Code). Запустите проект следующей командой:

```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000) в своём браузере и погружайтесь в разработку!

## Ход разработки

### Установка фреймворка и библиотек

Создание проекта с использованием фреймворка Nex.js

```bash
npm creat next-app restaurant
```

Инициализация БД [PostgreSQL](https://www.postgresql.org/) по [этому видео](https://youtu.be/_ad99LhxBeQ?si=gIPsllQ7MOi7prCb)

Поддержка мультиязычности как в [этом репозиторие](https://github.com/candraKriswinarto/nextlingo/tree/main)

Установка пакетов/библиотек:

```bash
npm i @vercel/postgres
npm i autoprefixer
npm install next-intl
```

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
