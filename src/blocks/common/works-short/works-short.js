import Swiper from "swiper";

const MOBILE_XL = "(max-width: 599.98px)";

export function worksShort(context = document) {
    const roots = context.querySelectorAll("[data-works-short]");
    if (!roots.length) return;

    roots.forEach((root) => {
        if (root.dataset.init === "true") return;
        root.dataset.init = "true";

        const swiperEl = root.querySelector(".swiper");
        if (!swiperEl) return;

        let instance = null;
        const media = window.matchMedia(MOBILE_XL);

        const create = () => {
            if (instance) return;

            instance = new Swiper(swiperEl, {
                slidesPerView: 1.3,
                spaceBetween: 16,
                watchOverflow: true,
                speed: 500,
                breakpoints: {
                    480: {
                        slidesPerView: 1.8,
                        spaceBetween: 20
                    }
                }
            });
        };

        const destroy = () => {
            if (!instance) return;
            instance.destroy(true, true);
            instance = null;
        };

        const sync = () => {
            if (media.matches) {
                create();
            } else {
                destroy();
            }
        };

        sync();
        media.addEventListener("change", sync);

        root.addEventListener(
            "destroy",
            () => {
                media.removeEventListener("change", sync);
                destroy();
            },
            { once: true }
        );
    });
}
