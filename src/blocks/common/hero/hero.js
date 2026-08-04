import Swiper from "swiper";
import { Pagination, EffectFade, Autoplay } from "swiper/modules";

export function hero(context = document) {
    const roots = context.querySelectorAll("[data-hero]");
    if (!roots.length) return;

    roots.forEach((root) => {
        if (root.dataset.init === "true") return;
        root.dataset.init = "true";

        const swiperEl = root.querySelector(".swiper");
        const paginationEl = root.querySelector(".swiper-pagination");
        if (!swiperEl) return;

        const instance = new Swiper(swiperEl, {
            modules: [Pagination, EffectFade, Autoplay],
            effect: "fade",
            fadeEffect: {
                crossFade: true
            },
            loop: true,
            speed: 700,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false
            },
            pagination: {
                el: paginationEl,
                clickable: true
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
