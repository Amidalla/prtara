import Swiper from "swiper";
import { Pagination, EffectFade } from "swiper/modules";
import { Fancybox, galleryFancyboxOptions } from "../../../js/utils/fancybox.js";

export function about(context = document) {
    const root = context.querySelector("[data-about]");
    if (!root || root.dataset.init === "true") return;

    root.dataset.init = "true";

    const swiperEl = root.querySelector(".about-certs-slider .swiper");
    const paginationEl = root.querySelector(".about-certs-slider .swiper-pagination");

    let instance = null;

    if (swiperEl) {
        instance = new Swiper(swiperEl, {
            modules: [Pagination, EffectFade],
            effect: "fade",
            fadeEffect: {
                crossFade: true
            },
            loop: true,
            watchOverflow: true,
            speed: 400,
            slidesPerView: 1,
            spaceBetween: 0,
            pagination: {
                el: paginationEl,
                clickable: true
            }
        });
    }

    Fancybox.bind(root, "[data-fancybox]", {
        ...galleryFancyboxOptions,
        groupAll: true
    });

    root.addEventListener(
        "destroy",
        () => {
            Fancybox.unbind(root);
            Fancybox.close();
            if (instance) instance.destroy(true, true);
        },
        { once: true }
    );
}
