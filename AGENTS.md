# AGENTS.md

Руководство для AI-агентов при работе с репозиторием **Prtara**.

## Проект

Статический сайт (Gulp + Nunjucks + SCSS + esbuild). UI разбит на блоки (`src/blocks/`) и компоненты (`src/components/`). Общие пункты меню задаются в `src/layouts/default.njk` (`mainNavItems`, `mainNavItemsMobile`).

## Команды

```sh
npm start          # dev-сервер → temp/
npm run build      # прод → build/
gulp clean         # удалить temp/ и build/
npm run lint       # ESLint + Stylelint
npm run fix        # автофикс lint + format
npm run validate   # W3C HTML (сначала build)
npm run compress   # сжатие исходных изображений
```

## Архитектура

### Сборка

- Dev: `html`, `styles`, `scripts`, `assets`, `serve` → `temp/`
- Prod: `htmlProd`, `stylesProd`, `scriptsProd`, `assetsProd` → `build/`
- Nunjucks `path`: `src`
- Sass `includePaths`: blocks, components, scss/core

### Шаблоны

- Страницы: `src/pages/*.njk` → HTML
- Макет: `layouts/default.njk` (header, footer, попапы, consent)
- Блоки: крупные секции (`{% include "blocks/..." %}`)
- Компоненты: макросы `{% from "..." import render as name %}`

### Стили

Точка входа: `src/scss/index.scss`. Без BEM: вложенность + модификаторы-классами. CSS-переменные в `:root` и на компонентах.

### JavaScript

Точка входа: `src/js/index.js`. Паттерн компонента:

```js
export function componentName(context = document) {
    const root = context.querySelector("[data-...]");
    if (!root || root.dataset.init === "true") return;
    root.dataset.init = "true";
    const controller = new AbortController();
    // ...
    root.addEventListener("destroy", () => controller.abort(), { once: true });
}
```

Глобально: `window.reinit`, `window.showPopup`, `window.PopupSuccess` (алиас `window.PopupFeedbackSuccess`).

### Иконки

- Кнопка со стрелкой: `components/general/icons/button-icon.njk` → `buttonIcon()`
- Уголок: `components/general/icons/corner-icon.njk` → `cornerIcon()`

### Качество кода

- ESLint (логика) + Prettier (формат; `.njk` не форматируется)
- Stylelint + recess-order
- Перед коммитом: `npm run fix`

## Библиотеки

| Пакет | Назначение |
|-------|------------|
| lozad | lazy-load `.lazy` + `data-src` |
| swiper | слайдеры |
| @fancyapps/ui | попапы |
| imask | маски телефона |
| nice-select2 | кастомный select (форма feedback) |

## Добавление компонента

1. Папка в `src/components/...` или `src/blocks/...`
2. `.njk` (макрос), `.scss`, при необходимости `.js`
3. `@use` в `src/scss/index.scss`
4. JS → импорт и массив `components` в `src/js/index.js`
5. `npm run lint`

## Страницы (заглушки под вёрстку)

Основные страницы сейчас — заглушки с классом `.page-stub`. Не удалять страницы из карты сайта и меню без явной задачи.

| Файл | Назначение |
|------|------------|
| `home.html` | Главная |
| `catalog.html` | Каталог |
| `catalog-category.html` | Каталог, 2 уровень |
| `product.html` | Карточка товара |
| `certificates.html` | Сертификаты |
| `about.html` | О компании |
| `contacts.html` | Контакты |
| `delivery.html` | Доставка и оплата |
| `promotions.html` | Акции |
| `error-404.html` | 404 |
| `policy.html` | Политика ПДн |
| `index.html` | Карта страниц (dev) |

## Важно

- Не коммитить без запроса пользователя
- Не менять визуал при рефакторинге без явной задачи
- Favicons: ссылки в meta есть, файлы положить в `src/assets/favicons/`
