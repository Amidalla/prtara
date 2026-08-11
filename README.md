# Prtara

Вёрстка сайта **Prtara**. Статический генератор на Gulp + Nunjucks + SCSS + esbuild.

Репозиторий: [github.com/Amidalla/prtara](https://github.com/Amidalla/prtara)

## Страницы

| Страница | Файл | Статус |
|----------|------|--------|
| Главная | `home.html` | заглушка под вёрстку |
| Каталог | `catalog.html` | заглушка под вёрстку |
| Каталог (2 уровень) | `catalog-category.html` | заглушка под вёрстку |
| Карточка товара | `product.html` | заглушка под вёрстку |
| Сертификаты | `certificates.html` | заглушка под вёрстку |
| О компании | `about.html` | заглушка под вёрстку |
| Контакты | `contacts.html` | заглушка под вёрстку |
| Доставка и оплата | `delivery.html` | заглушка под вёрстку |
| Акции | `promotions.html` | заглушка под вёрстку |
| Политика ПДн | `policy.html` | служебная |
| 404 | `error-404.html` | готово |
| Карта страниц (dev) | `index.html` | служебная |

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

Вывод в `build/` (минификация CSS/JS, оптимизация изображений).

## Полезные команды

| Команда | Описание |
|---------|----------|
| `npm run lint` | ESLint + Stylelint |
| `npm run fix` | автоисправление lint + Prettier |
| `npm run validate` | W3C-проверка HTML из `build/` |
| `npm run compress` | сжатие исходников изображений |
| `npm run analyze` | размер JS-бандла |

## Структура

```
src/
  pages/          # страницы (.njk → .html)
  layouts/        # макеты
  blocks/         # крупные секции страниц
  components/     # переиспользуемые UI
  layouts/        # макеты + пункты меню (mainNavItems)
  assets/         # изображения, шрифты, favicons
  scss/           # точка входа index.scss + core
  js/             # точка входа index.js + utils
```

## Навигация

Пункты меню шапки, футера и мобильного меню задаются в `src/layouts/default.njk` (`mainNavItems`, `mainNavItemsMobile`).

## Иконки кнопок

Общие SVG для кнопок и уголков:

- `src/components/general/icons/button-icon.njk`
- `src/components/general/icons/corner-icon.njk`

## Попапы и API для натяжки

Подключены в `layouts/default.njk`:

- `#popup-callback` — заказ звонка
- `#popup-callback-success` — успех callback
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

Ссылки прописаны в `src/blocks/general/meta/meta.njk`. Файлы нужно положить в `src/assets/favicons/` перед продакшном.
