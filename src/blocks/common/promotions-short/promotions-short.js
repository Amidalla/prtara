import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";

export function promotionsShort(context = document) {
    const roots = context.querySelectorAll("[data-promotions-short]");
    if (!roots.length) return;

    roots.forEach((root) => {
        if (root.dataset.init === "true") return;
        root.dataset.init = "true";

        const swiperEl = root.querySelector(".swiper");
        const prevEl = root.querySelector(".nav.prev");
        const nextEl = root.querySelector(".nav.next");
        const paginationEl = root.querySelector(".swiper-pagination");
        if (!swiperEl) return;

        const instance = new Swiper(swiperEl, {
            modules: [Navigation, Pagination],
            slidesPerView: 4,
            spaceBetween: -1,
            watchOverflow: true,
            speed: 400,
            navigation: {
                prevEl,
                nextEl
            },
            pagination: {
                el: paginationEl,
                clickable: true
            },
            breakpoints: {
                0: {
                    slidesPerView: 2
                },
                768: {
                    slidesPerView: 3
                },
                1320: {
                    slidesPerView: 4
                }
            }
        });

        root.addEventListener(
            "destroy",
            () => {
                instance.destroy(true, true);
            },
            { once: true }
        );
    });
}
