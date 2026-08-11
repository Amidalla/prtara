import { Fancybox } from "@fancyapps/ui/dist/fancybox/";

/** Глобальные опции (попапы + галереи): светлая тема под frosted backdrop. */
const defaults = Fancybox.getDefaults();
defaults.theme = "light";

const CLOSE_ICON = `
<svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33" fill="none" aria-hidden="true" tabindex="-1">
    <path d="M1.2 1.2L15.913 16.372L1.2 31.545" stroke="#134A9B" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M31.545 31.545L16.833 16.372L31.545 1.2" stroke="#134A9B" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`.trim();

/** Стрелка из макета без белого stroke у круга (в экспорте был артефакт). */
const ARROW_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="77" height="42" viewBox="0 0 77 42" fill="none">
    <g clip-path="url(#clip0_fancybox_arrow)">
        <rect x="-0.75" y="0.75" width="40.5" height="40.5" rx="20.25" transform="matrix(-1 0 0 1 40.5 0)" fill="#F2F2F2"/>
        <path d="M75 21H11" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M75 21H11" stroke="#134A9B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M77 21H42" stroke="#B52F59" stroke-width="1.5" stroke-linejoin="round"/>
        <path d="M21 32L10 21L21 10" stroke="#134A9B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
    <defs>
        <clipPath id="clip0_fancybox_arrow">
            <rect width="77" height="42" fill="white"/>
        </clipPath>
    </defs>
</svg>
`.trim();

const ARROW_IMG = `<img class="fancybox-gallery-arrow" src="data:image/svg+xml,${encodeURIComponent(ARROW_SVG)}" width="77" height="42" alt="" draggable="false" />`;

/** Опции для галерей картинок / сертификатов (не для inline-попапов). */
export const galleryFancyboxOptions = {
    theme: "light",
    mainClass: "fancybox--gallery",
    closeButton: false,
    Carousel: {
        Toolbar: {
            absolute: true,
            display: {
                left: [],
                middle: [],
                right: ["close"]
            },
            items: {
                close: {
                    tpl: `<button class="f-button fancybox-gallery-close" title="{{CLOSE}}" data-fancybox-close aria-label="{{CLOSE}}">${CLOSE_ICON}</button>`
                }
            }
        },
        Thumbs: false,
        Arrows: {
            prevTpl: ARROW_IMG,
            nextTpl: ARROW_IMG
        }
    }
};

export { Fancybox };
