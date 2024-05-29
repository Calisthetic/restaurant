# Restaurant

## О проекте

Разработан с использованием фреймворка [Next.js](https://nextjs.org/).
База данных [Postgres](https://vercel.com/docs/storage/vercel-postgres/).
Диаграмма базы данных [здесь](https://dbdiagram.io/d/restaurant-66561d06b65d933879e8709f)

### Используемые библиотеки

- [vercel/postgres](https://vercel.com/docs/storage/vercel-postgres/quickstart) - провайдер базы данных PostgreSQL (в Vercel)
- [TailwindCSS](https://tailwindcss.com/docs/installation) - библиотека, наполненная классами для использования CSS в HTML-разметке
- [PostCSS](https://postcss.org/) - инструмент для преобразования CSS, помогает избегать ошибок и обеспечивает поддержку CSS-модулей
- [Autoprefixer](https://www.npmjs.com/package/autoprefixer) - плагин для CSS, позволяет НЕ прописывать префиксы для корректного отображения на различных браузерах

## Запуск проекта

### Подготовка ПО

- [Node.js](https://nodejs.org/en) - используемая в проекте среда выполнения JavaScript
- [Visual Studio Code](https://code.visualstudio.com/download) - редактор кода

### Старт

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Ход разработки

### Установка фреймворка и библиотек

Создание проекта с использованием фреймворка Nex.js

```bash
npm creat next-app restaurant
```

Инициализация БД [PostgreSQL](https://www.postgresql.org/) по [этому видео](https://youtu.be/_ad99LhxBeQ?si=gIPsllQ7MOi7prCb)

Установка пакетов/библиотек:

```bash
npm i @vercel/postgres
npm i autoprefixer
```

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
