import Swiper from "swiper";
import { Navigation, Autoplay } from "swiper/modules";

export function partnersShort(context = document) {
    const roots = context.querySelectorAll("[data-partners-short]");
    if (!roots.length) return;

    roots.forEach((root) => {
        if (root.dataset.init === "true") return;
        root.dataset.init = "true";

        const swiperEl = root.querySelector(".swiper");
        const prevEl = root.querySelector(".nav.prev");
        const nextEl = root.querySelector(".nav.next");
        if (!swiperEl) return;

        const instance = new Swiper(swiperEl, {
            modules: [Navigation, Autoplay],
            loop: true,
            watchOverflow: true,
            speed: 500,
            slidesPerView: 2,
            spaceBetween: 24,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false
            },
            navigation: {
                prevEl,
                nextEl
            },
            breakpoints: {
                600: {
                    slidesPerView: 3,
                    spaceBetween: 28
                },
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 32
                },
                1320: {
                    slidesPerView: 5,
                    spaceBetween: 40
                }
            },
            on: {
                lock(swiper) {
                    swiper.autoplay?.stop();
                },
                unlock(swiper) {
                    swiper.autoplay?.start();
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
