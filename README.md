# antodev

Персональный сайт Антона: Telegram-боты и сайты.

Стек: Next.js App Router, React, TypeScript, Tailwind CSS 4, Motion, Radix Dialog.

## Запуск

- `npm install`
- `npm run dev` — http://127.0.0.1:3000
- `npm run build` — статический экспорт в `out/`

## Контент

- `data/projects.ts` — общий список проектов для обеих страниц. Для новой работы добавьте объект с `kind: "website"` или `kind: "telegram"`. В `/portfolio` попадут все работы; на главную — максимум две с `featured: true`. У сайтов укажите `previewImage` и `previewAlt` для своего превью.
- `app/portfolio/page.tsx` — отдельная страница полного портфолио и её метаданные.
- `components/portfolio-site.tsx` — Navbar, Hero, Services, Portfolio, карточки, WorkProcess, About, ContactCTA и Footer.
- `components/project-previews.tsx` — превью EMBER и интерактивный пример бота.
- `components/chat-widget.tsx` — контактный виджет, валидация, доступный диалог и состояния формы.
- `app/globals.css` — вёрстка, адаптивность и reduced motion; `app/dark-theme.css` — постоянная тёмная тема, белый текст и акценты Telegram blue.

## Контактная форма

Сейчас работает только frontend. Форма честно сообщает о деморежиме; данные не отправляются и не сохраняются. Прямая ссылка на Telegram работает.

Для подключения backend укажите `siteConfig.contactEndpoint` в `data/projects.ts`. Адаптер `lib/contact.ts` отправляет POST JSON `{ name, contact, message }` и обрабатывает ошибку ответа. На сервере добавьте валидацию, ограничение частоты и отправку в Telegram Bot API. Токен бота храните только на сервере.

## Изображения

Портрет `public/anton-portrait-v2.png` подготовлен из оригинала GOL09243.jpg встроенным Imagegen. `public/anton-portrait-mask.png` — отдельная маска по контуру, подготовленная встроенным Imagegen в режиме редактирования. `components/portrait.tsx` совмещает фотографию с маской и делает внутренние области силуэта полностью непрозрачными. Тень возле большого пальца сохранена как часть фигуры. Фон удаляется только снаружи силуэта; свечение и линии hero остаются за человеком. Портрет увеличен до полной высоты hero; нижние 8% изображения скрыты через overflow ровно у нижней границы блока: без градиента, размытия и смешивания цветов. PNG с фотографией сам по себе остаётся RGB; прозрачность задаётся маской при отображении.

Промпт маски: «Create a pixel-aligned foreground segmentation mask at 1024×1536. Preserve exact coordinates. Entire man including hair, face, shirt, arms, hands, bracelet and trousers solid white; exterior and true gaps solid black. No interior shading, texture, feather, glow or bottom fade. Only edge antialiasing.»

Превью EMBER — снимок реального ресторанного проекта. Интерфейс бота — явно обозначенный пример диалога.

## Публикация

`.openai/hosting.json` содержит зарегистрированный Site и `static.directory: "out"`. Подготовлен статический экспорт, также совместимый с обычным статическим хостингом. Фоновый сервер приложению не нужен, пока не подключена реальная обработка заявок.
