import Swiper from "swiper";
import { Pagination, Navigation, EffectFade, Autoplay } from "swiper/modules";

export function hero(context = document) {
    const roots = context.querySelectorAll("[data-hero]");
    if (!roots.length) return;

    roots.forEach((root) => {
        if (root.dataset.init === "true") return;
        root.dataset.init = "true";

        const swiperEl = root.querySelector(".swiper");
        const paginationEl = root.querySelector(".swiper-pagination");
        const previousEl = root.querySelector(".hero-navigation--prev");
        const nextEl = root.querySelector(".hero-navigation--next");
        const spacerEl = root.querySelector(".hero-media-nav-spacer");
        if (!swiperEl || !previousEl || !nextEl) return;

        const syncPretitleSpacer = () => {
            if (!spacerEl) return;
            const pretitle = root.querySelector(".swiper-slide-active .pretitle");
            if (!pretitle) return;
            spacerEl.style.height = `${pretitle.offsetHeight}px`;
        };

        const instance = new Swiper(swiperEl, {
            modules: [Pagination, Navigation, EffectFade, Autoplay],
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
            },
            navigation: {
                prevEl: previousEl,
                nextEl
            },
            on: {
                init: syncPretitleSpacer,
                slideChangeTransitionEnd: syncPretitleSpacer,
                resize: syncPretitleSpacer
            }
        });

        const onResize = () => syncPretitleSpacer();
        window.addEventListener("resize", onResize);
        syncPretitleSpacer();

        root.addEventListener(
            "destroy",
            () => {
                window.removeEventListener("resize", onResize);
                instance.destroy(true, true);
            },
            { once: true }
        );
    });
}
