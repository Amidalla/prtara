import Swiper from "swiper";
import { Pagination, EffectFade } from "swiper/modules";
import { Fancybox } from "@fancyapps/ui/dist/fancybox/";

export function aboutShort(context = document) {
    const roots = context.querySelectorAll("[data-about-short]");
    if (!roots.length) return;

    roots.forEach((root) => {
        if (root.dataset.init === "true") return;
        root.dataset.init = "true";

        const swiperEl = root.querySelector(".about-short-slider .swiper");
        const paginationEl = root.querySelector(".about-short-slider .swiper-pagination");
        if (!swiperEl) return;

        const instance = new Swiper(swiperEl, {
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

        const getGallery = () =>
            [...swiperEl.querySelectorAll(".swiper-slide:not(.swiper-slide-duplicate) .cert-card")].map((link) => ({
                src: link.getAttribute("href") || "",
                caption: link.dataset.caption || "",
                thumbSrc: link.dataset.thumb || link.getAttribute("href") || ""
            }));

        const onCertClick = (event) => {
            const link = event.target.closest(".cert-card");
            if (!link || !root.contains(link)) return;

            event.preventDefault();

            const slide = link.closest(".swiper-slide");
            const startIndex = slide?.dataset.swiperSlideIndex
                ? Number(slide.dataset.swiperSlideIndex)
                : 0;

            Fancybox.show(getGallery(), {
                startIndex
            });
        };

        root.addEventListener("click", onCertClick);

        root.addEventListener(
            "destroy",
            () => {
                root.removeEventListener("click", onCertClick);
                Fancybox.close();
                instance.destroy(true, true);
            },
            { once: true }
        );
    });
}
