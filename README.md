# Prtara

Вёрстка сайта **Пром Регион Тара** (упаковка и упаковочные материалы). Статический генератор: Gulp + Nunjucks + SCSS + esbuild.

Репозиторий: [github.com/Amidalla/prtara](https://github.com/Amidalla/prtara)

## Страницы

| Страница | Файл |
|----------|------|
| Главная | `home.html` |
| Каталог | `catalog.html` |
| Каталог, 2 уровень | `catalog-category.html` |
| Карточка товара | `product.html` |
| О компании | `about.html` |
| Сертификаты | `certificates.html` |
| Контакты | `contacts.html` |
| Доставка и оплата | `delivery.html` |
| Акции | `promotions.html` |
| Поиск | `search.html` |
| Политика ПДн | `policy.html` |
| 404 | `error-404.html` |
| Карта страниц | `index.html` |

`index.html` — служебная карта макетов для разработки и натяжки. На продакшене её можно не публиковать.

## Установка

```sh
npm install
```

## Разработка

```sh
npm start
```

BrowserSync: `http://localhost:3000`, сборка в `temp/`.

## Продакшн

```sh
npm run build
```

Вывод в `build/`: минификация CSS/JS, оптимизация изображений. В HTML подключаются `bundle.min.css` и `bundle.min.js`.

## Команды

| Команда | Описание |
|---------|----------|
| `npm start` | dev-сервер → `temp/` |
| `npm run build` | прод-сборка → `build/` |
| `gulp clean` | удалить `temp/` и `build/` |
| `npm run lint` | ESLint + Stylelint |
| `npm run fix` | автоисправление lint + Prettier |
| `npm run validate` | W3C-проверка HTML из `build/` |
| `npm run compress` | сжатие исходников изображений |
| `npm run analyze` | размер JS-бандла |

## Структура

```
src/
  pages/          # страницы (.njk → .html)
  layouts/        # макет default.njk, пункты меню
  blocks/         # секции страниц
  components/     # переиспользуемые UI
  assets/         # изображения, шрифты, favicons
  scss/           # точка входа index.scss + core
  js/             # точка входа index.js + utils
```

- Dev: `html`, `styles`, `scripts`, `assets`, `serve` → `temp/`
- Prod: `htmlProd`, `stylesProd`, `scriptsProd`, `assetsProd` → `build/`
- Nunjucks `path`: `src`
- Sass `includePaths`: blocks, components, scss/core

## Навигация

Пункты меню шапки, футера и мобильного меню задаются в `src/layouts/default.njk`:

- `mainNavItems` — основное меню
- `headerNavItems` — верхняя навигация шапки
- `catalogMenuItems` — каталог в шапке и футере
- `mainNavItemsMobile` — мобильное меню

## Попапы и API для натяжки

Подключены в `layouts/default.njk`:

- `#popup-callback` — заказ звонка
- `#popup-callback-success` — успех callback
- `#popup-order` — заказ товара
- `#popup-feedback` — обратная связь
- `#popup-success` — успех отправки любой формы

```js
window.showPopup("popup-callback");
window.PopupSuccess.open();
window.PopupSuccess.open({ title: "Заказать звонок" }); // или просто строка
window.PopupSuccess.close();
// алиас: window.PopupFeedbackSuccess
window.reinit(document); // после AJAX-подстановки разметки
```

Формы с `data-validate` инициализируются через `form` в `src/js/index.js`. Телефонные поля — IMask. Select — nice-select2.

## Ленивая загрузка

Изображения: `class="lazy"`, реальный путь в `data-src` (Lozad). Для `<picture>` — `data-srcset` на `source`, см. `src/js/utils/lazy-load.js`.

## Favicons

Файлы лежат в `src/assets/favicons/`, ссылки — в `src/blocks/general/meta/meta.njk`.

## Библиотеки

| Пакет | Назначение |
|-------|------------|
| lozad | lazy-load `.lazy` + `data-src` |
| swiper | слайдеры |
| @fancyapps/ui | попапы |
| imask | маски телефона |
| nice-select2 | кастомный select (форма feedback) |

## Добавление блока или компонента

1. Папка в `src/blocks/...` или `src/components/...`
2. `.njk` (макрос или include), `.scss`, при необходимости `.js`
3. `@use` в `src/scss/index.scss`
4. JS — импорт и массив `components` в `src/js/index.js`
5. `npm run lint`
