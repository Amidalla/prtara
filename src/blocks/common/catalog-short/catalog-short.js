import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";

export function catalogShort(context = document) {
    const roots = context.querySelectorAll("[data-catalog-short]");
    if (!roots.length) return;

    roots.forEach((root) => {
        if (root.dataset.init === "true") return;
        root.dataset.init = "true";

        const swiperEl = root.querySelector(".catalog-short-slider .swiper");
        if (!swiperEl) return;

        const prevEl = root.querySelector(".catalog-short-slider .nav.prev");
        const nextEl = root.querySelector(".catalog-short-slider .nav.next");
        const paginationEl = root.querySelector(".catalog-short-slider .swiper-pagination");
        if (!prevEl || !nextEl || !paginationEl) return;

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
                1024: {
                    slidesPerView: 4
                }
            }
        });

        instance.update();

        root.addEventListener(
            "destroy",
            () => {
                instance.destroy(true, true);
            },
            { once: true }
        );
    });
}

