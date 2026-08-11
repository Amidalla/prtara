import { Fancybox, galleryFancyboxOptions } from "../../../js/utils/fancybox.js";

export function product(context = document) {
    const root = context.querySelector("[data-product]");
    if (!root || root.dataset.init === "true") return;

    root.dataset.init = "true";
    const controller = new AbortController();
    const { signal } = controller;

    Fancybox.bind(root, "[data-fancybox]", {
        ...galleryFancyboxOptions,
        groupAll: true
    });

    root.querySelectorAll(".product-anchors a[href^='#']").forEach((link) => {
        link.addEventListener(
            "click",
            (e) => {
                const id = link.getAttribute("href")?.slice(1);
                const target = id ? document.getElementById(id) : null;
                if (!target) return;

                e.preventDefault();
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            },
            { signal }
        );
    });

    root.addEventListener("destroy", () => controller.abort(), { once: true });
}
